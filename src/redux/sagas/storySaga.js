import { put, takeEvery } from 'redux-saga/effects';
import { STORY_ACTIONS } from '../actions/storyActions';
import { callStories } from '../requests/storyRequests';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchStories() {
  try {
    yield put({ type: STORY_ACTIONS.REQUEST_START });
    const stories = yield callStories();
    yield put({
      type: STORY_ACTIONS.SET_STORIES,
      payload: stories,
    });
    yield put({
      type: STORY_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: STORY_ACTIONS.REQUEST_DONE,
    });
  }
}

function* storySaga() {
  yield takeEvery(STORY_ACTIONS.GET_STORIES, fetchStories);
}

export default storySaga;
