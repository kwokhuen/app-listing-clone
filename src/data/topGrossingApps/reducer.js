import {FETCH_TOP_GROSSING_APPS} from './actions'

export const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TOP_GROSSING_APPS: {
      const {topGrossingApps} = action
      return topGrossingApps ? topGrossingApps : state
    }
    default: {
      return state
    }
  }
}
