import { combineReducers } from 'redux';
import { SEARCH_ACTIONS } from '../actions/searchActions';

const sortByDate = function(a, b) {
  if (a.date_created < b.date_created) {
    return 1
  } else if (a.date_created > b.date_created) {
    return -1
  } else {
    return 0;
  }
}

const searchResults = (state = [], action) => {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_SEARCH_RESULTS:
      const sortedArray = action.payload.sort(sortByDate);
      return sortedArray;
    default: 
      return state;
  }
}

export default combineReducers({
  searchResults,
})