import {FETCH_TOP_100_FREE_APPS} from './actions'
import R from 'ramda'
const mapIndexed = R.addIndex(R.map)

const addRankProperty = (app, index) => {
  return R.assoc('rank', index + 1, app)
}

export const reducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_TOP_100_FREE_APPS: {
      const {freeApps} = action
      return freeApps
      ? mapIndexed(addRankProperty)(freeApps)
      : state
    }
    default: {
      return state
    }
  }
}
