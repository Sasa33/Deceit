/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  NavigatorIOS
} from 'react-native';

import Root from './js/index';


class Deceit extends Component {
  render() {
    return (
      <NavigatorIOS style={styles.container} 
        initialRoute={{
          title: 'Topics', 
          component: Root
        }} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

AppRegistry.registerComponent('Deceit', () => Deceit);
