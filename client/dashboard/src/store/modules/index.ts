import { combineReducers } from 'redux';
import vars from './vars';
import users from './users';
import servers from './servers';

const reducer = combineReducers({
  vars,
  users,
  servers
});

export default reducer;