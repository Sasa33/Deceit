import React, {
  Component,
  View,
  Text,
  Navigator,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import Platform from 'Platform'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPods, fetchEpisodes } from './actions/pods'

import CategoryList from './components/CategoryList'

class App extends Component{
  componentDidMount() {
    this.props.action.fetchPods();
  }

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
    return <Component navigator={navigator}
            {...route.params}
            {...this.props}
          />
  }

  render() {
    return (
      <Navigator
        initialRoute={{
          name: 'Topics',
          component: CategoryList
        }}
        navigationBar={this._renderNavBar()}
        sceneStyle={{paddingTop: (Platform.OS === 'android' ? 66 : 74)}}
        renderScene={
          this._renderScene.bind(this)  // remeber to bind this!!!
        }
      />
    )
  }
}


const mapStateToProps = (state) => {
  return {
    pods: state.pods,
    episodes: state.episodes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators({ fetchPods, fetchEpisodes }, dispatch)
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
