import React, {
  Component,
} from 'react-native'
import Platform from 'Platform'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPods, fetchEpisodes } from './actions/pods'
import { loadCacheList, addCache } from './actions/cache'
import { loadInitialCacheList } from './localStorage.js'

import Navigator from './components/Navigator'

class App extends Component{
  componentDidMount() {
    const { action } = this.props
    action.fetchPods()
    loadInitialCacheList(action.loadCacheList).done()
  }

  render() {
    return (
      <Navigator {...this.props}/>
    )
  }
}


const mapStateToProps = (state) => {
  console.log(state)
  return {
    pods: state.pods,
    episodes: state.episodes,
    cacheList: state.cacheList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators({
      fetchPods,
      fetchEpisodes,
      loadCacheList,
      addCache
    }, dispatch)
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(App)
