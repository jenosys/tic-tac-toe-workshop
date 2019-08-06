import axios from 'axios';
import io from 'socket.io-client';


const matchServerHost = 'localhost:8888';

const instance = axios.create({
  baseURL: 'localhost:1234',
  timeout: 1000,
  headers: {}
});

interface socketParam {
  onUpdateUsers: (users: UserStore[]) => void,

}

export function connect({ onUpdateUsers }: socketParam) {
  const socket = io(matchServerHost);

  socket.on('connect', () => {
    console.log('socket connected');
  });

  socket.on('disconnect', () => {
    console.log('socket disconnect');
  });

  socket.on('users', (str: any) => {
    console.log(str);
    let users = JSON.parse(str) as UserStore[];
    onUpdateUsers(users);
  });
  
  socket.on('server', () => {
    console.log('servers');
  });
}