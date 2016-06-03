export const FETCH_PODS = 'FETCH_PODS'
export const FETCH_FAIL = 'FETCH_FAIL'
export const FETCH_EPISODES = 'FETCH_EPISODES'

// const _getPods = (pods) => {
//   return {
//     type: FETCH_PODS,
//     pods
//   }
// }
//
// export const fetchPods = async () => {
//   let data = await fetch('http://localhost:3000/pods');
//   this._getPods(data);
// }

const _getPods = (pods) => {
  return {
    type: FETCH_PODS,
    pods
  }
}

const _fetchFail = (error) => {
  return {
    type: FETCH_FAIL,
    pods
  }
}

export const fetchPods = () => {
  return dispatch => {
    return fetch('http://localhost:3000/pods')
      .then(r => r.json())
      .then(json => {
        dispatch(_getPods(json))
      })
      .catch(error => {
        // dispatch()
        console.log(error)
      })
  }
}

const _getEpisodes = (episodes) => {
  return {
    type: FETCH_EPISODES,
    episodes
  }
}

export const fetchEpisodes = (podName) => {
  return dispatch => {
    return fetch('http://localhost:3000/pods/' + podName)
      .then(r => r.json())
      .then(json => {
        dispatch(_getEpisodes(json))
      })
      .catch(error => {
        // dispatch()
        console.log(error)
      })
  }
}
