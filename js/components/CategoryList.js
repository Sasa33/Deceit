import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native'

import EpisodeList from './EpisodeList'

export default class CategoryList extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })
    this.state = {
      pod: []
    }
  }

  _rowPressed(categoryId) {
    let pod = this.props.pods.filter(pod => pod.id === categoryId)[0]
    this.setState({pod: pod})

    console.log('test');

    this.props.navigator.push({
      title: pod.title + " List",
      component: EpisodeList,
      passProps: {
        pod: pod,
        action: this.props.action,
        episodes: this.props.episodes
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.episodes != nextProps.episodes) {
      let pod = this.state.pod
      console.log(pod);
      console.log(this.props);
      console.log(nextProps);

      nextProps.navigator.replace({
        title: pod.title + " List",
        component: EpisodeList,
        passProps: {
          pod: pod,
          action: this.props.action,
          episodes: nextProps.episodes
        }
      })
    }
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
    console.log(this.props);
    let dataSource
    if(this.props.pods) {
      dataSource = this.dataSource.cloneWithRows(this.props.pods)
    } else {
      dataSource = this.dataSource.cloneWithRows([])
    }

    return (
      <ListView dataSource={dataSource}
        renderRow={this._renderRow.bind(this)}
        enableEmptySections/>
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
