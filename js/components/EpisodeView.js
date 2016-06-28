'use strict'

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicatorIOS,
  TouchableHighlight
} from 'react-native'

import RNFetchBlob from 'react-native-fetch-blob'

import Media from './Media'
import { removeCacheList } from '../localStorage'

let filePath = ''
let isDownloaded = false
let isDownloading = false

export default class EpisodeView extends Component {
  constructor(props) {
    super(props)
  }

  _checkIfAlreadyExisted(uuid) {
    let cacheList = this.props.cacheList
    let result = cacheList.filter(e => e.uuid == uuid)
    if (result.length > 0 && result[0].status === 2) {
      return true
    } else {
      return false
    }
  }

  componentWillMount() {
    let episode = this.props.episode

    let dirs = RNFetchBlob.fs.dirs
    filePath = dirs.CacheDir + '/' + episode.uuid + '.mp3'

    if(this._checkIfAlreadyExisted(episode.uuid)) {
      isDownloaded = true
    } else {
      isDownloaded = false
    }
  }

  componentWillUnmount() {
    console.log('will unmount');
  }

  _download(episode) {
    isDownloading = true

    this.props.action.addCache({
      uuid: episode.uuid,
      podTitle: episode.podTitle,
      podAudio: episode.podAudio,
      podParagraph: episode.podParagraph,
      status: 1
    })


    RNFetchBlob
    .config({
      path: filePath
    })
    .fetch('GET', episode.podAudio , {
      //some headers ..
    })
    .progress((received, total) => {
        console.log('progress' + (received / total))
    })
    .then((res) => {
      console.log('The file saved to ', res.path())

      isDownloading = false
      isDownloaded = true

      this.props.action.changeStatus({
        uuid: episode.uuid,
        status: 2
      })
    })
    .catch((err) => {
      console.log(err)
      isDownloading = false
      this.props.action.changeStatus({
        uuid: episode.uuid,
        status: -1
      })
    })
  }

// <ActivityIndicatorIOS style={styles.centering} size="large" />

  render() {
    let episode = this.props.episode

    let media = isDownloaded
        ? (<Media audio={filePath} />)
        : (<Media audio={episode.podAudio} />)

    let status = isDownloading ? 'Downloading' : 'Download'

    let button = isDownloaded
        ? (<Text style={styles.download}>is downloaded</Text>)
        : (<TouchableHighlight onPress={this._download.bind(this, episode)}
              style={styles.downloadButton}>
              <Text style={styles.download}>{ status }</Text>
            </TouchableHighlight>)

    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>{episode.podTitle}</Text>
        </View>
        { media }
        <Text style={styles.description}>{episode.podParagraph}</Text>
        { button }
        <Text onPress={removeCacheList}>
          Press here to remove cacheList from storage.
        </Text>
    </View>
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
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    marginTop: 20,
    color: '#656565',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    height: 200,
  },
  downloadButton: {
    width: 100,
    height: 50,
    marginTop: 20,
    backgroundColor: '#cccccc',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  download: {
    textAlign: 'center'
  }
})
