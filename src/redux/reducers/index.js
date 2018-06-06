import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import recentlyAdded from './recentlyAddedReducer';
import worlds from './worldReducer';
import stories from './storyReducer';
import browse from './browseReducer';
import create from './createPageReducer';

const store = combineReducers({
  user,
  login,
  recentlyAdded,
  worlds,
  stories,
  browse,
  create,
});

export default store;
