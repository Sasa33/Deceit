import { FETCH_PODS } from '../actions/pods'

const pods = (state = [], action) => {
  switch (action.type) {
    case FETCH_PODS:
      return [...action.pods]
    default:
      return state
  }
}

export default pods
