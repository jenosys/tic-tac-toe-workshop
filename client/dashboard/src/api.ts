import axios from 'axios';
import io from 'socket.io-client';
import env from './env';


const apiServer = env.API_URL;


interface socketParam {
  onUpdateUsers: (users: UserStore[]) => void,
  onUpdateServers: (servers: ServerStore[]) => void,
  onUpdateVars: (vars: VarStore) => void,
}

function ioConnect({ onUpdateUsers, onUpdateServers, onUpdateVars }: socketParam) {
  const socket = io(apiServer, {
    transports: [ 'websocket' ]
  });

  socket.on('connect', () => {
    console.log('socket connected');
  });

  socket.on('disconnect', () => {
    console.log('socket disconnect');
  });

  socket.on('users', (users: UserStore[]) => {
    onUpdateUsers(users);
  });
  
  socket.on('servers', (servers: ServerStore[]) => {
    onUpdateServers(servers);
  });
  
  socket.on('vars', (vars: VarStore) => {
    onUpdateVars(vars);
  })
}


const instance = axios.create({
  baseURL: `${apiServer}/api`,
  timeout: 1000,
  headers: {}
});

function requestMatching(username: string) {
  return instance.post('/requestMatching', {
    username
  }, {
    timeout: 40000
  });
}

function desireIdleServerCount(number: number) {
  return instance.post('/idleServerCount', {
    number
  });
}

function activeDediServer(addr: string) {
  return axios.get(`http://${addr}/active`, {
    timeout: 2000
  });
}

function blockDediServer(addr: string) {
  return axios.get(`http://${addr}/block`, {
    timeout: 2000
  });
}

export default {
  ioConnect,

  requestMatching,
  activeDediServer,
  blockDediServer,
  desireIdleServerCount
}