import { call, fork, put, take, takeEvery } from 'redux-saga/effects'

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  syncUser
} from './actions'
import types from './types'

function* loginSaga(rsf, authProvider) {
  try {
    const data = yield call(rsf.auth.signInWithPopup, authProvider)
    yield put(loginSuccess(data))
  } catch (error) {
    yield put(loginFailure(error))
  }
}

function* logoutSaga(rsf) {
  try {
    const data = yield call(rsf.auth.signOut)
    yield put(logoutSuccess(data))
  } catch (error) {
    yield put(logoutFailure(error))
  }
}

function* syncUserSaga(rsf) {
  const channel = yield call(rsf.auth.channel)

  while (true) {
    const { user } = yield take(channel)

    if (user) yield put(syncUser(user))
    else yield put(syncUser(null))
  }
}

export default function* rootSaga(rsf, authProvider) {
  yield fork(syncUserSaga, rsf)
  yield takeEvery(types.LOGIN.REQUEST, loginSaga, rsf, authProvider)
  yield takeEvery(types.LOGOUT.REQUEST, logoutSaga, rsf)
}
