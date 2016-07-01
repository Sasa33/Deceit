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

export default class EpisodeListPage extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })
  }

  componentDidMount() {
    this.props.action.fetchEpisodes(this.props.pod.title)
  }

  _rowPressed(episode) {
    // let episode = this.props.episodes.filter(ep => ep.podId === episodeId)[0]
    this.props.navigator.push({
      name: this.props.pod.title,
      component: EpisodeViewPage,
      params: {
        episode: episode
      }
    })
  }

  render() {
    const { episodes } = this.props;

    return (
      <PodList listData={ episodes } onRowPressed={ this._rowPressed.bind(this) } />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    episodes: state.episodes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators({
      fetchEpisodes,
    }, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EpisodeListPage)
