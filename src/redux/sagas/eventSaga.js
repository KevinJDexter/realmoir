import { put, takeEvery, all } from 'redux-saga/effects';
import { EVENT_ACTIONS } from '../actions/eventActions';
import { callEventDetails, callEventsInWorld, callPostNewEvent, callDeleteEvent, callUpdateEvent } from '../requests/eventRequests';
import { callCharacterAtEvent } from '../requests/characterRequests';
import { callStoriesWithEvent } from '../requests/storyRequests';
import { callPostCEJunction, callPostESJunction, callDeleteCEJunctionByEvent, callDeleteESJunctionByEvent } from '../requests/junctionRequests';
import { CHARACTER_ACTIONS } from '../actions/characterActions';
import { STORY_ACTIONS } from '../actions/storyActions';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { CREATE_PAGE_ACTIONS } from '../actions/createPageActions';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';

function* fetchEventDetails(action) {
  try {
    yield put({ type: EVENT_ACTIONS.REQUEST_START });
    let event = yield callEventDetails(action.payload);
    event.characters = yield callCharacterAtEvent(action.payload);
    event.stories = yield callStoriesWithEvent(action.payload);
    yield put ({
      type: EVENT_ACTIONS.SET_EVENT_DETAILS,
      payload: event,
    })
    yield put ({
      type: CHARACTER_ACTIONS.GET_CHARACTERS_IN_WORLD,
      payload: event.world_id,
    })
    yield put ({
      type: STORY_ACTIONS.GET_STORIES_IN_WORLD,
      payload: event.world_id,
    })
    yield put ({ 
      type: LOCATION_ACTIONS.GET_LOCATIONS_IN_WORLD,
      payload: event.world_id,
    })
    yield put({ type: EVENT_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: EVENT_ACTIONS.REQUEST_DONE });
  }
}

function* fetchEventsInWorld(action) {
  try {
    yield put({ type: EVENT_ACTIONS.REQUEST_START });
    const events = yield callEventsInWorld(action.id);
    yield put ({
      type: EVENT_ACTIONS.SET_EVENTS_IN_WORLD,
      payload: events,
    })
    yield put({ type: EVENT_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: EVENT_ACTIONS.REQUEST_DONE });
  }
}

function* fetchCreateEvent(action) {
  try {
    yield put({ type: EVENT_ACTIONS.REQUEST_START });
    const event_id = yield callPostNewEvent(action.payload);
    yield all(action.payload.related_stories.forEach(story => {
      callPostESJunction({event_id: event_id, story_id: story.value})
    }))
    yield all(action.payload.related_characters.forEach(character => {
      callPostCEJunction({event_id: event_id, character_id: character.value})
    }))
    yield put({ type: CREATE_PAGE_ACTIONS.CLEAR_FORM_INFO })
    yield put({ type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED })
    yield put({ type: EVENT_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: EVENT_ACTIONS.REQUEST_DONE });
  }
}

function* fetchDeleteEvent(action) {
  try {
    yield put({ type: EVENT_ACTIONS.REQUEST_START });
    yield callDeleteEvent(action.payload);
    yield put({ type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED });
    yield put({ type: EVENT_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: EVENT_ACTIONS.REQUEST_DONE });
  }
}

function* fetchEditEvent(action) {
  try {
    yield put({ type: EVENT_ACTIONS.REQUEST_START });
    yield callUpdateEvent(action);
    yield callDeleteCEJunctionByEvent(action.id);
    yield all (action.payload.related_characters.forEach(character => {
      callPostCEJunction({ character_id: character.value, event_id: action.id })
    }));
    yield callDeleteESJunctionByEvent(action.id);
    yield all (action.payload.related_stories.forEach(story => {
      callPostESJunction({ event_id: action.id, story_id: story.value });
    }));
    yield put ({
      type: EVENT_ACTIONS.GET_EVENT_DETAILS,
      payload: action.id,
    })
    yield put({ type: EVENT_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: EVENT_ACTIONS.REQUEST_DONE });
  }
}

function* eventSaga() {
  yield takeEvery(EVENT_ACTIONS.GET_EVENT_DETAILS, fetchEventDetails);
  yield takeEvery(EVENT_ACTIONS.GET_EVENTS_IN_WORLD, fetchEventsInWorld);
  yield takeEvery(EVENT_ACTIONS.CREATE_NEW_EVENT, fetchCreateEvent);
  yield takeEvery(EVENT_ACTIONS.DELETE_EVENT, fetchDeleteEvent);
  yield takeEvery(EVENT_ACTIONS.SUBMIT_EDIT_EVENT, fetchEditEvent);
}

export default eventSaga;