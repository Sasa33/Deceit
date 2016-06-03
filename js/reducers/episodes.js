import { FETCH_EPISODES } from '../actions/pods'


const episodes = (state = [], action) => {
  switch (action.type) {
    case FETCH_EPISODES:
      return [...action.episodes]
    default:
      return state
  }
}

export default episodes
