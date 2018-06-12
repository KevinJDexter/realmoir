import { put, takeEvery } from 'redux-saga/effects';
import { WORLD_ACTIONS } from '../actions/worldActions';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';
import { CREATE_PAGE_ACTIONS } from '../actions/createPageActions';
import { callWorlds, postNewWorld, callWorldDetails, editWorldDetails, deleteWorld } from '../requests/worldRequests';
import { callStoriesInWorld } from '../requests/storyRequests';
import { callLocationsInWorld } from '../requests/locationRequests';
import { callCharactersInWorld } from '../requests/characterRequests';
import { callEventsInWorld } from '../requests/eventRequests';

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
    yield put ({ type: CREATE_PAGE_ACTIONS.CLEAR_FORM_INFO })
    yield put ({ type: WORLD_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put ({
      type: WORLD_ACTIONS.REQUEST_DONE,
    })
  }
}

function* fetchWorldDetails(action) {
  try {
    yield put ({ type: WORLD_ACTIONS.REQUEST_START });
    const worldDetails = yield callWorldDetails(action.payload);
    worldDetails.stories = yield callStoriesInWorld(action.payload);
    worldDetails.locations = yield callLocationsInWorld(action.payload);
    worldDetails.characters = yield callCharactersInWorld(action.payload);
    worldDetails.events = yield callEventsInWorld(action.payload);
    yield put ({ 
      type: WORLD_ACTIONS.SET_WORLD_DETAILS,
      payload: worldDetails,
    })
    yield put ({ type: WORLD_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put ({ type: WORLD_ACTIONS.REQUEST_DONE });
  }
}

function* modifyWorldDetails(action) {
  try {
    yield put ({type: WORLD_ACTIONS.REQUEST_START });
    yield editWorldDetails(action);
    yield put ({ type: WORLD_ACTIONS.REQUEST_DONE });
    const detailsAction = ({payload: action.id});
    yield fetchWorldDetails(detailsAction);
  } catch (error) {
    yield put ({ type: WORLD_ACTIONS.REQUEST_DONE });
  }
}

function* removeWorld(action) {
  try {
    yield put({type: WORLD_ACTIONS.REQUEST_START});
    yield deleteWorld(action.payload);
    yield put ({type: WORLD_ACTIONS.CLEAR_WORLD_DETAILS});
    yield put ({type: WORLD_ACTIONS.REQUEST_DONE});
    yield put ({type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED});
  } catch (error) {
    yield put ({type: WORLD_ACTIONS.REQUEST_DONE});
  }
}

function* worldSaga() {
  yield takeEvery(WORLD_ACTIONS.GET_WORLDS, fetchWorlds);
  yield takeEvery(WORLD_ACTIONS.SUBMIT_NEW_WORLD, submitNewWorld);
  yield takeEvery(WORLD_ACTIONS.GET_WORLD_DETAILS, fetchWorldDetails);
  yield takeEvery(WORLD_ACTIONS.SUBMIT_WORLD_EDITS, modifyWorldDetails);
  yield takeEvery(WORLD_ACTIONS.DELETE_WORLD, removeWorld);
}

export default worldSaga;
