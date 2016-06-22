'use strict'

import React, {
  Component,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native'

import Media from './Media'

export default class EpisodeView extends Component {

  render() {
    let episode = this.props.episode

    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.title}>{episode.podTitle}</Text>
        </View>
        <Media audio={episode.podAudio}/>
        <Text style={styles.description}>{episode.podParagraph}</Text>
      </View>
    )
  }
}


var styles = StyleSheet.create({
  container: {
  },
  heading: {
  },
  title: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    marginTop: 20,
    color: '#656565',
  }
})
