import { combineReducers } from 'redux';
import { EVENT_ACTIONS } from '../actions/eventActions';

const events = (state = [], action) => {
  switch (action.type) {
    case EVENT_ACTIONS.SET_EVENTS:
      return action.payload;
    default:
      return state;
  }
}

const isLoading = (state = false, action) => {
  switch (action.type) {
    case EVENT_ACTIONS.REQUEST_START:
      return true;
    case EVENT_ACTIONS.REQUEST_DONE:
      return false
    default: 
      return state;
  }
}

const eventsInWorld = (state = [], action) => {
  switch (action.type) {
    case EVENT_ACTIONS.SET_EVENTS_IN_WORLD:
      return action.payload;
    default:
      return state;
  }
}

const eventsInStory = (state = [], action) => {
  switch (action.type) {
    case EVENT_ACTIONS.SET_EVENTS_IN_STORY:
      return action.payload;
    default:
      return state;
  }
}

const eventDetails = (state = {stories: [], characters: []}, action) => {
  switch (action.type) {
    case EVENT_ACTIONS.SET_EVENT_DETAILS:
      return action.payload;
    case EVENT_ACTIONS.CLEAR_EVENT_DETAILS:
      return { stories: [], characters: [] };
    default:
      return state;
  }
}

export default combineReducers ({
  events,
  isLoading,
  eventsInWorld,
  eventsInStory,
  eventDetails,
})