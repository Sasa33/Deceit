'use strict'

import React, {
  Component,
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

export default class EpisodeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDownloading: false,
      filePath: '',
      isDownloaded: false,
    }
  }

  _checkIfAlreadyExisted(uuid) {
    if (this.props.cacheList.filter((e) => e.uuid == uuid).length > 0) {
      return true
    } else {
      return false
    }
  }

  componentDidMount() {
    let episode = this.props.episode

    let dirs = RNFetchBlob.fs.dirs
    let savePath = dirs.CacheDir + '/' + episode.uuid + '.mp3'

    if(this._checkIfAlreadyExisted(episode.uuid)) {
      this.setState({
        filePath: savePath,
        isDownloaded: true
      })
    } else {
      this.setState({
        filePath: savePath
      })
    }
  }

  _download(episode) {
    this.setState({
      isDownloading: true
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
      this.setState({
        isDownloading: false,
        isDownloaded: true
      })

      this.props.action.addCache({
        uuid: episode.uuid,
        title: episode.podTitle
      })
    })
    .catch((err) => {
      console.log(err)
      this.setState({
        isDownloading: false
      })
    })
  }

// <ActivityIndicatorIOS style={styles.centering} size="large" />

  render() {
    let episode = this.props.episode

    let media = this.state.isDownloaded
        ? (<Media audio={this.state.filePath} />)
        : (<Media audio={episode.podAudio} />)

    let status = this.state.isDownloading ? 'Downloading' : 'Download'

    let button = this.state.isDownloaded
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
