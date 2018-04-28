import R from 'ramda'

const entryLens = R.lensPath(['feed', 'entry'])

const getFreeAppList = (response) => {
  return R.view(entryLens)(response)
}

export default {
  getFreeAppList
}
