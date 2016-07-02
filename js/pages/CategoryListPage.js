import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { fetchPods } from '../actions/pods'
import { loadInitialCacheList } from '../localStorage.js'
import { loadCacheList } from '../actions/cache'
import CategoryList from '../components/CategoryList'
import CachedList from '../components/CachedList'

class PodsListPage extends Component{
  componentDidMount() {
    const { action } = this.props
    action.fetchPods();
    loadInitialCacheList(action.loadCacheList).done()
  }

  render() {
    return <CategoryList {...this.props} />
  }
}

const mapStateToProps = (state) => {
  return {
    pods: state.pods,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators({
      fetchPods,
      loadCacheList
    }, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PodsListPage)
