import { combineReducers } from 'redux';
import data from './data';
import users from './users';
import servers from './servers';

const reducer = combineReducers({
  data,
  users,
  servers
});

export default reducer;