import { combineReducers } from 'redux';
import { LOCATION_ACTIONS } from '../actions/locationActions';

const locations = (state = [], action) => {
  switch (action.type) {
    case LOCATION_ACTIONS.SET_LOCATIONS:
      return action.payload;
    default:
      return state;
  }
}

const locationsInWorld = (state = [], action) => {
  switch (action.type) {
    case LOCATION_ACTIONS.SET_LOCATIONS_IN_WORLD:
      return action.payload;
    default:
      return state;
  }
}

const locationsInStory = (state = [], action) => {
  switch (action.type) {
    case LOCATION_ACTIONS.SET_LOCATIONS_IN_STORY:
      return action.payload;
    default:
      return state;
  }
}

export default combineReducers ({
  locations,
  locationsInWorld,
  locationsInStory,
})