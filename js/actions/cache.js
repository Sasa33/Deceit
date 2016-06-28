export const LOAD_CACHE_LIST = 'LOAD_CACHE_LIST'
export const ADD_CACHE = 'ADD_CACHE'
export const CHANGE_STATUS = 'CHANGE_STATUS'

export const loadCacheList = (cacheList) => {
  return {
    type: LOAD_CACHE_LIST,
    payload: cacheList
  }
}

export const addCache = (episode) => {
  return {
    type: ADD_CACHE,
    payload: episode
  }
}

export const changeStatus = (episode) => {
  return {
    type: CHANGE_STATUS,
    payload: episode
  }
}
