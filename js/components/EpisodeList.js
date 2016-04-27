import React, {
  Component, 
  StyleSheet, 
  ListView, 
  Text, 
  View,
  TouchableHighlight
} from 'react-native'

import EpisodeView from './EpisodeView'

export default class EpisodeList extends Component {
  constructor(props) {
    super(props)
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid !== r2.guid
    }) 
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.topic.episodeList)
    }
  }

  _rowPressed(episodeId) {
    let episode = this.props.topic.episodeList.filter(epid => epid.id === episodeId)[0]

    this.props.navigator.push({
      title: episode.title,
      component: EpisodeView,
      passProps: {episode: episode}
    })
  }

  _renderRow(rowData, sectionID, rowID) { 
    // console.log(rowData)

    return (
      <TouchableHighlight onPress={() => this._rowPressed(rowData.id)}
          underlayColor='#dddddd'>
        <View style={styles.lineContainer}>
          <Text style={styles.text} numberOfLines={1}>{rowData.title}</Text>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    console.log(this.props.topic)

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{this.props.topic.title}</Text>
        </View>
        <View>
          <ListView dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)} />
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    padding: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: 70
  },
  lineContainer: {
    padding: 10
  },
  text: {
    color: '#656565',
    backgroundColor: 'white',
    fontSize: 18,
    padding: 5
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
})