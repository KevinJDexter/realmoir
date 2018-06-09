import { put, takeEvery } from 'redux-saga/effects';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';
import { CREATE_PAGE_ACTIONS } from '../actions/createPageActions';
import { callLocations, callPostLocation } from '../requests/locationRequests';
import { callLocationStoryJunction } from '../requests/junctionRequests';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchLocations() {
  try {
    yield put({ type: LOCATION_ACTIONS.REQUEST_START });
    const locations = yield callLocations();
    yield put({
      type: LOCATION_ACTIONS.SET_LOCATIONS,
      payload: locations,
    });
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE, });
  } catch (error) { 
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE, });
  }
}

function* createLocation(action) {
  try {
    yield put({ type: LOCATION_ACTIONS.REQUEST_START });
    const locationId = yield callPostLocation(action.payload);
    action.payload.related_stories.forEach(story => {
      let junctionIds = {location_id: locationId, story_id: story.value};
      console.log(junctionIds);
      callLocationStoryJunction(junctionIds);
    })
    yield put({ type: CREATE_PAGE_ACTIONS.CLEAR_CREATE_STORY})
    yield put ({ type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED});
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE, });
  } catch (error) { 
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE, });
  }
}

function* locationSaga() {
  yield takeEvery(LOCATION_ACTIONS.GET_LOCATIONS, fetchLocations);
  yield takeEvery(LOCATION_ACTIONS.CREATE_NEW_LOCATION, createLocation);
}

export default locationSaga;