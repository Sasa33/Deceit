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
import { addCache, changeStatus } from '../actions/cache'


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
    console.log(episode)
    this.props.navigator.push({
      name: this.props.pod.title,
      component: EpisodeViewPage,
      params: {
        episode: episode
      }
    })
  }

  render() {
    const { episodes, action } = this.props;
    cachActions = {
      addCache: action.addCache,
      changeStatus: action.changeStatus
    }

    return (
      <PodList listData={ episodes } action={ cachActions }
        onRowPressed={ this._rowPressed.bind(this) } />
    )
  }
}

const getEpisodeStatus = (episode, cacheList) => {
  let uuid = episode.uuid
  let result = cacheList.filter(e => e.uuid == uuid)
  if (result.length > 0 && result[0].status === 2) {
    return 2
  } else if(result.length > 0 && result[0].status === 1) {
    return 1
  }
  else {
    return 0
  }
}

const decorateEachEpisode = (state) => {
  let { episodes, cacheList } = state

  if(episodes) {
    return episodes.map(e =>
      Object.assign({}, e, {status: getEpisodeStatus(e, cacheList)})
    )
  }
}

const mapStateToProps = (state) => {
  return {
    episodes: decorateEachEpisode(state),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators({
      fetchEpisodes,
      addCache,
      changeStatus,

    }, dispatch)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(EpisodeListPage)
