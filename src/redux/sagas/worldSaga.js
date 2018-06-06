import { put, takeEvery } from 'redux-saga/effects';
import { WORLD_ACTIONS } from '../actions/worldActions';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';
import { callWorlds, postNewWorld } from '../requests/worldRequests';

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

function* submitNewWorld(action) {
  try {
    yield put ({ type: WORLD_ACTIONS.REQUEST_START });
    yield postNewWorld(action.payload);
    const worlds = yield callWorlds();
    yield put ({
      type: WORLD_ACTIONS.SET_WORLDS,
      payload: worlds,
    });
    yield put ({
      type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED,
    })
    yield put ({ type: WORLD_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put ({
      type: WORLD_ACTIONS.REQUEST_DONE,
    })
  }
}

function* worldSaga() {
  yield takeEvery(WORLD_ACTIONS.GET_WORLDS, fetchWorlds);
  yield takeEvery(WORLD_ACTIONS.SUBMIT_NEW_WORLD, submitNewWorld);
}

export default worldSaga;
