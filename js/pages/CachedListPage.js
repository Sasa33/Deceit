import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import PodList from '../components/PodList'
import EpisodeViewPage from './EpisodeViewPage'
import { addCache, changeStatus, removeCache } from '../actions/cache'


export default class CachedListPage extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })
  }

  _rowPressed(episode) {
    this.props.navigator.push({
      name: episode.podType,
      component: EpisodeViewPage,
      params: {
        episode: episode
      }
    })
  }

  render() {
    const { cacheList, action } = this.props;

    return (
      <PodList listData={ cacheList } action={ action }
        onRowPressed={ this._rowPressed.bind(this) } />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    cacheList: state.cacheList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators({
      addCache,
      changeStatus,
      removeCache
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CachedListPage)
