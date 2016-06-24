import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchPods, fetchEpisodes } from '../actions/pods'
import { loadCacheList, addCache } from '../actions/cache'
import { loadInitialCacheList } from '../localStorage.js'
import CategoryList from '../components/CategoryList'
import BasePage from './BasePage'
import CachedList from '../components/CachedList'

class PodsListPage extends Component{
  componentDidMount() {
    const { action } = this.props
    action.fetchPods();
    loadInitialCacheList(action.loadCacheList).done()
  }

  render() {
    return <BasePage initialRoute={{
      name: 'Topics',
      component: CategoryList
    }} {...this.props} />
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


export default connect(mapStateToProps, mapDispatchToProps)(PodsListPage)
