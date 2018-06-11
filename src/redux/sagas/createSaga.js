import { put, takeEvery } from 'redux-saga/effects';
import { CREATE_PAGE_ACTIONS } from '../actions/createPageActions';
import { STORY_ACTIONS } from '../actions/storyActions';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { CHARACTER_ACTIONS } from '../actions/characterActions';
import { callStoriesInWorld } from '../requests/storyRequests';
import { callLocationsInWorld } from '../requests/locationRequests';
import { callCharactersInWorld } from '../requests/characterRequests';

// worker Saga: will be fired on "FETCH_USER" actions
function* changeWorld(action) {
  try {
    yield put({ type: CREATE_PAGE_ACTIONS.REQUEST_START });
    yield put({
      type: CREATE_PAGE_ACTIONS.SET_CREATE_WORLD,
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
    const characters = yield callCharactersInWorld(action.payload.id);
    yield put ({
      type: CHARACTER_ACTIONS.SET_CHARACTERS_IN_WORLD,
      payload: characters,
    })
    yield put({
      type: CREATE_PAGE_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: CREATE_PAGE_ACTIONS.REQUEST_DONE,
    });
  }
}

function* createSaga() {
  yield takeEvery(CREATE_PAGE_ACTIONS.CHANGE_CREATE_WORLD, changeWorld);
}

export default createSaga;
