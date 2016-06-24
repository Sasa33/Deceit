import { LOAD_CACHE_LIST, ADD_CACHE } from '../actions/cache'



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
    default:
      return state
  }
}

export default cacheList
