import { put, takeEvery } from 'redux-saga/effects';
import { BROWSE_ACTIONS } from '../actions/browseActions';
import { callStoriesInWorld } from '../requests/storyRequests';

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
      type: BROWSE_ACTIONS.SET_WORLD_STORIES,
      payload: stories,
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
