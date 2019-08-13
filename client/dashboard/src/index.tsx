import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from './App';
import rootReducer from './store/modules';
// import { addServer, removeServer, updateServer } from './store/modules/servers';
// import { addUser, removeUser } from './store/modules/users';



const store = createStore(rootReducer);

// console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />,
  </Provider>,
  document.getElementById('root'),
);

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

function makeid(length: number) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const simulation = false;

// if (simulation) {
//   setInterval(() => {
//     Math.random() > 0.4 && store.dispatch(addUser(makeid(7), getRandomInt(100, 1000)));
//     store.getState().servers.filter(s => s.state === 'ready').length < 10 && store.dispatch(addServer(`57.31.126.${getRandomInt(122,125)}:` + getRandomInt(1000, 65535), 'sample:5'));
//   }, 1000);

//   setTimeout(() => {
//     setInterval(() => {
//       let { users } = store.getState();
//       if (users.length > 10) {
//         let idx = getRandomInt(0, users.length - 1);
//         store.dispatch(removeUser(users[idx].username));
//       }

//       let servers = store.getState().servers.filter(s => s.state === 'ready');
//       if (Math.random() > 0.4) {
//         let server = servers[getRandomInt(0, servers.length - 1)];
//         store.dispatch(updateServer(server.addr, 'busy'));
//       }

//       servers = store.getState().servers.filter(s => s.state === 'busy');
//       if (servers.length > 4 &&  Math.random() > 0.3) {
//         let server = servers[getRandomInt(0, servers.length - 1)];
//         store.dispatch(removeServer(server.addr));
//       }
//     }, 1000);
//   }, 5100);

// }