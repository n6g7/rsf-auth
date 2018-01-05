import {
  login,
  loginSuccess,
  loginFailure,
  logout,
  logoutSuccess,
  logoutFailure,
  syncUser
} from './actions'
import reducer from './reducer'

describe('reducer', () => {
  it('returns the initial state when called without arguments', () => {
    expect(reducer()).toMatchSnapshot()
  })

  it('handles LOGIN_REQUEST', () => {
    expect(reducer({ loading: false }, login())).toHaveProperty('loading', true)
  })

  it('handles LOGIN_SUCCESS', () => {
    const newState = reducer({ loading: true }, loginSuccess())
    expect(newState).toHaveProperty('loading', false)
    expect(newState).toHaveProperty('loggedIn', true)
  })

  it('handles LOGIN_FAILURE', () => {
    const newState = reducer({ loading: true }, loginFailure())
    expect(newState).toHaveProperty('loading', false)
  })

  it('handles LOGOUT_REQUEST', () => {
    expect(reducer({ loading: false }, logout())).toHaveProperty(
      'loading',
      true
    )
  })

  it('handles LOGOUT_SUCCESS', () => {
    const newState = reducer({ loading: true }, logoutSuccess())
    expect(newState).toHaveProperty('loading', false)
    expect(newState).toHaveProperty('loggedIn', false)
  })

  it('handles LOGOUT_FAILURE', () => {
    const newState = reducer({ loading: true }, logoutFailure())
    expect(newState).toHaveProperty('loading', false)
  })

  describe('SYNC_USER', () => {
    it('handles a successful login', () => {
      const user = 'qosdkqp'
      const newState = reducer({ loggedIn: false, user: null }, syncUser(user))
      expect(newState).toHaveProperty('loggedIn', true)
      expect(newState).toHaveProperty('user', user)
    })

    it('handles a failed login', () => {
      const user = undefined
      const newState = reducer({ loggedIn: true, user: 123 }, syncUser(user))
      expect(newState).toHaveProperty('loggedIn', false)
      expect(newState).toHaveProperty('user', user)
    })
  })
})
