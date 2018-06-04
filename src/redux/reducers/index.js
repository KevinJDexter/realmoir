import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import recentlyAdded from './recentlyAddedReducer';

const store = combineReducers({
  user,
  login,
  recentlyAdded,
  world,
});

export default store;
