import * as bodyParser from 'body-parser';
import * as http from 'http';
import HTTP_STATUS_CODES from 'http-status-enum';
import express from 'express';
import nocache from 'nocache';
import * as zookeeper from 'node-zookeeper-client';
import ECS from 'aws-sdk/clients/ecs';

import env from './env';
import { timingSafeEqual } from 'crypto';


class App {
	app: express.Application;
	private zk: zookeeper.Client;
	private ecs: ECS;
	private router: express.Router;
	private server: http.Server;


	constructor () {}


	public async init() {
		this.app = express();
		this.router = express.Router();

		this.zk = zookeeper.createClient(env.ZOOKEEPER_ENDPOINT, {
			sessionTimeout: 3000,
			retries: 2
		});
		this.ecs = new ECS({ endpoint: env.ECS_CLUSTER_ENDPOINT });

		this.app.use(nocache());
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({ extended: true }));
		this.app.use((req, res, next) => {
			console.log(req.url);		
			next();
		});
	}

	private wrap(fn: (req: express.Request) => Promise<any>):express.RequestHandler {
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

		router.get('/', this.wrap(this.onHealthCheck));
		router.get('/dedi/all', this.wrap(this.onGetAllDedis));
		router.get('/dedi/run', this.wrap(this.onRunDedis));

		this.app.use(router);
	}


	public async run(host: string, port: number) {
		let promise = new Promise((resolve, reject) => {
			this.zk.once('connected', () => {
				resolve();
			});
		});		
		this.zk.connect();
		await promise;
		this.zk.mkdirp("/waiting", (e, path) => {});
		this.zk.mkdirp("/running", (e, path) => {});
		
		this.server = this.app.listen(port, host);
		
		console.log(`server is listening on ${host}/${port}`);
	}


	public async shutdown() {
		return new Promise((resolve, reject) => {
			this.server.close(err => {
				if (err) {
					console.log('http server closing fail');
					reject(err);
				} else {
					console.log('http server closed');
					resolve();
				}
			});
		});
	}


	private async runTask(number: number) {
		return await this.ecs.runTask({
			taskDefinition: env.ECS_TASK_DEFINITION,
			count: number
		}).promise();
	}




	private async onHealthCheck(req: express.Request) {
		return env.VERSION;
	}

	private async onRunDedis(req: express.Request) {
		let response = await this.runTask(10);

		if (response.failures) {
			console.error(response.$response.error);
			return response.failures;			
		} else {
			console.log("runTask success");
			return {};
		}
	}

	private async onGetAllDedis(req: express.Request) {
		let waiting = await new Promise<string[]>((resolve, reject) => {
			this.zk.getChildren("/waiting", (e, children: string[], stat: zookeeper.Stat) => {
				if (e) {
					reject(e);
				} else {
					resolve(children);
				}
			});
		});

		let running = await new Promise<string[]>((resolve, reject) => {
			this.zk.getChildren("/running", (e, children: string[]) => {
				if (e) {
					reject(e);
				} else {
					resolve(children);
				}
			});
		});

		return { waiting: waiting, run: running };
	}
}


export default new App();