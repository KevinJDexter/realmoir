import { combineReducers } from 'redux';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';

const sortByDate = function(a, b) {
  if (a.date_created < b.date_created) {
    return 1
  } else if (a.date_created > b.date_created) {
    return -1
  } else {
    return 0;
  }
}

const recentlyAdded = (state = [], action) => {
  switch (action.type) {
    case RECENTLY_ADDED_ACTIONS.SET_RECENTLY_ADDED:
      const sortedArray = action.payload.sort(sortByDate);
      return sortedArray.slice(0, 20);
    default: 
      return state;
  }
}

export default combineReducers({
  recentlyAdded,
}) 