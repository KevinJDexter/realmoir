import { put, takeEvery } from 'redux-saga/effects';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';

function* getRecentlyAdded () {
  console.log('recentlyAdded');
}

function* recentlyAddedSaga() {
  yield takeEvery(RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED, getRecentlyAdded);
}

export default recentlyAddedSaga;