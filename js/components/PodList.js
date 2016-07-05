import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native'

import RNFetchBlob from 'react-native-fetch-blob'

import { removeOneCache } from '../localStorage'

export default class extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })
  }

  _rowPressed(episode) {
    this.props.onRowPressed(episode, this.props.action)
  }

  _onIconPressed(episode) {
    if(episode.status === 0) {
      this._download(episode)
    } else if(episode.status === 2) {
      this._delete(episode)
    }
  }

  _download(episode) {
    let dirs = RNFetchBlob.fs.dirs
    let filePath = dirs.CacheDir + '/' + episode.uuid + '.mp3'

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

  _delete(episode) {
    const { removeCache, removeCachedFile } = this.props.action
    removeCache(episode)
    removeCachedFile(episode)
  }

  _getIconForEpisode(episode) {
    switch (episode.status) {
      case 2:
        return require('./img/icon-delete.png')
      case 1:
        return require('./img/icon-downloading.gif')
      default:
        return require('./img/icon-download.png')
    }
  }


  _renderRow(rowData, sectionID, rowID) {
    let icon = this._getIconForEpisode(rowData)

    return (
      <View style={styles.rowContainer}>
        <TouchableHighlight onPress={this._rowPressed.bind(this, rowData)}
            underlayColor='#dddddd'>
          <View style={styles.main}>
            <Text style={styles.text} numberOfLines={1}>{rowData.podTitle}</Text>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._onIconPressed.bind(this, rowData)}>
          <Image source={ icon } style={styles.icon} />
        </TouchableHighlight>
      </View>
    )
  }

  render() {
    // console.log(this.props.listData);
    let dataSource = this.dataSource.cloneWithRows(this.props.listData)

    return (
      <ListView dataSource={dataSource}
        renderRow={this._renderRow.bind(this)}
        enableEmptySections
        />
    )
  }
}


var styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  main: {
    width: 320,
    paddingLeft: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: 70
  },
  text: {
    color: '#656565',
    fontSize: 18,
    padding: 15
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 8
  },
  separator: {
    height: 1,
    width: 355,
    backgroundColor: '#dddddd'
  },
})
