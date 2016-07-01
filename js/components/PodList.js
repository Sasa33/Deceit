import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

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

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this.props.onRowPressed(rowData)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.lineContainer}>
            <Text style={styles.text} numberOfLines={1}>{rowData.podTitle}</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    console.log(this.props.listData);
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
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: 70
  },
  lineContainer: {
    flexDirection: 'row',
    paddingLeft: 15,
  },
  text: {
    color: '#656565',
    fontSize: 18,
    padding: 15
  },
  downloadButton: {
    backgroundColor: '#cccccc',
    height: 30,
    width: 80,
    textAlign: 'center',
    alignSelf: 'flex-end'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
})
