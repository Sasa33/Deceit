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

import App from './js/App';


class Deceit extends Component {
  render() {
    return (
      // <Text style={styles.welcome}>Hello World!</Text>
      <NavigatorIOS style={styles.container} 
        initialRoute={{
          title: 'Topics', 
          component: App
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
