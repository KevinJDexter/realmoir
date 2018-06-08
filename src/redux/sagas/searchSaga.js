import { put, takeEvery } from 'redux-saga/effects';
import { SEARCH_ACTIONS } from '../actions/searchActions';
import { callSearchWorlds } from '../requests/worldRequests';
import { callSearchStories } from '../requests/storyRequests';

function* getSearchResults(action) {
  try {
    yield put({ type: SEARCH_ACTIONS.REQUEST_START });
    let worlds = yield callSearchWorlds(action.payload);
    worlds = worlds.map(world => ({...world, objectType: 'world' }));
    let stories = yield callSearchStories(action.payload);
    stories = stories.map(story => ({...story, objectType: 'story'}))
    const searchResults = [...worlds, ...stories];
    yield put({ type: SEARCH_ACTIONS.SET_SEARCH_RESULTS, payload: searchResults });
    yield put({ type: SEARCH_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: SEARCH_ACTIONS.REQUEST_DONE });
  }
}

function* searchSaga() {
  yield takeEvery(SEARCH_ACTIONS.SUBMIT_SEARCH_QUERY, getSearchResults);
}

export default searchSaga;