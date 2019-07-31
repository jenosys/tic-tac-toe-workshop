import { combineReducers } from 'redux';
import auth from './auth';
import users from './users';
import servers from './servers';

const reducer = combineReducers({
  auth,
  users,
  servers
});

export default reducer;