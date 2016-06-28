import { LOAD_CACHE_LIST, ADD_CACHE, CHANGE_STATUS } from '../actions/cache'



const cacheList = (state = [], action) => {
  switch (action.type) {
    case LOAD_CACHE_LIST:
      console.log('loading...')
      console.log(state)
      console.log(action.payload)
      return action.payload
    case ADD_CACHE:
      console.log(action);
      return [...state, action.payload]
    case CHANGE_STATUS:
      console.log(action)
      return state.map(episode =>
        episode.uuid === action.payload.uuid
        ? Object.assign({}, episode, { status: action.payload.status })
        : episode
      )
    default:
      return state
  }
}

export default cacheList
