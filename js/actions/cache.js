export const LOAD_CACHE_LIST = 'LOAD_CACHE_LIST'
export const REMOVE_CACHE_LIST = 'REMOVE_CACHE_LIST'
export const ADD_A_CACHE = 'ADD_A_CACHE'
export const DELETE_A_CACHE = 'DELETE_A_CACHE'
export const CHANGE_STATUS = 'CHANGE_STATUS'
export const REMOVE_CACHE_FILES = 'REMOVE_CACHE_FILES'

import { loadInitialCacheList, removeAllCaches } from '../localStorage'

export const loadCacheList = () => {
  return async (dispatch) => {
    const cacheList = await loadInitialCacheList()

    return dispatch({
      type: LOAD_CACHE_LIST,
      payload: cacheList
    })
  }
}

export const addCache = (episode) => {
  return {
    type: ADD_A_CACHE,
    payload: episode
  }
}

export const removeCacheList = () => {
  return {
    type: REMOVE_CACHE_LIST
  }
}

export const removeCachedFiles = () => {
  removeAllCaches()

  return {
    type: REMOVE_CACHE_FILES
  }
}

export const removeCache = (episode) => {
  return {
    type: DELETE_A_CACHE,
    payload: episode
  }
}

export const changeStatus = (episode) => {
  return {
    type: CHANGE_STATUS,
    payload: episode
  }
}
