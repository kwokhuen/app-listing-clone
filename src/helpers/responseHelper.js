import R from 'ramda'

const entryLens = R.lensPath(['feed', 'entry'])

const getEntry = (response) => {
  return R.view(entryLens)(response)
}

const getAppDetail = (response) => {
  const {results, resultCount} = response
  return resultCount === 1 ? R.head(results) : {}
}

export default {
  getEntry,
  getAppDetail
}
