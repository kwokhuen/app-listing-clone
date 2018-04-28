import {reducer as freeApps} from './freeApps/reducer'
import storage from 'redux-persist/lib/storage'
import {persistCombineReducers} from 'redux-persist'

const dataPersistConfig = {
  key: 'data',
  storage,
}

export const reducer = persistCombineReducers(dataPersistConfig, {
  freeApps
})
