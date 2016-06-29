import React, {
  Component,
  View,
  Text,
  Navigator,
  StyleSheet,
  TouchableOpacity
} from 'react-native'

export default class extends Component{
  _renderNavBar() {
    let routeMapper = {
      LeftButton(route, navigator, index, navState) {
        if(index > 0) {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          )
        } else {
          return null
        }
      },
      RightButton(route, navigator, index, navState) {
        if(index > 0 && route.rightButton) {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
          )
        } else {
          return null
        }

      },
      Title(route, navigator, index, navState) {
        return (
          <View style={styles.title}>
            <Text style={styles.buttonText}>{route.name}</Text>
          </View>
        );
      }
    }

    return (
      <Navigator.NavigationBar
        style={styles.navBar}
        routeMapper={routeMapper}
      />
    )
  }

  _renderScene(route, navigator) {
    let Component = route.component;
    return (<Component navigator={navigator}
            {...route.params}
            {...this.props}
          />)
  }

  render() {
    return (
      <Navigator
        initialRoute={ this.props.initialRoute }
        navigationBar={this._renderNavBar()}
        sceneStyle={{paddingTop: 64,
            backgroundColor: 'white'}}
        renderScene={
          this._renderScene.bind(this)
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    alignItems: 'center',
    backgroundColor: '#55ACEE',
    shadowOffset:{
      width: 1,
      height: 0.5,
    },
    shadowColor: '#55ACEE',
    shadowOpacity: 0.8,
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    flex: 1,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '400'
  }
})
