import { put, takeEvery, all } from 'redux-saga/effects';
import { CHARACTER_ACTIONS } from '../actions/characterActions';
import { EVENT_ACTIONS } from '../actions/eventActions';

function* fetchEventDetails (action) {

}

function* fetchEventsInWorld (action) {

}

function* fetchCreateEvent (action) {

}

function* fetchDeleteEvent (action) {

}

function fetchEditEvent (action) {

}

function* eventSaga() {
  yield takeEvery(EVENT_ACTIONS.GET_EVENT_DETAILS, fetchEventDetails);
  yield takeEvery(EVENT_ACTIONS.GET_EVENTS_IN_WORLD, fetchEventsInWorld);
  yield takeEvery(EVENT_ACTIONS.CREATE_NEW_EVENT, fetchCreateEvent);
  yield takeEvery(EVENT_ACTIONS.DELETE_EVENT, fetchDeleteEvent);
  yield takeEvery(EVENT_ACTIONS.SUBMIT_EDIT_EVENT, fetchEditEvent);
}

export default eventSaga;