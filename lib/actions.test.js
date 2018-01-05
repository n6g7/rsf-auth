import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  syncUser
} from './actions'

describe('actions', () => {
  describe('login()', () => {
    it('works', () => {
      expect(login()).toMatchSnapshot()
    })
  })

  describe('loginSuccess(credential)', () => {
    it('works', () => {
      const credential = 'qsdk'
      expect(loginSuccess(credential)).toMatchSnapshot()
    })
  })

  describe('loginFailure(error)', () => {
    it('works', () => {
      const error = 'qsdk'
      expect(loginFailure(error)).toMatchSnapshot()
    })
  })

  describe('logout()', () => {
    it('works', () => {
      expect(logout()).toMatchSnapshot()
    })
  })

  describe('logoutSuccess()', () => {
    it('works', () => {
      expect(logoutSuccess()).toMatchSnapshot()
    })
  })

  describe('logoutFailure(error)', () => {
    it('works', () => {
      const error = 'qsdk'
      expect(logoutFailure(error)).toMatchSnapshot()
    })
  })

  describe('syncUser(user)', () => {
    it('works', () => {
      const user = 'qsdk'
      expect(syncUser(user)).toMatchSnapshot()
    })
  })
})
