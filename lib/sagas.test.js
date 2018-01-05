import { call, fork, put, take, takeEvery } from 'redux-saga/effects'

import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  syncUser
} from './actions'
import {
  default as rootSaga,
  loginSaga,
  logoutSaga,
  syncUserSaga
} from './sagas'
import types from './types'

describe('sagas', () => {
  const rsf = {
    auth: {
      channel: jest.fn(),
      signInWithPopup: jest.fn(),
      signOut: jest.fn()
    }
  }
  const authProvider = 'joiqospkdpl'

  describe('rootSaga(rsf, authProvider)', () => {
    it('works', () => {
      const saga = rootSaga(rsf, authProvider)

      expect(saga.next()).toEqual({
        done: false,
        value: fork(syncUserSaga, rsf)
      })
      expect(saga.next()).toEqual({
        done: false,
        value: takeEvery(types.LOGIN.REQUEST, loginSaga, rsf, authProvider)
      })
      expect(saga.next()).toEqual({
        done: false,
        value: takeEvery(types.LOGOUT.REQUEST, logoutSaga, rsf)
      })
      expect(saga.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('loginSaga(rsf, authProvider)', () => {
    it('handles a successful login', () => {
      const saga = loginSaga(rsf, authProvider)
      const data = 'kqksdl'

      expect(saga.next()).toEqual({
        done: false,
        value: call(rsf.auth.signInWithPopup, authProvider)
      })
      expect(saga.next(data)).toEqual({
        done: false,
        value: put(loginSuccess(data))
      })
      expect(saga.next()).toEqual({
        done: true,
        value: undefined
      })
    })

    it('handles a failed login', () => {
      const saga = loginSaga(rsf, authProvider)
      const error = 'aeazea'

      expect(saga.next()).toEqual({
        done: false,
        value: call(rsf.auth.signInWithPopup, authProvider)
      })
      expect(saga.throw(error)).toEqual({
        done: false,
        value: put(loginFailure(error))
      })
      expect(saga.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('logoutSaga(rsf)', () => {
    it('handles a successful logout', () => {
      const saga = logoutSaga(rsf)
      const data = 'kqksdl'

      expect(saga.next()).toEqual({
        done: false,
        value: call(rsf.auth.signOut)
      })
      expect(saga.next(data)).toEqual({
        done: false,
        value: put(logoutSuccess(data))
      })
      expect(saga.next()).toEqual({
        done: true,
        value: undefined
      })
    })

    it('handles a failed logout', () => {
      const saga = logoutSaga(rsf)
      const error = 'aeazea'

      expect(saga.next()).toEqual({
        done: false,
        value: call(rsf.auth.signOut)
      })
      expect(saga.throw(error)).toEqual({
        done: false,
        value: put(logoutFailure(error))
      })
      expect(saga.next()).toEqual({
        done: true,
        value: undefined
      })
    })
  })

  describe('syncUserSaga(rsf)', () => {
    it('works', () => {
      const saga = syncUserSaga(rsf)
      const channel = 'ksdhqjio'
      const user = 'ysqgdhuiqij'

      expect(saga.next()).toEqual({
        done: false,
        value: call(rsf.auth.channel)
      })

      // first round: login
      expect(saga.next(channel)).toEqual({
        done: false,
        value: take(channel)
      })
      expect(saga.next({ user })).toEqual({
        done: false,
        value: put(syncUser(user))
      })

      // second round: logout
      expect(saga.next(channel)).toEqual({
        done: false,
        value: take(channel)
      })
      expect(saga.next({ user: null })).toEqual({
        done: false,
        value: put(syncUser(null))
      })
    })
  })
})
