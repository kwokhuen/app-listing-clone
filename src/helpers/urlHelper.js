import R from 'ramda'

const constructUrl = ({url, params}) => {
  let fetchUrl = new URL(url)
  if (params && !R.isEmpty(params)) {
    Object.keys(params).forEach(key => fetchUrl.searchParams.append(key, params[key]))
  }
  return fetchUrl
}

export default {
  constructUrl
}
