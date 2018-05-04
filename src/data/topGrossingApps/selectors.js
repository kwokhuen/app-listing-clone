import {createSelector} from 'reselect'
import dataHelper from 'helpers/dataHelper'
import {getSearchInputValue} from 'data/ui/globalSearch/selectors'
import R from 'ramda'

const getTopGrossingApps = state => state.data.topGrossingApps

export const getFilteredTopGrossingApps = createSelector([
  getSearchInputValue, getTopGrossingApps
], (searchInputValue, topGrossingApps) => {
  return R.filter(dataHelper.filterBy(['name'], searchInputValue))(topGrossingApps)
})
