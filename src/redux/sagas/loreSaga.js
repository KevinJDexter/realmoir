import { put, takeEvery, all } from 'redux-saga/effects';
import { LORE_ACTIONS } from '../actions/loreActions';
import { RECENTLY_ADDED_ACTIONS } from '../actions/recentlyAddedActions';
import { CREATE_PAGE_ACTIONS } from '../actions/createPageActions';
import { callLore, callLoreDetails, callLoreInWorld, callPostLore, callUpdateLore, callDeleteLore } from '../requests/loreRequests'; 

function* fetchLore() {
  try {
    yield put({ type: LORE_ACTIONS.REQUEST_START });
    const lore = yield callLore();
    yield put({
      type: LORE_ACTIONS.SET_LORE,
      payload: lore,
    });
    yield put({
      type: LORE_ACTIONS.REQUEST_DONE,
    });
  } catch (error) {
    yield put({
      type: LORE_ACTIONS.REQUEST_DONE,
    });
  }
}

function* fetchLoreDetails(action) {
  try {
    yield put({ type: LORE_ACTIONS.REQUEST_START });
    const loreDetails = yield callLoreDetails(action.payload);
    yield put({
      type: LORE_ACTIONS.SET_LORE_DETAILS,
      payload: loreDetails,
    })
    yield put({ type: LORE_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: LORE_ACTIONS.REQUEST_DONE });
  }
}

function* fetchLoreInWorld(action) {
  try {
    yield put({ type: LORE_ACTIONS.REQUEST_START });
    const lore = yield callLoreInWorld(action.payload);
    yield put({
      type: LORE_ACTIONS.SET_LORE_IN_WORLD,
      payload: lore,
    })
    yield put({ type: LORE_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: LORE_ACTIONS.REQUEST_DONE });
  }
}

function* submitLore(action) {
  try {
    yield put({ type: LORE_ACTIONS.REQUEST_START });
    yield callPostLore(action.payload);
    yield put({ type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED });
    yield put({ type: CREATE_PAGE_ACTIONS.CLEAR_FORM_INFO });
    yield put({ type: LORE_ACTIONS.GET_LORE });
    yield put({ type: LORE_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: LORE_ACTIONS.REQUEST_DONE });
  }
}

function* modifyLoreDetails(action) {
  try { 
    yield put({ type: LORE_ACTIONS.REQUEST_START });
    yield callUpdateLore(action);
    yield put({
      type: LORE_ACTIONS.GET_LORE_DETAILS,
      payload: action.id,
    });
    yield put({ type: LORE_ACTIONS.REQUEST_DONE });
  } catch (error) {
    yield put({ type: LORE_ACTIONS.REQUEST_DONE });
  }
}


function* removeLore(action) {
  try {
    yield put({ type: LORE_ACTIONS.REQUEST_START });
    yield callDeleteLore(action.payload);
    yield put({ type: LORE_ACTIONS.CLEAR_LORE_DETAILS });
    yield put({ type: LORE_ACTIONS.REQUEST_DONE });
    yield put({ type: RECENTLY_ADDED_ACTIONS.GET_RECENTLY_ADDED });
  } catch (error) {
    yield put({ type: LORE_ACTIONS.REQUEST_DONE });
  }
}
