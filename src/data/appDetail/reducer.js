import R from 'ramda'
import {FETCH_APP_DETAIL} from './actions'

export const reducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_APP_DETAIL: {
      const {appDetail, appId} = action
      return R.merge(state, {[appId]: appDetail})
    }
    default: {
      return state
    }
  }
}
