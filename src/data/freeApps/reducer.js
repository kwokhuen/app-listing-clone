import {FETCH_TOP_100_FREE_APPS} from './actions'

export const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TOP_100_FREE_APPS: {
      const {freeApps} = action
      return freeApps ? freeApps : state
    }
    default: {
      return state
    }
  }
}
