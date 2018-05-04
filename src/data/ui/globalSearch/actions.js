export const SET_GLOBAL_SEARCH_INPUT_VALUE = 'DATA/UI/GLOBALSEARCH/SET_GLOBAL_SEARCH_INPUT_VALUE'
export const RESET = 'DATA/UI/MENU_ITEM_KEY/RESET'

export const setGlobalSearchInputValue = (value) => {
  return {
    type: SET_GLOBAL_SEARCH_INPUT_VALUE,
    value
  }
}
