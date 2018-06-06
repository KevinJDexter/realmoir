import { put, takeEvery } from 'redux-saga/effects';
import { CREATE_PAGE_ACTIONS } from '../actions/createPageActions';
import { STORY_ACTIONS } from '../actions/storyActions';
import { callStoriesInWorld } from '../requests/storyRequests';

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
    yield put ({
      type: STORY_ACTIONS.GET_STORIES,
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
