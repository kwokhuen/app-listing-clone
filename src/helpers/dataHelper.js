import R from 'ramda'

const getAppIdFromItem = (item) => {
  return R.view(R.lensPath(['id', 'attributes', 'im:id']))(item)
}

const getNameFromItem = (item) => {
  return R.view(R.lensPath(['im:name', 'label']))(item)
}

const getThumbUrlFromItem = (item) => {
  return R.view(R.lensPath(['im:image', 2, 'label']))(item)
}

const getCategoryFromItem = (item) => {
  return R.view(R.lensPath(['category', 'attributes', 'label']))(item)
}

const getAuthorFromItem = (item) => {
  return R.view(R.lensPath(['im:artist', 'label']))(item)
}

const getSummaryFromItem = (item) => {
  return R.view(R.lensPath(['summary', 'label']))(item)
}

const getDataByProperty = R.curry((item, property) => {
  const fnMap = {
    name: getNameFromItem(item),
    category: getCategoryFromItem(item),
    author: getAuthorFromItem(item),
    summary: getSummaryFromItem(item)
  }
  return fnMap[property]
})

const filterBy = R.curry((properties, searchInputValue, item) => {
  return R.compose(
    R.contains(true),
    R.map(isDataMatchSearchInput(searchInputValue)),
    R.map(getDataByProperty(item))
  )(properties)
})

const isDataMatchSearchInput = R.curry((searchInputValue, data) => {
  return R.compose(
    R.not,
    R.equals(-1),
    R.indexOf(R.toLower(searchInputValue)),
    R.toLower
  )(data)
})

export default {
  getAppIdFromItem,
  getNameFromItem,
  getThumbUrlFromItem,
  getCategoryFromItem,
  filterBy
}
