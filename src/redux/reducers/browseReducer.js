import { combineReducers } from 'redux';
import { BROWSE_ACTIONS } from '../actions/browseActions';

const world = (state = {}, action) => {
  switch (action.type) {
    case BROWSE_ACTIONS.SET_BROWSE_WORLD:
      return action.payload;
    case BROWSE_ACTIONS.CLEAR_BROWSE_INFO:
      return {};
    default: 
      return state;
  }
}

const story = (state = {}, action) => {
  switch(action.type) {
    case BROWSE_ACTIONS.SET_BROWSE_STORY:
      return action.payload;
    case BROWSE_ACTIONS.CLEAR_BROWSE_INFO:
      return {};
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case BROWSE_ACTIONS.REQUEST_START:
      return true;
    case BROWSE_ACTIONS.REQUEST_DONE:
      return false
    default: 
      return state;
  }
}

const afterWorldOption = (state = '', action) => {
  switch (action.type) {
    case BROWSE_ACTIONS.SET_AFTER_WORLD_OPTION:
      return action.payload;
    case BROWSE_ACTIONS.CLEAR_BROWSE_INFO:
      return '';
    default: 
      return state;
  }
}

export default combineReducers({
  world,
  story,
  isLoading,
  afterWorldOption,
}) 