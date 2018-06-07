import {combineReducers} from 'redux';
import {CREATE_PAGE_ACTIONS} from '../actions/createPageActions';

const world = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PAGE_ACTIONS.SET_CREATE_WORLD:
      return action.payload; 
    case CREATE_PAGE_ACTIONS.CLEAR_FORM_INFO:
      return {};
    default:
      return state;
  }
}

const story = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PAGE_ACTIONS.SET_CREATE_STORY:
      return action.payload; 
    case CREATE_PAGE_ACTIONS.CLEAR_FORM_INFO:
      return {};
    default:
      return state;
  }
}

const formType = (state = '', action) => {
  switch (action.type) {
    case CREATE_PAGE_ACTIONS.SET_FORM_TYPE_WORLD:
      return 'world';
    case CREATE_PAGE_ACTIONS.SET_FORM_TYPE_STORY:
      return 'story';
    case CREATE_PAGE_ACTIONS.CLEAR_FORM_INFO:
      return '';
    default:
      return state;
  }
}

export default combineReducers({
  world,
  story,
  formType,
})