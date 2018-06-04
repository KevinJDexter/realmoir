import { combineReducers } from 'redux';
import { STORY_ACTIONS } from '../actions/storyActions';

const stories = (state = [], action) => {
  switch (action.type) {
    case STORY_ACTIONS.SET_STORIES:
      return action.payload;
    default: 
      return state;
  }
}

export default combineReducers({
  stories,
}) 