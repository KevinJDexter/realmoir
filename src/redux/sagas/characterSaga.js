import { put, takeEvery, all } from 'redux-saga/effects';
import { CHARACTER_ACTIONS } from '../actions/characterActions';
import { callCharactersInWorld } from '../requests/characterRequests';


function* fetchCharactersInWorld(action) {
  try {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_START });
    const characters = yield callCharactersInWorld(action.payload);
    yield put ({ 
      type: CHARACTER_ACTIONS.SET_CHARACTERS_IN_WORLD,
      payload: characters,
    })
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put ({type: CHARACTER_ACTIONS.REQUEST_DONE});
  }
}

function* characterSaga() {
  yield takeEvery(CHARACTER_ACTIONS.GET_CHARACTERS_IN_WORLD, fetchCharactersInWorld)
}

export default characterSaga;