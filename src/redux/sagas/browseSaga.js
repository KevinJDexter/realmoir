import { put, takeEvery } from 'redux-saga/effects';
import { BROWSE_ACTIONS } from '../actions/browseActions';
import { STORY_ACTIONS } from '../actions/storyActions';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { callStoriesInWorld } from '../requests/storyRequests';
import { callLocationsInWorld, callLocationsInStory } from '../requests/locationRequests';
import { callCharactersInWorld, callCharactersInStory } from '../requests/characterRequests';
import { callEventsInStory, callEventsInWorld } from '../requests/eventRequests';
import { CHARACTER_ACTIONS } from '../actions/characterActions';
import { EVENT_ACTIONS } from '../actions/eventActions';

function* changeAfterWorldOption(action) {
  try {
    yield put({ type: BROWSE_ACTIONS.REQUEST_START });
    yield put ({ 
      type: BROWSE_ACTIONS.SET_AFTER_WORLD_OPTION,
      payload: action.payload,
    })
    if (action.payload === 'story') {
      const stories = yield callStoriesInWorld(action.id);
      yield put ({
        type: STORY_ACTIONS.SET_STORIES_IN_WORLD,
        payload: stories,
      })
    } else if (action.payload === 'location') {
      const locations = yield callLocationsInWorld(action.id);
      yield put ({
        type: LOCATION_ACTIONS.SET_LOCATIONS_IN_WORLD,
        payload: locations,
      })
    } else if (action.payload === 'character') {
      const characters = yield callCharactersInWorld(action.id);
      yield put ({
        type: CHARACTER_ACTIONS.SET_CHARACTERS_IN_WORLD,
        payload: characters,
      })
    } else if (action.payload === 'event') {
      const events = yield callEventsInWorld(action.id);
      yield put ({
        type: EVENT_ACTIONS.SET_EVENTS_IN_WORLD,
        payload: events,
      })
    }
    yield put ({ type: BROWSE_ACTIONS.CLEAR_BROWSE_STORY });
    yield put ({ type: BROWSE_ACTIONS.CLEAR_AFTER_STORY_OPTION })
    yield put({ type: BROWSE_ACTIONS.REQUEST_DONE });
  }
  catch (error) {
    yield put({ type: BROWSE_ACTIONS.REQUEST_DONE });
  }
}

function* changeAfterStoryOption(action) {
  try {
    yield put ({ type:BROWSE_ACTIONS.REQUEST_START});
    yield put ({ 
      type: BROWSE_ACTIONS.SET_AFTER_STORY_OPTION,
      payload: action.payload,
    })
    if (action.payload === 'location') {
      const locations = yield callLocationsInStory(action.id);
      yield put ({
        type: LOCATION_ACTIONS.SET_LOCATIONS_IN_STORY,
        payload: locations,
      })
    } else if (action.payload === 'character') {
      const characters = yield callCharactersInStory(action.id);
      yield put({
        type: CHARACTER_ACTIONS.SET_CHARACTERS_IN_STORY,
        payload: characters,
      })
    } else if (action.payload === 'event') {
      const events = yield callEventsInStory(action.id);
      yield put({
        type: EVENT_ACTIONS.SET_EVENTS_IN_STORY,
        payload: events,
      })
    }
    yield put ({ type: BROWSE_ACTIONS.REQUEST_DONE});
  } catch (error) {
    yield put ({ type: BROWSE_ACTIONS.REQUEST_DONE});
  }
}

function* changeBrowseWorld(action) {
  try {
    yield put ({ type:BROWSE_ACTIONS.REQUEST_START});
    yield put ({ 
      type: BROWSE_ACTIONS.SET_BROWSE_WORLD,
      payload: action.payload,
    });
    yield put ({ type: BROWSE_ACTIONS.CLEAR_AFTER_WORLD_OPTION })
    yield put ({ type: BROWSE_ACTIONS.CLEAR_BROWSE_STORY })
    yield put ({ type: BROWSE_ACTIONS.CLEAR_AFTER_STORY_OPTION })
    yield put ({ type: BROWSE_ACTIONS.REQUEST_DONE});
  } catch (error) {
    yield put ({ type: BROWSE_ACTIONS.REQUEST_DONE});
  }
}

function* changeBrowseStory(action) {
  try {
    yield put ({ type:BROWSE_ACTIONS.REQUEST_START});
    yield put ({
      type: BROWSE_ACTIONS.SET_BROWSE_STORY,
      payload: action.payload,
    })
    yield put ({type: BROWSE_ACTIONS.CLEAR_AFTER_STORY_OPTION});
    yield put ({ type: BROWSE_ACTIONS.REQUEST_DONE});
  } catch (error) {
    yield put ({ type: BROWSE_ACTIONS.REQUEST_DONE});
  }
}

function* browseSaga() {
  yield takeEvery(BROWSE_ACTIONS.CHANGE_AFTER_WORLD_OPTION, changeAfterWorldOption);
  yield takeEvery(BROWSE_ACTIONS.CHANGE_AFTER_STORY_OPTION, changeAfterStoryOption);
  yield takeEvery(BROWSE_ACTIONS.CHANGE_BROWSE_WORLD, changeBrowseWorld);
  yield takeEvery(BROWSE_ACTIONS.CHANGE_BROWSE_STORY, changeBrowseStory);
}

export default browseSaga;
