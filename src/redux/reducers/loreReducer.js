import { combineReducers } from 'redux';
import { LORE_ACTIONS } from '../actions/loreActions';

const lore = (state = [], action) => {
  switch (action.type) {
    case LORE_ACTIONS.SET_LORE:
      return action.payload;
    default: 
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case LORE_ACTIONS.REQUEST_START:
      return true;
    case LORE_ACTIONS.REQUEST_DONE:
      return false
    default: 
      return state;
  }
}

const loreInWorld = (state = [], action) => {
  switch (action.type) {
    case LORE_ACTIONS.SET_LORE_IN_WORLD:
      return action.payload;
    case LORE_ACTIONS.CLEAR_LORE_IN_WORLD:
      return [];
    default: 
      return state;
  }
}

const loreDetails = (state = {}, action) => {
  switch (action.type) {
    case LORE_ACTIONS.SET_LORE_DETAILS:
      return action.payload;
    case LORE_ACTIONS.CLEAR_LORE_DETAILS:
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