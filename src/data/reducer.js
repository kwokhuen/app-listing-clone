import {reducer as freeApps} from './freeApps/reducer'
import {reducer as appDetail} from './appDetail/reducer'
import {reducer as topGrossingApps} from './topGrossingApps/reducer'
import storage from 'redux-persist/lib/storage'
import {persistCombineReducers} from 'redux-persist'

const dataPersistConfig = {
  key: 'data',
  storage,
}

export const reducer = persistCombineReducers(dataPersistConfig, {
  freeApps,
  appDetail,
  topGrossingApps
})
