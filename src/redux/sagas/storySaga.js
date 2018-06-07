import { put, takeEvery } from 'redux-saga/effects';
import { STORY_ACTIONS } from '../actions/storyActions';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';
import { callStories, callGenreList, postNewStory, callStoryDetails, editStoryDetails, deleteStory } from '../requests/storyRequests';

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
    yield postNewStory(action.payload);
    yield put({ type: STORY_ACTIONS.GET_STORIES });
    yield put({ type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED });
    yield put({ type: STORY_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: STORY_ACTIONS.REQUEST_DONE });
  }
}

function* fetchStoryDetails (action) {
  try {
    yield put ({type: STORY_ACTIONS.REQUEST_START});
    const storyDetails = yield callStoryDetails(action.payload);
    yield put ({
      type: STORY_ACTIONS.SET_STORY_DETAILS,
      payload: storyDetails,
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

function* storySaga() {
  yield takeEvery(STORY_ACTIONS.GET_STORIES, fetchStories);
  yield takeEvery(STORY_ACTIONS.GET_STORY_GENRES, fetchGenres);
  yield takeEvery(STORY_ACTIONS.SUBMIT_NEW_STORY, submitStory);
  yield takeEvery(STORY_ACTIONS.GET_STORY_DETAILS, fetchStoryDetails);
  yield takeEvery(STORY_ACTIONS.SUBMIT_EDIT_STORY, modifyStoryDetails);
  yield takeEvery(STORY_ACTIONS.DELETE_STORY, removeStory);
}

export default storySaga;
