import React, {
  Component,
  StyleSheet,
  ListView,
  Text,
  View,
  TouchableHighlight
} from 'react-native'

import EpisodeView from './EpisodeView'

import { connect } from 'react-redux'


class EpisodeList extends Component {
  constructor(props) {
    super(props)
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1.id !== r2.id
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log('nextProps');
  }

  componentDidMount() {
    console.log('mounted');
    this.props.action.fetchEpisodes(this.props.pod.title)
  }

  _rowPressed(episodeId) {
    let episode = this.props.episodes.filter(ep => ep.podId === episodeId)[0]

    this.props.navigator.push({
      title: episode.podTitle,
      component: EpisodeView,
      passProps: {episode: episode}
    })
  }

  _renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => this._rowPressed(rowData.podId)}
          underlayColor='#dddddd'>
        <View style={styles.lineContainer}>
          <Text style={styles.text} numberOfLines={1}>{rowData.podTitle}</Text>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    console.log(this.props);
    console.log(this.props.episodes)

    let dataSource = this.dataSource.cloneWithRows(this.props.episodes)

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
    // padding: 10
  },
  text: {
    color: '#656565',
    // backgroundColor: 'white',
    fontSize: 18,
    padding: 15

  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
})


const mapStateToProps = (state) => {
  return {
    episodes: state.episodes
  };
}

export default EpisodeList
