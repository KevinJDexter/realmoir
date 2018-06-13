import { put, takeEvery, all } from 'redux-saga/effects';
import { LOCATION_ACTIONS } from '../actions/locationActions';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';
import { CREATE_PAGE_ACTIONS } from '../actions/createPageActions';
import { callLocations, callPostLocation, callLocationDetails, callLocationsInWorld, callDeleteLocation, callEditLocationDetails, callNeighboringLocations } from '../requests/locationRequests';
import { callLocationStoryJunction, callDeleteLSJunctionByLocation, callPostNeighboringLocations, callDeleteNeighboringLocations, callPostCLJunction, callDeleteCLJunctionByLocation } from '../requests/junctionRequests';
import { callStoriesWithLocation } from '../requests/storyRequests';
import { callCharactersVisitedLocation, callCharacterHomeIs } from '../requests/characterRequests';
import { callEventsAtLocation } from '../requests/eventRequests';
import { CHARACTER_ACTIONS } from '../actions/characterActions';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchLocations() {
  try {
    yield put({ type: LOCATION_ACTIONS.REQUEST_START });
    const locations = yield callLocations();
    yield put({
      type: LOCATION_ACTIONS.SET_LOCATIONS,
      payload: locations,
    });
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE, });
  } catch (error) {
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE, });
  }
}

function* createLocation(action) {
  try {
    yield put({ type: LOCATION_ACTIONS.REQUEST_START });
    const locationId = yield callPostLocation(action.payload);
    yield all (action.payload.related_stories.forEach(story => {
      callLocationStoryJunction({location_id: locationId, story_id: story.value});
    }))
    yield all (action.payload.related_characters.forEach(character => {
      callPostCLJunction({location_id: locationId, character_id: character.value})
    }))
    yield all (action.payload.neighboring_locations.forEach(location => {
      callPostNeighboringLocations({first_location: locationId, second_location: location.value, contained_in: false});
    }))
    yield all (action.payload.contained_locations.forEach(location => {
      callPostNeighboringLocations({first_location: locationId, second_location: location.value, contained_in: true});
    }))
    yield all (action.payload.contained_by_locations.forEach(location => {
      callPostNeighboringLocations({first_location: location.value, second_location: locationId, contained_in: true});
    }))
    yield put({ type: CREATE_PAGE_ACTIONS.CLEAR_CREATE_STORY })
    yield put({ type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED });
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE, });
  } catch (error) {
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE, });
  }
}

function* fetchLocationDetails(action) {
  try {
    yield put({ type: LOCATION_ACTIONS.REQUEST_START });
    let location = yield callLocationDetails(action.payload);
    location.stories = yield callStoriesWithLocation(action.payload);
    location.characters = yield callCharactersVisitedLocation(action.payload);
    location.homeTo = yield callCharacterHomeIs(action.payload);
    location.neighbors = yield callNeighboringLocations(action.payload);
    location.events = yield callEventsAtLocation(action.payload);
    yield put ({ 
      type: LOCATION_ACTIONS.SET_LOCATION_DETAILS,
      payload: location,
    })
    yield put ({
      type: CHARACTER_ACTIONS.GET_CHARACTERS_IN_WORLD,
      payload: location.world_id,
    })
    yield put({
      type: LOCATION_ACTIONS.GET_LOCATIONS_IN_WORLD,
      payload: location.world_id,
    })
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE });
  }
}

function* fetchLocationsInWorld(action) {
  try {
    yield put({ type: LOCATION_ACTIONS.REQUEST_START });
    const locations = yield callLocationsInWorld(action.payload);
    yield put ({
      type: LOCATION_ACTIONS.SET_LOCATIONS_IN_WORLD,
      payload: locations,
    });
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE });
  } catch(error) {
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE });
  }
}

function* removeLocation(action) {
  try {
    yield put({ type: LOCATION_ACTIONS.REQUEST_START });
    yield callDeleteLocation(action.payload);
    yield put ({ type: LOCATION_ACTIONS.GET_LOCATIONS });
    yield put ({type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED});
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE });
  }
}

function* modifyLocationDetails(action) {
  try {
    yield put({ type: LOCATION_ACTIONS.REQUEST_START });
    yield callEditLocationDetails(action);
    yield callDeleteLSJunctionByLocation(action.id);
    yield all (action.payload.related_stories.forEach(story => {
      callLocationStoryJunction({location_id: action.id, story_id: story.value})
    }))
    yield callDeleteCLJunctionByLocation(action.id);
    yield all(action.payload.related_characters.forEach(character => {
      callPostCLJunction({location_id: action.id, character_id: character.value})
    }))
    yield callDeleteNeighboringLocations(action.id);
    yield all (action.payload.neighboring_locations.forEach(location => {
      callPostNeighboringLocations({first_location: action.id, second_location: location.value, contained_in: false});
    }))
    yield all (action.payload.contained_locations.forEach(location => {
      callPostNeighboringLocations({first_location: action.id, second_location: location.value, contained_in: true});
    }))
    yield all (action.payload.contained_by_locations.forEach(location => {
      callPostNeighboringLocations({first_location: location.value, second_location: action.id, contained_in: true});
    })) 
    yield put ({ 
      type: LOCATION_ACTIONS.GET_LOCATION_DETAILS,
      payload: action.id,
    })
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: LOCATION_ACTIONS.REQUEST_DONE });
  } 
}

function* locationSaga() {
  yield takeEvery(LOCATION_ACTIONS.GET_LOCATIONS, fetchLocations);
  yield takeEvery(LOCATION_ACTIONS.CREATE_NEW_LOCATION, createLocation);
  yield takeEvery(LOCATION_ACTIONS.GET_LOCATION_DETAILS, fetchLocationDetails);
  yield takeEvery(LOCATION_ACTIONS.GET_LOCATIONS_IN_WORLD, fetchLocationsInWorld);
  yield takeEvery(LOCATION_ACTIONS.DELETE_LOCATION, removeLocation);
  yield takeEvery(LOCATION_ACTIONS.SUBMIT_EDIT_LOCATION, modifyLocationDetails);
}

export default locationSaga;