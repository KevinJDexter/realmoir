import { put, takeEvery, all } from 'redux-saga/effects';
import { CHARACTER_ACTIONS } from '../actions/characterActions';
import { callCharacterDetails, callCharactersInWorld, callCharacterRelationships } from '../requests/characterRequests';
import { callStoriesWithCharacter } from '../requests/storyRequests';
import { callLocationCharacterVisits } from '../requests/locationRequests';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { STORY_ACTIONS } from '../actions/storyActions';

function* fetchCharacterDetails(action) {
  try {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_START });
    let character = yield callCharacterDetails(action.payload);
    character.stories = yield callStoriesWithCharacter(action.payload);
    character.locations = yield callLocationCharacterVisits(action.payload);
    character.relationships = yield callCharacterRelationships(action.payload);
    yield put ({
      type: CHARACTER_ACTIONS.SET_CHARACTER_DETAILS,
      payload: character,
    })
    yield put ({
      type: LOCATION_ACTIONS.GET_LOCATIONS_IN_WORLD,
      payload: character.world_id,
    })
    yield put ({
      type: CHARACTER_ACTIONS.GET_CHARACTERS_IN_WORLD,
      payload: character.world_id,
    })
    yield put ({
      type: STORY_ACTIONS.GET_STORIES_IN_WORLD,
      payload: character.world_id,
    })
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE });
  }
}

function* fetchCharactersInWorld(action) {
  try {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_START });
    const characters = yield callCharactersInWorld(action.payload);
    yield put({
      type: CHARACTER_ACTIONS.SET_CHARACTERS_IN_WORLD,
      payload: characters,
    })
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE });
  }
}

function* characterSaga() {
  yield takeEvery(CHARACTER_ACTIONS.GET_CHARACTER_DETAILS, fetchCharacterDetails);
  yield takeEvery(CHARACTER_ACTIONS.GET_CHARACTERS_IN_WORLD, fetchCharactersInWorld);
}

export default characterSaga;