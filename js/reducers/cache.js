import { LOAD_CACHE_LIST, ADD_A_CACHE, CHANGE_STATUS,
          DELETE_A_CACHE, REMOVE_CACHE_LIST } from '../actions/cache'

const cacheList = (state = [], action) => {
  switch (action.type) {
    case LOAD_CACHE_LIST:
      return action.payload
    case ADD_A_CACHE:
      return [...state, action.payload]
    case CHANGE_STATUS:
      return state.map(episode =>
        episode.uuid === action.payload.uuid
        ? Object.assign({}, episode, { status: action.payload.status })
        : episode
      )
    case REMOVE_CACHE_LIST:
      return []
    case DELETE_A_CACHE:
      return state.filter(episode =>
        episode.uuid !== action.payload.uuid
      )
    default:
      return state
  }
}

export default cacheList
