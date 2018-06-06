import { combineReducers } from 'redux';
import { BROWSE_ACTIONS } from '../actions/browseActions';

const browse = (state = {story: {}, world: {}}, action) => {
  switch (action.type) {
    case BROWSE_ACTIONS.GET_BROWSE_WORLD:
      return state.world;
    case BROWSE_ACTIONS.SET_BROWSE_WORLD:
      return {...state, world: action.payload};
    case BROWSE_ACTIONS.GET_BROWSE_STORY:
      return state.story;
    case BROWSE_ACTIONS.SET_BROWSE_STORY:
      return {...state, story: action.payload};
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

export default combineReducers({
  browse,
}) 