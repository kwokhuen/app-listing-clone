import {devConfig} from 'config/devConfig'
import {proConfig} from 'config/proConfig'
import apiService from 'services/apiService'

let config = devConfig
if (process.env.NODE_ENV === 'production') {
  config = proConfig
}
export default apiService(config)
