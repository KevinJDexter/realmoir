import { put, takeEvery, all } from 'redux-saga/effects';
import { CHARACTER_ACTIONS } from '../actions/characterActions';
import { callCharacterDetails, callCharactersInWorld, callCharacterRelationships, callAddCharacter, callDeleteCharacter, callEditCharacter } from '../requests/characterRequests';
import { callStoriesWithCharacter } from '../requests/storyRequests';
import { callLocationCharacterVisits } from '../requests/locationRequests';
import { callEventsWithCharacter } from '../requests/eventRequests';
import { callPostCLJunction, callPostCSJunction, callDeleteCSJunctionByCharacter, callDeleteCLJunctionByCharacter, callPostCharacterRelationships, callDeleteCharacterRelationships, callPostCEJunction, callDeleteCEJunctionByCharacter } from '../requests/junctionRequests';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { STORY_ACTIONS } from '../actions/storyActions';
import { CREATE_PAGE_ACTIONS } from '../actions/createPageActions';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';
import { EVENT_ACTIONS } from '../actions/eventActions';

function* fetchCharacterDetails(action) {
  try {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_START });
    let character = yield callCharacterDetails(action.payload);
    character.stories = yield callStoriesWithCharacter(action.payload);
    character.locations = yield callLocationCharacterVisits(action.payload);
    character.relationships = yield callCharacterRelationships(action.payload);
    character.events = yield callEventsWithCharacter(action.payload);
    yield put({
      type: CHARACTER_ACTIONS.SET_CHARACTER_DETAILS,
      payload: character,
    })
    yield put({
      type: LOCATION_ACTIONS.GET_LOCATIONS_IN_WORLD,
      payload: character.world_id,
    })
    yield put({
      type: EVENT_ACTIONS.GET_EVENTS_IN_WORLD,
      payload: character.world_id,
    })
    yield put({
      type: CHARACTER_ACTIONS.GET_CHARACTERS_IN_WORLD,
      payload: character.world_id,
    })
    yield put({
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

function* fetchCreateCharacter(action) {
  try {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_START });
    const characterId = yield callAddCharacter(action.payload);
    yield all(action.payload.related_stories.forEach(story => {
      callPostCSJunction({ character_id: characterId, story_id: story.value });
    }))
    yield all(action.payload.related_characters.forEach(character => {
      callPostCharacterRelationships({ first_character: characterId, second_character: character.value, relationship: character.relationship })
    }))
    yield all(action.payload.related_locations.forEach(location => {
      callPostCLJunction({ character_id: characterId, location_id: location.value });
    }))
    yield all(action.payload.related_events.forEach(event => {
      callPostCEJunction({ character_id: characterId, event_id: event.value });
    }))
    yield put({ type: CREATE_PAGE_ACTIONS.CLEAR_CREATE_STORY })
    yield put({ type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED });
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE, });
  } catch (error) {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE, });
  }
}

function* fetchDeleteCharacter(action) {
  try {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_START });
    yield callDeleteCharacter(action.payload);
    yield put ({ type: CHARACTER_ACTIONS.CLEAR_CHARACTER_DETAILS });
    yield put ({type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED});
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE });
  }
}

function* fetchEditCharacter(action) {
  try {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_START });
    yield callEditCharacter(action);
    yield callDeleteCSJunctionByCharacter(action.id);
    yield all (action.payload.related_stories.forEach(story => {
      callPostCSJunction({character_id: action.id, story_id: story.value})
    }))
    yield callDeleteCLJunctionByCharacter(action.id);
    yield all(action.payload.related_locations.forEach(location => {
      callPostCLJunction({character_id: action.id, location_id: location.value})
    }))
    yield callDeleteCharacterRelationships(action.id);
    yield all (action.payload.related_characters.forEach(character => {
      callPostCharacterRelationships({first_character: action.id, second_character: character.value, relationship: character.relationship});
    }))
    yield callDeleteCEJunctionByCharacter(action.id);
    yield all (action.payload.related_events.forEach(event => {
      callPostCEJunction({character_id: action.id, event_id: event.value });
    }))
    yield put ({ 
      type: CHARACTER_ACTIONS.GET_CHARACTER_DETAILS,
      payload: action.id,
    })
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: CHARACTER_ACTIONS.REQUEST_DONE });
  } 
}

function* characterSaga() {
  yield takeEvery(CHARACTER_ACTIONS.GET_CHARACTER_DETAILS, fetchCharacterDetails);
  yield takeEvery(CHARACTER_ACTIONS.GET_CHARACTERS_IN_WORLD, fetchCharactersInWorld);
  yield takeEvery(CHARACTER_ACTIONS.CREATE_NEW_CHARACTER, fetchCreateCharacter);
  yield takeEvery(CHARACTER_ACTIONS.DELETE_CHARACTER, fetchDeleteCharacter);
  yield takeEvery(CHARACTER_ACTIONS.SUBMIT_EDIT_CHARACTER, fetchEditCharacter);
}

export default characterSaga;