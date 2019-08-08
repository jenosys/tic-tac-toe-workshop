const colyseus = require('colyseus');
const http = require('http');

const express = require('express');
const cors = require('cors');
const app = express();
const env = require('./env');
const discovery = require('./discovery');

app.use(cors());

const server = http.createServer(app);
const gameServer = new colyseus.Server({ server: server });

gameServer.register('tictactoe', require('./rooms/tictactoe'));

app.get('/health', (req, res, next) => res.sendStatus(200));
app.get('/block', (req, res, next) => {
  const end = Date.now() + 5000;
  while (Date.now() < end) {
    const doSomethingHeavyInJavaScript = 1 + 2 + 3;
  }
});

app.use(express.static(__dirname + "/../../client/tic-tac-toe/public/"));

if (env.host !== 'localhost') {
  console.log(`HOST IP: ${env.host}`);
  console.log(`HOST PORT: ${env.hostPort}`);
}

// process.on('exit', async () => {
//   await discovery.deregister();
// });

discovery.register().then(() => {
  gameServer.onShutdown(async () => {
    try {
      await discovery.deregister();
    } catch (e) {
      console.error(e);
    }
    console.log('master process is being shut down!');
  });

  server.listen(parseInt(env.port));

  console.log(`Listening on ws://localhost:${env.port}`);

}).catch(e => {
  console.error(e);
  process.exit(-1);
});