const colyseus = require('colyseus');
const http = require('http');

const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3553;

app.use(cors());

const server = http.createServer(app);
const gameServer = new colyseus.Server({server: server});

gameServer.register('tictactoe', require('./rooms/tictactoe'));
gameServer.onShutdown(() => console.log('master process is being shut down!'));
server.listen(port);

app.use(express.static(__dirname + "/../frontend/public"));
console.log(`Listening on ws://localhost:${ port }`);
