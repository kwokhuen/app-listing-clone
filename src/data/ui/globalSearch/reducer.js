import {SET_GLOBAL_SEARCH_INPUT_VALUE} from './actions'

export const reducer = (state = {value: ''}, action) => {
  switch (action.type) {
    case SET_GLOBAL_SEARCH_INPUT_VALUE:
      return {value: action.value}
    default:
      return state
  }
}
