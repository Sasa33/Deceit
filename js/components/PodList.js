import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native'

const download_icon = 'http://icons.iconarchive.com/icons/icons8/ios7/256/Very-Basic-Download-From-Cloud-icon.png'
const downloading_icon = 'https://camo.githubusercontent.com/6ed028acbf67707d622344e0ef1bc3b098425b50/687474703a2f2f662e636c2e6c792f6974656d732f32473146315a304d306b306832553356317033392f535650726f67726573734855442e676966'
const delete_icon = 'http://www.iconarchive.com/download/i88581/icons8/ios7/Messaging-Trash.ico'

export default class extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })
  }

  _rowPressed(episode) {
    this.props.onRowPressed(episode)
  }

  _download(episode) {

  }

  _renderRow(rowData, sectionID, rowID) {
    let icon
    switch (rowData.status) {
      case 'Downloaded':
        icon = delete_icon
        break
      case 'Downloading':
        icon = downloading_icon
        break
      case 'Download':
        icon = download_icon
        break
      default:
        icon = download_icon
    }

    return (
      <View style={styles.rowContainer}>
        <TouchableHighlight onPress={this._rowPressed.bind(this, rowData)}
            underlayColor='#dddddd'>
          <View style={styles.main}>
            <Text style={styles.text} numberOfLines={1}>{rowData.podTitle}</Text>
            <View style={styles.separator}/>
          </View>
        </TouchableHighlight>
        <TouchableHighlight onPress={this._download.bind(this, rowData)}>
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
