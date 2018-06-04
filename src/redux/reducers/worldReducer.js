import { combineReducers } from 'redux';
import { WORLD_ACTIONS } from '../actions/worldActions';

const worlds = (state = {}, action) => {
  switch (action.type) {
    case SET_WORLDS:
      return action.payload;
    default: 
      return state;
  }
}

export default combineReducers({
  worlds,
}) 