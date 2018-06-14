import { combineReducers } from 'redux';
import { CHARACTER_ACTIONS } from '../actions/characterActions';

const characters = (state = [], action) => {
  switch (action.type) {
    case CHARACTER_ACTIONS.SET_CHARACTERS:
      return action.payload;
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case CHARACTER_ACTIONS.REQUEST_START:
      return true;
    case CHARACTER_ACTIONS.REQUEST_DONE:
      return false
    default: 
      return state;
  }
}

const charactersInWorld = (state = [], action) => {
  switch (action.type) {
    case CHARACTER_ACTIONS.SET_CHARACTERS_IN_WORLD:
      return action.payload;
    default:
      return state;
  }
}

const charactersInStory = (state = [], action) => {
  switch (action.type) {
    case CHARACTER_ACTIONS.SET_CHARACTERS_IN_STORY:
      return action.payload;
    default:
      return state;
  }
}

const characterDetails = (state = {stories: [], relationships: [], locations: [], events: []}, action) => {
  switch (action.type) {
    case CHARACTER_ACTIONS.SET_CHARACTER_DETAILS:
      return action.payload;
    case CHARACTER_ACTIONS.CLEAR_CHARACTER_DETAILS:
      return { stories: [], relationships: [], locations: [], events: [] };
    default:
      return state;
  }
}

export default combineReducers ({
  characters,
  isLoading,
  charactersInWorld,
  charactersInStory,
  characterDetails,
})