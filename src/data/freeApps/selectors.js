import {createSelector} from 'reselect'
import dataHelper from 'helpers/dataHelper'
import {getSearchInputValue} from 'data/ui/globalSearch/selectors'
import R from 'ramda'

const getFreeApps = state => state.data.freeApps

export const getFilteredFreeApps = createSelector([
  getSearchInputValue, getFreeApps
], (searchInputValue, freeApps) => {
  return R.filter(dataHelper.filterBy(['name'], searchInputValue))(freeApps)
})
