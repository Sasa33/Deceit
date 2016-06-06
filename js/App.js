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

  _renderScene(route, navigator) {
    console.log(route);
    console.log(navigator);
    console.log(this);
    console.log(this.props);
    switch (route.name) {
      case 'Topics':
      console.log('CategoryList');
        return (
          <CategoryList
            navigator={navigator}
            {...this.props}
          />
        )
      case 'EpisodeList':
      console.log('EpisodeList');
        return (
          <EpisodeList
            navigator={navigator}
            {...this.props}
          />
        )
      default:

    }
  }

  _renderNavBar() {
    const styles = {
      title: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
      },
      button: {
        flex: 1, width: 50, alignItems: 'center', justifyContent: 'center'
      },
      buttonText: {
        fontSize: 18, color: '#FFFFFF', fontWeight: '400'
      }
    }

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
        style={{
          alignItems: 'center',
          backgroundColor: '#55ACEE',
          shadowOffset:{
              width: 1,
              height: 0.5,
          },
          shadowColor: '#55ACEE',
          shadowOpacity: 0.8,
          }}
        routeMapper={routeMapper}
      />
    )
  }

  render() {
    console.log(this.props);
    return (
      <Navigator
        initialRoute={{
          name: 'Topics',
          component: CategoryList
        }}
        navigationBar={this._renderNavBar()}
        // renderScene={this._renderScene}
        sceneStyle={{paddingTop: (Platform.OS === 'android' ? 66 : 74)}}
        renderScene={
          (route, navigator) => {
            let Component = route.component;
            console.log(route.params);
            return <Component
                    {...route.params}
                    navigator={navigator}
                    {...this.props}
                    onBack={() => {
                      if(navigator) {
                        navigator.pop()
                      }
                    }}
                  />
          }
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

export default connect(mapStateToProps, mapDispatchToProps)(App)
