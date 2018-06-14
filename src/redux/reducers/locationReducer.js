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

const isLoading = (state = false, action) => {
  switch (action.type) {
    case LOCATION_ACTIONS.REQUEST_START:
      return true;
    case LOCATION_ACTIONS.REQUEST_DONE:
      return false
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

const locationDetails = (state = {stories: [], neighbors: [], characters: [], homeTo: [], events: []}, action) => {
  switch (action.type) {
    case LOCATION_ACTIONS.SET_LOCATION_DETAILS:
      return action.payload;
    case LOCATION_ACTIONS.CLEAR_LOCATION_DETAILS:
      return { stories: [], neighbors: [], characters: [], homeTo: [], events: [] };
    default:
      return state;
  }
}

export default combineReducers ({
  locations,
  isLoading,
  locationsInWorld,
  locationsInStory,
  locationDetails,
})