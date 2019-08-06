import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

server.listen(8888);

io.on('connection', socket => {
  console.log('new connection)');
});