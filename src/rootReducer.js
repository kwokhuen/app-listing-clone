import {combineReducers} from 'redux'
import {reducer as data} from './data/reducer'

const appReducer = combineReducers({
  data
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
