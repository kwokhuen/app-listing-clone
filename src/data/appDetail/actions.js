import apiService from 'services/apiServiceFactory'
import responseHelper from 'helpers/responseHelper'

// ACTION TYPE CONSTANTS
export const FETCH_APP_DETAIL = 'DATA/FREEAPPS/FETCH_APP_DETAIL'

// ACTIONS
export const fetchAppDetail = (appId) => {
  return (dispatch, getState) => {
    return apiService.getAppDetail(appId)
    .then(response => {
      const appDetail = responseHelper.getAppDetail(response)
      dispatch({
        type: FETCH_APP_DETAIL,
        appDetail,
        appId
      })
    })
  }
}
