import { put, takeEvery } from 'redux-saga/effects';
import { BROWSE_ACTIONS } from '../actions/browseActions';
import { STORY_ACTIONS } from '../actions/storyActions';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { callStoriesInWorld } from '../requests/storyRequests';
import { callLocationsInWorld, callLocationsInStory } from '../requests/locationRequests';

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
    }
    yield put ({ type:  BROWSE_ACTIONS.CLEAR_AFTER_STORY_OPTION });
    yield put ({ type: BROWSE_ACTIONS.CLEAR_BROWSE_STORY });
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
    }
    yield put ({ type: BROWSE_ACTIONS.REQUEST_DONE});
  } catch (error) {
    yield put ({ type: BROWSE_ACTIONS.REQUEST_DONE});
  }
}

function* browseSaga() {
  yield takeEvery(BROWSE_ACTIONS.CHANGE_AFTER_WORLD_OPTION, changeAfterWorldOption);
  yield takeEvery(BROWSE_ACTIONS.CHANGE_AFTER_STORY_OPTION, changeAfterStoryOption);
}

export default browseSaga;
