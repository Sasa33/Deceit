import React, {
  Component, 
  StyleSheet, 
  ListView, 
  Text, 
  View,
  TouchableHighlight,
  Image
} from 'react-native'

import data from '../resources/data.json'
import EpisodeList from './EpisodeList'

export default class CategoryList extends Component {
  constructor(props) {
    super(props)
    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.guid !== r2.guid
    }) 
    this.state = {
      dataSource: dataSource.cloneWithRows(data.data)
    }
  }

  _rowPressed(categoryId) {
    let topic = data.data.filter(topic => topic.id === categoryId)[0]

    this.props.navigator.push({
      title: topic.title + " List",
      component: EpisodeList,
      passProps: {topic: topic}
    })
  }

  _renderRow(rowData, sectionID, rowID) { 
    return (
      <TouchableHighlight onPress={() => this._rowPressed(rowData.id)}
          underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.image} source={{ uri: rowData.image }} />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>{rowData.title}</Text>
              <Text style={styles.description}>{rowData.description}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <ListView dataSource={this.state.dataSource}
        renderRow={this._renderRow.bind(this)} />
    )
  }
}

var styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: Image.resizeMode.stretch,
    marginRight: 10,
  },
  textContainer: {
    flex: 1
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  description: {
    fontSize: 18,
    color: '#656565'
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
})