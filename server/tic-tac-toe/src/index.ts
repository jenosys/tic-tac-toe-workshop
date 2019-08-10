import process from 'process';
import http from 'http';

import express from 'express';
import cors from 'cors';
import nocache from 'nocache';
const captureExit = require('capture-exit');

import { Server } from 'colyseus';

import { TicTacToe } from './rooms/tictactoe';
import env from './env';
import * as discovery from './discovery';
import ClockTimer from '@gamestdio/timer';
import { setTimeout } from 'timers';

captureExit.captureExit();

let block = false;

const app = express();
app.use(cors());
app.use(nocache());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  if (block) {
    res.sendStatus(404);
  } else {
    next();
  }
});

const server = http.createServer(app);
const gameServer = new Server({ server: server });

gameServer.register('tictactoe', TicTacToe);

// health 체크용
app.get('/health', (req, res, next) => res.sendStatus(200));
// 모든 요청 블럭용, 장애 상황 가정
app.get('/block', (req, res, next) => { block = true; });
// 게임 실행 모드 가정, 60초 후 종료
app.get('/active', async (req, res, next) => {
  res.sendStatus(200);

  await discovery.updateState('busy');

  setTimeout(() => {
    process.exit(0);
  }, 60000);
});

// app.use(express.static(__dirname + "/../../client/tic-tac-toe/public/"));

console.log(`env: ${JSON.stringify(env, null, 2)}`);


discovery.register().then(() => {
  captureExit.onExit(async () => {
    console.log(`shutdown starting...`);
    await discovery.deregister();
    console.log('server is down');  
  });
  
  ['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal as any, () => {
      console.log(`signal ${signal} received`);
    });
  });

  gameServer.listen(parseInt(env.PORT));

  console.log(`Listening on ws://localhost:${env.PORT}`);
  console.log('server is ready');
}).catch(e => {
  console.error(e);
  process.exit(-1);
});