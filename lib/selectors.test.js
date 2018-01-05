import selectors from './selectors'

describe('selectors', () => {
  let state = {
    auth: {
      loading: 'abc',
      loggedIn: 'def',
      user: 'ghi'
    }
  }
  const authSelector = jest.fn(state => state.auth)
  const { loadingSelector, loggedInSelector, userSelector } = selectors(
    authSelector
  )

  beforeEach(() => {
    authSelector.mockClear()
  })

  describe('loadingSelector', () => {
    it('works', () => {
      const loading = loadingSelector(state)
      expect(authSelector).toHaveBeenCalledTimes(1)
      expect(authSelector.mock.calls[0]).toEqual([state])
      expect(loading).toBe(state.auth.loading)
    })
  })

  describe('loggedInSelector', () => {
    it('works', () => {
      const loggedIn = loggedInSelector(state)
      expect(authSelector).toHaveBeenCalledTimes(1)
      expect(authSelector.mock.calls[0]).toEqual([state])
      expect(loggedIn).toBe(state.auth.loggedIn)
    })
  })

  describe('userSelector', () => {
    it('works', () => {
      const user = userSelector(state)
      expect(authSelector).toHaveBeenCalledTimes(1)
      expect(authSelector.mock.calls[0]).toEqual([state])
      expect(user).toBe(state.auth.user)
    })
  })
})
