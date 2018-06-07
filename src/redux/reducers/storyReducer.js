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

const isLoading = (state = false, action) => {
  switch (action.type) {
    case STORY_ACTIONS.REQUEST_START:
      return true;
    case STORY_ACTIONS.REQUEST_DONE:
      return false
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
    case STORY_ACTIONS.CLEAR_STORY_DETAILS:
      return {};
    default:
      return state;
  }
}

export default combineReducers({
  stories,
  storiesInWorld,
  genres,
  storyDetails,
  isLoading,
}) 