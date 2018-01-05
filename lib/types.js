const type = str => `@RSFAUTH_${str}`

export default {
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
