# rsf-auth

[![CircleCI](https://circleci.com/gh/n6g7/rsf-auth.svg?style=svg)](https://circleci.com/gh/n6g7/rsf-auth)
[![npm version](https://badge.fury.io/js/rsf-auth.svg)](https://badge.fury.io/js/rsf-auth)
[![Coverage Status](https://coveralls.io/repos/github/n6g7/rsf-auth/badge.svg?branch=master)](https://coveralls.io/github/n6g7/rsf-auth?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/n6g7/rsf-auth/badge.svg?targetFile=package.json)](https://snyk.io/test/github/n6g7/rsf-auth?targetFile=package.json)

Reducer, actions and sagas to handle authentication with [redux-saga-firebase](https://www.npmjs.com/package/redux-saga-firebase).

## Quick start

Install with:

```js
yarn add rsf-auth
```

Setup the authentication reducer:

```js
import { combineReducers } from 'redux'
import { reducer as auth } from 'rsf-auth'

export default combineReducers({
  auth,
  [...]
})
```

Start the authentication saga:

```js
import { fork } from 'redux-saga/effects'
import { saga as authSaga } from 'rsf-auth'

import rsf, { authProvider } from '../rsf'

export default function* rootSaga() {
  yield fork(authSaga, rsf, authProvider) // 👈 Pass a ReduxSagaFirebase instance and an authProvider to use
  // [...]
}
```

Trigger a login:

```js
import { connect } from 'react-redux'
import { login } from 'rsf-auth/actions'

const LoginButton = (login) => <button onClick={login}>Login</button>
export default connect(null, { login })(LoginButton)
```

Access the state with selectors:

```js
import { selectors } from 'rsf-auth'

// Build authentication selectors
const {
  loadingSelector,
  loggedInSelector,
  userSelector
} = selectors(state => state.auth) // 👈 Use the path you chose to store the authentication data in `combineReducers`

// then, given the state:
userSelector(state) // a firebase.User instance
```

## API

### Reducer (`import { reducer } from 'rsf-auth'`)

An usual `(state, action) => state` [redux](https://redux.js.org/)-style reducer which stores the authentication data and responds to the authentication actions.

### Saga (`import { saga } from 'rsf-auth'`)

A [redux-saga](https://redux-saga.js.org/) saga which handles login and logout requests as well as user synchronization.

It takes a ReduxSagaFirebase instance and a Firebase [AuthProvider](https://firebase.google.com/docs/reference/js/firebase.auth.AuthProvider) as arguments.

```js
import { saga as auth } from 'rsf-auth'
import rsf from './rsf'

const authProvider = new firebase.auth.GoogleAuthProvider()

function* () {
  yield fork(auth, rsf, authProvider)
}
```

### Actions (`import { login, ... } from 'rsf-auth/actions'`)

#### `login()`
Triggers a login with popup using the AuthProvider passed to the saga.

#### `logout()`
Triggers a logout.

### Types (`import { types } from 'rsf-auth'`)

Object literal containing all the types used by this library:
```js
{
  LOGIN: {
    REQUEST: type`LOGIN.REQUEST`,
    SUCCESS: type`LOGIN.SUCCESS`,
    FAILURE: type`LOGIN.FAILURE`
  },
  LOGOUT: {
    REQUEST: type`LOGOUT.REQUEST`,
    SUCCESS: type`LOGOUT.SUCCESS`,
    FAILURE: type`LOGOUT.FAILURE`
  },
  SYNC_USER: type`SYNC_USER`
}
```
