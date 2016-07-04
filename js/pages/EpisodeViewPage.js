'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicatorIOS,
} from 'react-native'

import RNFetchBlob from 'react-native-fetch-blob'
import Button from 'apsl-react-native-button'

import { connect } from 'react-redux'

import Media from '../components/Media'
import { removeOneCache } from '../localStorage'

class EpisodeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filePath: ''
    }
  }

  _checkEpisodeStatus(uuid) {
    let cacheList = this.props.cacheList
    let result = cacheList.filter(e => e.uuid == uuid)
    if (result.length > 0 && result[0].status === 2) {
      return 'Downloaded'
    } else if(result.length > 0 && result[0].status === 1) {
      return 'Downloading'
    }
    else {
      return 'Download'
    }
  }

  componentWillMount() {
    let episode = this.props.episode

    let dirs = RNFetchBlob.fs.dirs

    this.setState({
      filePath: dirs.CacheDir + '/' + episode.uuid + '.mp3'
    })
  }


  _download(episode) {
    this.props.action.addCache({
      uuid: episode.uuid,
      podType: this.props.podType,
      podTitle: episode.podTitle,
      podAudio: episode.podAudio,
      podParagraph: episode.podParagraph,
      status: 1
    })

    RNFetchBlob
    .config({
      path: this.state.filePath
    })
    .fetch('GET', episode.podAudio , {
      //some headers ..
    })
    .progress((received, total) => {
        console.log('progress' + (received / total))
    })
    .then((res) => {
      console.log('The file saved to ', res.path())

      this.props.action.changeStatus({
        uuid: episode.uuid,
        status: 2
      })

      RNFetchBlob.session('cachedFiles').add(res.path())

    })
    .catch((err) => {
      console.log(err)
      this.props.action.changeStatus({
        uuid: episode.uuid,
        status: -1
      })
    })
  }

// <ActivityIndicatorIOS style={styles.centering} size="large" />

  render() {
    let episode = this.props.episode
    let status = this._checkEpisodeStatus(episode.uuid)

    let media = status === 'Downloaded'
        ? (<Media audio={this.state.filePath} />)
        : (<Media audio={episode.podAudio} />)


    let button = status !== 'Download'
        ? (<Text style={styles.download}>{ status }</Text>)
        : (<Button onPress={this._download.bind(this, episode)}
              style={styles.downloadButton}>
              Download
            </Button>)

    let deleteButton = status === 'Downloaded'
        ? (<Button onPress={() => removeOneCache(this.props.action.removeCache, episode)}
              style={{margin: 15, backgroundColor: '#ff8000'}} >
              Delete
            </Button>)
        : null

    return (
      <ScrollView style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>{episode.podTitle}</Text>
        </View>
        { media }
        <Text style={styles.description}>{episode.podParagraph}</Text>
        { button }
        { deleteButton }
    </ScrollView>
    )
  }
}


var styles = StyleSheet.create({
  container: {
  },
  heading: {
  },
  title: {
    fontSize: 18,
    padding: 15,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    padding: 15,
    marginTop: 10,
    color: '#656565',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: 200,
  },
  downloadButton: {
    margin: 15,
    backgroundColor: '#55ACEE',
  },
  download: {
    margin: 15,
    color: '#55ACEE',
    textAlign: 'center',
    fontSize: 20
  }
})

const mapStateToProps = (state) => {
  return {
    cacheList: state.cacheList
  }
}


export default connect(mapStateToProps)(EpisodeView)
