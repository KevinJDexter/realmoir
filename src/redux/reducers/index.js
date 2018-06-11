import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import recentlyAdded from './recentlyAddedReducer';
import worlds from './worldReducer';
import stories from './storyReducer';
import browse from './browseReducer';
import create from './createPageReducer';
import search from './searchReducer';
import locations from './locationReducer';
import characters from './characterReducer';

const store = combineReducers({
  user,
  login,
  recentlyAdded,
  worlds,
  stories,
  browse,
  create,
  search,
  locations,
  characters,
});

export default store;
