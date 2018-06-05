import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import recentlyAdded from './recentlyAddedReducer';
import worlds from './worldReducer';
import stories from './storyReducer';
import browse from './browseReducer';

const store = combineReducers({
  user,
  login,
  recentlyAdded,
  worlds,
  stories,
  browse,
});

export default store;
