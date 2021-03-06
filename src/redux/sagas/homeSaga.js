import { put, takeEvery } from 'redux-saga/effects';
import { HOME_ACTIONS } from '../actions/homeActions';
import { STORY_ACTIONS } from '../actions/storyActions';
import { WORLD_ACTIONS } from '../actions/worldActions';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';
import { EVENT_ACTIONS } from '../actions/eventActions';

function* startHome(action) {
  yield put ({ type: STORY_ACTIONS.GET_STORIES});
  yield put ({ type: WORLD_ACTIONS.GET_WORLDS});
  yield put ({ type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED});
}

function* createSaga() {
  yield takeEvery(HOME_ACTIONS.RUN_HOME_OPTIONS, startHome);
}

export default createSaga;
