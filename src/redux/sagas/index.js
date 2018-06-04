import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import recentlyAddedSaga from './recentlyAddedSaga';
import worldSaga from './worldSaga';
import storySaga from './storySaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    recentlyAddedSaga(),
    worldSaga(),
    storySaga(),
    // watchIncrementAsync()
  ]);
}
