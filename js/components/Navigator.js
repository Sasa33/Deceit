import React, { Component } from 'react'
import {
  View,
  Text,
  Navigator,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Platform from 'Platform'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import TabView from './TabView'
import CategoryList from './CategoryList'

import { switchTab } from '../actions/navigation'

class Nav extends Component{

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
        if(index > 0 && route.RightButton) {
          return (
            <TouchableOpacity
              onPress={() => {
                route.component.onRightButton()
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
          )
        } else {
          return null
        }
      },
      Title(route, navigator, index, navState) {
        return (
          <View style={styles.title}>
            <Text style={styles.buttonText}>{route.name ? route.name : 'Topics'}</Text>
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

    if(Component) {
      return (<Component navigator={navigator}
        {...route.params}
        {...this.props}
        />)
    }
    return <TabView navigator={navigator}></TabView>
  }

  render() {
    return (
      <Navigator
        initialRoute={{}}
        navigationBar={this._renderNavBar()}
        sceneStyle={{paddingTop: (Platform.OS === 'android' ? 66 : 74),
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

export default Nav
