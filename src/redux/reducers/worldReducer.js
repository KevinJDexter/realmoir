import { combineReducers } from 'redux';
import { WORLD_ACTIONS } from '../actions/worldActions';

const worlds = (state = [], action) => {
  switch (action.type) {
    case WORLD_ACTIONS.SET_WORLDS:
      return action.payload;
    default: 
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case WORLD_ACTIONS.REQUEST_START:
      return true;
    case WORLD_ACTIONS.REQUEST_DONE:
      return false
    default: 
      return state;
  }
}

export default combineReducers({
  worlds,
}) 