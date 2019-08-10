import axios from 'axios';
import io from 'socket.io-client';




interface socketParam {
  onUpdateUsers: (users: UserStore[]) => void,
  onUpdateServers: (servers: ServerStore[]) => void,
  onUpdateVars: (vars: VarStore) => void,
}


const matchServerHost = 'localhost:8888';

const instance = axios.create({
  baseURL: 'http://localhost:8888',
  timeout: 1000,
  headers: {}
});


function ioConnect({ onUpdateUsers, onUpdateServers, onUpdateVars }: socketParam) {
  const socket = io(matchServerHost, {
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

function idleServerCount(number: number) {
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
  activeDediServer,
  blockDediServer,
  desireIdleServerCount: idleServerCount,
}