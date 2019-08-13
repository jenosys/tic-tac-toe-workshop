import process from 'process';
import http from 'http';

import express from 'express';
import cors from 'cors';
import nocache from 'nocache';


const app = express();
app.use(cors());
app.use(nocache());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

const server = http.createServer(app);

// health 체크용
app.get('/health', (req, res, next) => res.sendStatus(200));

app.listen(3553);

console.log('server is ready');