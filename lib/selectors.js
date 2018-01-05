import { createSelector } from 'reselect'

export default authSelector => ({
  loadingSelector: createSelector(authSelector, auth => auth.loading),
  loggedInSelector: createSelector(authSelector, auth => auth.loggedIn),
  userSelector: createSelector(authSelector, auth => auth.user)
})
