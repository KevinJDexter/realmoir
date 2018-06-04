import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import recentlyAddedSaga from './recentlyAddedSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    recentlyAddedSaga(),
    // watchIncrementAsync()
  ]);
}
