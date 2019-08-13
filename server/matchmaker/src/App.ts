import path from 'path';
import * as bodyParser from 'body-parser';
import express from 'express';
import http from 'http';
import cors from 'cors';
import HTTP_STATUS_CODES from 'http-status-enum';
import nocache from 'nocache';
import socketIO from 'socket.io';
import { setInterval } from 'timers';
import moment from 'moment';
import discovery from './discovery';
import containerManager from './containerManager';
import matchMaker from './matchMaker';
import * as util from './util';

interface User {
	name?: string;
	score: number;
	socket: socketIO.Socket;
}

interface User2 {
	username: string;
	score: number;
}

interface Server {
	addr: string;
	definition: string;
	state: 'ready' | 'busy';
	image: string;
	launchType: string;
}

interface Var {
	idleServerNumber: number;
}

interface Sendable {
	users: User2[];
	servers: Server[];
}

class App {
	app: express.Application;

	private router: express.Router;
	private server: http.Server;
	private io: SocketIO.Server;

	private timedJob: NodeJS.Timeout;

	private users: User[] = [];
	private vars: Var = {
		idleServerNumber: 10
	};
	private sendableData: Sendable = {
		users: [],
		servers: []
	};
	private nextAskTime: number = 0;



	public async init() {
		this.app = express();

		this.app.use(cors());
		this.app.use(nocache());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use((req, res, next) => {
			console.log(`${req.method} ${req.originalUrl}`);
			next();
		});


		this.server = http.createServer(this.app);
		this.router = express.Router();
		this.io = socketIO(this.server);
	}

	public run(host: string, port: number) {
		this.server.listen(port, host);

		console.log(`server listen on ${host}:${port}`);

		this.vars.idleServerNumber = discovery.readyCount;

		this.timedJob = setInterval(() => {
			let now = moment().unix();

			this.broadcast();

			// ensure ready server count
			// if (discovery.readyCount < this.vars.idleServerNumber && this.nextAskTime < now) {
			// 	containerManager.ensureReadyTaskNumber(this.vars.idleServerNumber);
			// 	this.nextAskTime = moment.unix(now).add(2, 'minutes').unix();
			// } else if (this.nextAskTime && discovery.readyCount >= this.vars.idleServerNumber) {
			// 	this.nextAskTime = 0;
			// }
		}, 1000);
	}

	private wrap(fn: (req: express.Request) => Promise<any>): express.RequestHandler {
		return (async (req: express.Request, res: express.Response, next: express.NextFunction) => {
			try {
				let response = (await fn.bind(this)(req)) || {};
				res.json(response);
			} catch (err) {
				if (err instanceof Error) {
					res.sendStatus(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
					console.error(err);
				} else {
					res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);
				}
			}
		}).bind(this);
	}


	public async bindRoutes() {
		let router = this.router;

		router.get('/health', this.wrap(this.onHealthCheck));
		router.post('/idleServerCount', this.wrap(this.idleServerCount));
		router.post('/requestMatching', this.wrap(this.requestMatching));

		this.app.use('/api', router);

		
		this.io.sockets.on('connection', socket => {
			this.users.push({
				name: util.randomString(6),
				score: 1123,
				socket
			});

			console.log(`new connection. socket(${socket.id}) total user count: ${this.users.length}`);

			socket.on('disconnect', () => {
				let idx = this.users.findIndex(u => u.socket === socket);

				if (idx !== -1) {
					this.users.splice(idx, 1);
				}

				console.log(`disconnection: socket(${socket.id}) total user count: ${this.users.length}`);
			});

			this.io.emit('users', this.sendableData.users);
			this.io.emit('servers', this.sendableData.servers);
			this.io.emit('vars', this.vars);
		});

	}





	private broadcast() {
		try {
			this.sendableData.users = this.users.map(u => {
				return {
					username: u.name,
					score: u.score
				} as User2;
			});
			this.sendableData.servers = discovery.servers.map(srv => {
				return {
					addr: `${srv.ipv4}:${srv.port}`,
					definition: srv.image,
					state: srv.state,
					image: srv.image,
					launchType: srv.launchType
				} as Server;
			});

			this.io.emit('users', this.sendableData.users);
			this.io.emit('servers', this.sendableData.servers);
		} catch (e) {
			console.error(e);
		}
	}



	private async onHealthCheck(req: express.Request) {
		return HTTP_STATUS_CODES.OK;
	}

	private async idleServerCount(req: express.Request) {
		const { number } = req.body;
		if (this.vars.idleServerNumber === number) { return; }

		let promise = containerManager.ensureReadyTaskNumber(number) as Promise<any>;

		if (promise) {
			promise.then(() => {
				this.vars.idleServerNumber = number;
				this.io.emit('vars', this.vars);
			});
		}

		return HTTP_STATUS_CODES.OK;
	}

	private async requestMatching(req: express.Request) {
		const { username } = req.body;
		
		try {
			let result = await matchMaker.addPlayer(username);

			return result;
		} catch (e) {
			return {
				error: 'timeout'
			};
		}
	}
}


export default new App();