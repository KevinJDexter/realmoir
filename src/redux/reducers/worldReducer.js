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

const worldDetails = (state = {stories: [], locations: [], characters: [], events: []}, action) => {
  switch (action.type) {
    case WORLD_ACTIONS.SET_WORLD_DETAILS:
      return action.payload;
    case WORLD_ACTIONS.CLEAR_WORLD_DETAILS:
      return {stories: [], locations: [], characters: [], events: []};
    default:
      return state;
  }
}

export default combineReducers({
  worlds,
  isLoading,
  worldDetails,
}) 