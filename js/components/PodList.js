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


const download_icon = 'http://icons.iconarchive.com/icons/icons8/ios7/256/Very-Basic-Download-From-Cloud-icon.png'
const downloading_icon = 'http://img.blog.csdn.net/20140207122916390?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvaGl0d2h5bHo=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center'
const delete_icon = 'http://www.iconarchive.com/download/i88581/icons8/ios7/Messaging-Trash.ico'

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
    removeOneCache(this.props.action.removeCache, episode)
  }

  _getIconForEpisode(episode) {
    switch (episode.status) {
      case 2:
        return delete_icon
      case 1:
        return downloading_icon
      case 0:
        return download_icon
      default:
        return download_icon
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
          <Image source={{uri: icon}} style={styles.icon} />
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
