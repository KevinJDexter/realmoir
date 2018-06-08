import { put, takeEvery } from 'redux-saga/effects';
import { BROWSE_ACTIONS } from '../actions/browseActions';
import { STORY_ACTIONS } from '../actions/storyActions';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { callStoriesInWorld } from '../requests/storyRequests';
import { callLocationsInWorld } from '../requests/locationRequests';

// worker Saga: will be fired on "FETCH_USER" actions
function* changeWorld(action) {
  try {
    yield put({ type: BROWSE_ACTIONS.REQUEST_START });
    yield put({
      type: BROWSE_ACTIONS.SET_BROWSE_WORLD,
      payload: action.payload,
    });
    const stories = yield callStoriesInWorld(action.payload.id);
    yield put ({
      type: STORY_ACTIONS.SET_STORIES_IN_WORLD,
      payload: stories,
    })
    const locations = yield callLocationsInWorld(action.payload.id);
    yield put ({
      type: LOCATION_ACTIONS.SET_LOCATIONS_IN_WORLD,
      payload: locations,
    })
    yield put({
      type: BROWSE_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: BROWSE_ACTIONS.REQUEST_DONE,
    });
  }
}

function* browseSaga() {
  yield takeEvery(BROWSE_ACTIONS.CHANGE_BROWSE_WORLD, changeWorld);
}

export default browseSaga;
