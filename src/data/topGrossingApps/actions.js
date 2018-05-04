import apiService from 'services/apiServiceFactory'
import responseHelper from 'helpers/responseHelper'

// ACTION TYPE CONSTANTS
export const FETCH_TOP_GROSSING_APPS = 'DATA/TOPGROSSINGAPPS/FETCH_TOP_GROSSING_APPS'

// ACTIONS
export const fetchTopGrossingApps = () => {
  return (dispatch, getState) => {
    return apiService.getTopGrossingApps()
    .then(response => {
      const topGrossingApps = responseHelper.getEntry(response)
      dispatch({
        type: FETCH_TOP_GROSSING_APPS,
        topGrossingApps
      })
    })
  }
}
