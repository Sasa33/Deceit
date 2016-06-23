'use strict'

import React, {
  Component,
  StyleSheet,
  Image,
  Text,
  View,
  ActivityIndicatorIOS
} from 'react-native'

import RNFetchBlob from 'react-native-fetch-blob'

import Media from './Media'

export default class EpisodeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDownloading: true,
      filePath: ''
    }
  }

  componentDidMount() {
    let episode = this.props.episode

    let dirs = RNFetchBlob.fs.dirs
    let savePath = dirs.CacheDir + '/' + episode.podId + '.mp3'

    this.setState({
      isDownloading: true,
      filePath: savePath
    })

    RNFetchBlob
    .config({
      // response data will be saved to this path if it has access right.
      path: savePath
    })
    .fetch('GET', episode.podAudio , {
      //some headers ..
    })
    .progress((received, total) => {
        console.log('progress', received / total)
    })
    .then((res) => {
      console.log('The file saved to ', res.path())
      this.setState({
        isDownloading: false
      })
    })
    .catch((err) => {
      console.log(err)
      this.setState({
        isDownloading: false
      })
    })
  }



  render() {
    let episode = this.props.episode

    let media = !this.state.isDownloading
        ? (<Media audio={this.state.filePath} />)
        : (<ActivityIndicatorIOS style={styles.centering} size="large" />)


    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>{episode.podTitle}</Text>
        </View>
        { media }
        <Text style={styles.description}>{episode.podParagraph}</Text>
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
})
