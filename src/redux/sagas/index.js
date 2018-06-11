import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import recentlyAddedSaga from './recentlyAddedSaga';
import worldSaga from './worldSaga';
import storySaga from './storySaga';
import browseSaga from './browseSaga';
import createSaga from './createSaga';
import homeSaga from './homeSaga';
import searchSaga from './searchSaga';
import locationSaga from './locationSaga';
import characterSaga from './characterSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    recentlyAddedSaga(),
    worldSaga(),
    storySaga(),
    browseSaga(),
    createSaga(),
    homeSaga(),
    searchSaga(),
    locationSaga(),
    characterSaga(),
    // watchIncrementAsync()
  ]);
}
