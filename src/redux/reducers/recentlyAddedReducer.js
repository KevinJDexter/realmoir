import { combineReducers } from 'redux';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';

const recentlyAdded = (state = {}, action) => {
  switch (action.type) {
    default: 
      return state;
  }
}

export default combineReducers({
  recentlyAdded,
}) 