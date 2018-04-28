import urlHelper from 'helpers/urlHelper'

const handleRequest = (url, options) => {
  return fetch(url, options)
  .then(response => {
    return response.json()
  })
  .catch(err => {
    console.log('ERROR', err)
  })
}

export default config => {
  const {ROOT_URL} = config
  return {
    getTop100FreeApps: () => {
      const url = urlHelper.constructUrl({url: `${ROOT_URL}/rss/topfreeapplications/limit=100/json`})
      const options = {
        method: 'get'
      }
      return handleRequest(url, options)
    },
    getAppDetail: (appId) => {
      const params = {
        id: appId
      }
      const url = urlHelper.constructUrl({url: `${ROOT_URL}/lookup`, params})
      const options = {
        method: 'get'
      }
      return handleRequest(url, options)
    }
  }
}
