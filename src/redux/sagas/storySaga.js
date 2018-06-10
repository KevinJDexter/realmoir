import { put, takeEvery, all } from 'redux-saga/effects';
import { STORY_ACTIONS } from '../actions/storyActions';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';
import { CREATE_PAGE_ACTIONS } from '../actions/createPageActions';
import { callStories, callGenreList, postNewStory, callStoryDetails, editStoryDetails, deleteStory, callStoriesInWorld } from '../requests/storyRequests';
import { callLocationsInStory } from '../requests/locationRequests';
import { callLocationStoryJunction, callDeleteLSJunctionByStory } from '../requests/junctionRequests';
import { LOCATION_ACTIONS } from '../actions/locationActions';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchStories() {
  try {
    yield put({ type: STORY_ACTIONS.REQUEST_START });
    const stories = yield callStories();
    yield put({
      type: STORY_ACTIONS.SET_STORIES,
      payload: stories,
    });
    yield put({
      type: STORY_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: STORY_ACTIONS.REQUEST_DONE,
    });
  }
}

function* fetchGenres() {
  try {
    yield put({ type: STORY_ACTIONS.REQUEST_START });
    const genres = yield callGenreList();
    yield put({
      type: STORY_ACTIONS.SET_STORY_GENRES,
      payload: genres,
    });
    yield put({ type: STORY_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: STORY_ACTIONS.REQUEST_DONE });
  }
}

function* submitStory(action) {
  try {
    yield put({ type: STORY_ACTIONS.REQUEST_START });
    const story_id = yield postNewStory(action.payload);
    yield all (action.payload.related_locations.forEach(location => {
      callLocationStoryJunction({location_id: location.value, story_id: story_id});
    }))
    yield put({ type: STORY_ACTIONS.GET_STORIES });
    yield put({ type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED });
    yield put ({ type: CREATE_PAGE_ACTIONS.CLEAR_FORM_INFO });
    yield put({ type: STORY_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: STORY_ACTIONS.REQUEST_DONE });
  }
}

function* fetchStoryDetails (action) {
  try {
    yield put ({type: STORY_ACTIONS.REQUEST_START});
    const storyDetails = yield callStoryDetails(action.payload);
    storyDetails.locations = yield callLocationsInStory(action.payload);
    yield put ({
      type: STORY_ACTIONS.SET_STORY_DETAILS,
      payload: storyDetails,
    })
    yield put ({ 
      type: LOCATION_ACTIONS.GET_LOCATIONS_IN_WORLD,
      payload: storyDetails.world_id,
    })
    yield put ({ type: STORY_ACTIONS.REQUEST_DONE});
  } catch (error) {
    yield put ({ type: STORY_ACTIONS.REQUEST_DONE});
  }
}

function* modifyStoryDetails (action) {
  try {
    yield put ({type: STORY_ACTIONS.REQUEST_START});
    yield editStoryDetails(action);
    yield callDeleteLSJunctionByStory(action.id);
    yield all (action.payload.related_locations.map(location => {
      callLocationStoryJunction({location_id: location.value, story_id: action.id});
    }))
    yield put ({
      type: STORY_ACTIONS.GET_STORY_DETAILS,
      payload: action.id,
    });
    yield put ({type: STORY_ACTIONS.REQUEST_DONE});
  } catch (error) {
    yield put ({type: STORY_ACTIONS.REQUEST_DONE});
  }
}

function* removeStory (action) {
  try {
    yield put ({type: STORY_ACTIONS.REQUEST_START});
    yield deleteStory(action.payload);
    yield put ({type: STORY_ACTIONS.CLEAR_STORY_DETAILS});
    yield put({type: STORY_ACTIONS.REQUEST_DONE});
    yield put ({type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED});
  } catch (error) {
    yield put({type: STORY_ACTIONS.REQUEST_DONE});
  }
}

function* fetchStoriesInWorld (action) {
  try {
    yield put ({type: STORY_ACTIONS.REQUEST_START});
    const stories = yield callStoriesInWorld(action.payload);
    yield put ({
      type: STORY_ACTIONS.SET_STORIES_IN_WORLD,
      payload: stories,
    })
    yield put({type: STORY_ACTIONS.REQUEST_DONE});
  } catch (error) {
    yield put({type: STORY_ACTIONS.REQUEST_DONE});
  }
}

function* storySaga() {
  yield takeEvery(STORY_ACTIONS.GET_STORIES, fetchStories);
  yield takeEvery(STORY_ACTIONS.GET_STORY_GENRES, fetchGenres);
  yield takeEvery(STORY_ACTIONS.SUBMIT_NEW_STORY, submitStory);
  yield takeEvery(STORY_ACTIONS.GET_STORY_DETAILS, fetchStoryDetails);
  yield takeEvery(STORY_ACTIONS.SUBMIT_EDIT_STORY, modifyStoryDetails);
  yield takeEvery(STORY_ACTIONS.DELETE_STORY, removeStory);
  yield takeEvery(STORY_ACTIONS.GET_STORIES_IN_WORLD, fetchStoriesInWorld);
}

export default storySaga;
