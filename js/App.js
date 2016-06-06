import React, {
  Component,
  View,
  Navigator,
  StyleSheet
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

  render() {
    console.log(this.props);
    return (
      <Navigator
        initialRoute={{
          name: 'Topics',
          component: CategoryList
        }}
        // navigationBar={{(navigator, navState) => {
        //
        // }}
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

// (route, navigator) =>
//   <CategoryList
//     name={route.name}
//     onBack={() => {
//       if (route.index > 0) {
//         navigator.pop();
//       }
//     }}
//     route={route}
//     navigator={navigator}
//     {...this.props}
//   />

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
