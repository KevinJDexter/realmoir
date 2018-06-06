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

const storiesInWorld = (state = [], action) => {
  switch (action.type) {
    case STORY_ACTIONS.SET_STORIES_IN_WORLD:
      return action.payload;
    default: 
      return state;
  }
}

const genres = (state = [], action) => {
  switch (action.type) {
    case STORY_ACTIONS.SET_STORY_GENRES:
      return action.payload;
    default:
      return state;
  }
}

const storyDetails = (state = {}, action) => {
  switch (action.type) {
    case STORY_ACTIONS.SET_STORY_DETAILS:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers({
  stories,
  storiesInWorld,
  genres,
  storyDetails,
}) 