import apiService from 'services/apiServiceFactory'
import responseHelper from 'helpers/responseHelper'

// ACTION TYPE CONSTANTS
export const FETCH_TOP_100_FREE_APPS = 'DATA/FREEAPPS/FETCH_TOP_100_FREE_APPS'

// ACTIONS
export const fetchTop100FreeApps = () => {
  return (dispatch, getState) => {
    return apiService.getTop100FreeApps()
    .then(response => {
      const freeApps = responseHelper.getEntry(response)
      dispatch({
        type: FETCH_TOP_100_FREE_APPS,
        freeApps
      })
    })
  }
}
