import { put, takeEvery } from 'redux-saga/effects';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';
import { callWorlds } from '../requests/worldRequests';
import { callStories } from '../requests/storyRequests';
import { callLocations } from '../requests/locationRequests';

function* getRecentlyAdded() {
  try {
    yield put({ type: RECENTLY_ADDED_ACTIONS.REQUEST_START });
    let worlds = yield callWorlds();
    worlds = worlds.map(world => ({...world, objectType: 'world' }))
    let stories = yield callStories();
    stories = stories.map(story => ({...story, objectType: 'story' }))
    let locations = yield callLocations();
    locations = locations.map(location => ({...location, objectType: 'location' }))
    const recentlyAdded = [...worlds, ...stories, ...locations]
    yield put({ type: RECENTLY_ADDED_ACTIONS.SET_RECENTLY_ADDED, payload: recentlyAdded });
    yield put({ type: RECENTLY_ADDED_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: RECENTLY_ADDED_ACTIONS.REQUEST_DONE });
  }
}

function* recentlyAddedSaga() {
  yield takeEvery(RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED, getRecentlyAdded);
}

export default recentlyAddedSaga;