import types from './types'

export const login = () => ({
  type: types.LOGIN.REQUEST
})

export const loginSuccess = credential => ({
  type: types.LOGIN.SUCCESS,
  credential
})

export const loginFailure = error => ({
  type: types.LOGIN.FAILURE,
  error
})

export const logout = () => ({
  type: types.LOGOUT.REQUEST
})

export const logoutSuccess = () => ({
  type: types.LOGOUT.SUCCESS
})

export const logoutFailure = error => ({
  type: types.LOGOUT.FAILURE,
  error
})

export const syncUser = user => ({
  type: types.SYNC_USER,
  user
})
