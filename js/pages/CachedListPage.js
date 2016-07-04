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
import { fetchEpisodes } from '../actions/pods'

export default class CachedListPage extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })
  }

  // componentDidMount() {
  //   this.props.action.fetchEpisodes(this.props.pod.title)
  // }

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
    const { cacheList } = this.props;

    return (
      <PodList listData={ cacheList } onRowPressed={ this._rowPressed.bind(this) } />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    cacheList: state.cacheList
  }
}

export default connect(mapStateToProps)(CachedListPage)
