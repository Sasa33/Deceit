import React, {
  Component,
} from 'react-native'
import Platform from 'Platform'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPods, fetchEpisodes } from './actions/pods'

import Navigator from './components/Navigator'

class App extends Component{
  componentDidMount() {
    this.props.action.fetchPods();
  }

  render() {
    return (
      <Navigator {...this.props}/>
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
