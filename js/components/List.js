import React, {
  Component, 
  StyleSheet, 
  ListView, 
  Text, 
  View,
  TouchableHighlight
} from 'react-native'

import data from '../resources/data.json'
import EpisodeView from './EpisodeView'

export default class List extends Component {
  constructor(props) {
    super(props)
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid !== r2.guid
    }) 
    this.state = {
      dataSource: dataSource.cloneWithRows(data.data.ESLPod)
    }
  }

  _rowPressed(episodeId) {
    let episode = data.data.ESLPod.filter(epid => epid.id === episodeId)[0]

    this.props.navigator.push({
      title: "episode",
      component: EpisodeView,
      passProps: {episode: episode}
    })
  }

  _renderRow(rowData, sectionID, rowID) { 
    // console.log(rowData)

    return (
      <TouchableHighlight onPress={() => this._rowPressed(rowData.id)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    console.log(data.data.ESLPod)

    return (
      <ListView dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)} />
    )
  }
}

var styles = StyleSheet.create({
  textContainer: {
    padding: 10
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
})