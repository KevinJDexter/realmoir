import { put, takeEvery } from 'redux-saga/effects';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { callLocations } from '../requests/locationRequests';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchLocations() {
  try {
    yield put({ type: LOCATION_ACTIONS.REQUEST_START });
    const locations = yield callLocations();
    yield put({
      type: LOCATION_ACTIONS.SET_LOCATIONS,
      payload: locations,
    });
    yield put({
      type: LOCATION_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: LOCATION_ACTIONS.REQUEST_DONE,
    });
  }
}

function* locationSaga() {
  yield takeEvery(LOCATION_ACTIONS.GET_LOCATIONS, fetchLocations);
}

export default locationSaga;