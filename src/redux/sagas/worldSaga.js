import { put, takeEvery } from 'redux-saga/effects';
import { WORLD_ACTIONS } from '../actions/worldActions';
import { callWorlds } from '../requests/worldRequests';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchWorlds() {
  try {
    yield put({ type: WORLD_ACTIONS.REQUEST_START });
    const worlds = yield callWorlds();
    yield put({
      type: WORLD_ACTIONS.SET_WORLDS,
      payload: worlds,
    });
    yield put({
      type: WORLD_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: WORLD_ACTIONS.REQUEST_DONE,
    });
  }
}

function* postNewWorld() {
  try {
    yield put ({ type: WORLD_ACTIONS.REQUEST_START });

    yield put ({ type: WORLD_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put ({
      type: WORLD_ACTIONS.REQUEST_DONE,
    })
  }
}

function* worldSaga() {
  yield takeEvery(WORLD_ACTIONS.GET_WORLDS, fetchWorlds);
  // yield takeEvery(WORLD_ACTIONS.POST_CREATE_WORLD, postNewWorld);
}

export default worldSaga;
