'use strict'
 
import React, {
  Component, 
  StyleSheet, 
  Image, 
  Text, 
  View
} from 'react-native'


export default class EpisodeView extends Component {
 
  render() {
    let episode = this.props.episode
 
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>{episode.title}</Text>
          <View style={styles.separator}/>
        </View>
        <Text style={styles.description}>{episode.script}</Text>
      </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    marginTop: 65
  },
  heading: {
    backgroundColor: '#F8F8F8',
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  }
})