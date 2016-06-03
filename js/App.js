import React, {
  Component,
  View,
  Text,
  StyleSheet
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPods, fetchEpisodes } from './actions/pods'

import CategoryList from './components/CategoryList'

class App extends Component{
  componentDidMount() {
    this.props.action.fetchPods();
  }

  render() {
    let { navigator, pods, episodes, action, store } = this.props
    console.log(this.props);

    return (
      <CategoryList
        store={store}
        navigator={navigator}
        pods={pods}
        action={action}
        episodes={episodes}
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
