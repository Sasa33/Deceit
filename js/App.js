import React, {
  Component,
  View,
  Text,
  StyleSheet,
  NavigatorIOS
} from 'react-native'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchPods, fetchEpisodes } from './actions/pods'

import CategoryList from './components/CategoryList'

class App extends Component{
  componentDidMount() {
    this.props.action.fetchPods();
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props);
    console.log(nextProps);
    console.log(this);
    if(this.props.pods != nextProps.pods) {
      this.refs.nav.replace({
        title: 'Topics',
        component: CategoryList,
        passProps: {
          action: nextProps.action,
          pods: nextProps.pods,
          episodes: nextProps.episodes
        }
      })
    } else if (this.props.episodes != nextProps.episodes) {
      this.refs.nav.replacePrevious({
        title: 'Topics',
        component: CategoryList,
        passProps: {
          action: nextProps.action,
          pods: nextProps.pods,
          episodes: nextProps.episodes
        }
      })
    }
  }

  render() {
    console.log(this.props);
    return (
      <NavigatorIOS ref='nav'
        style={styles.container}
        initialRoute={{
          title: 'Topics',
          component: CategoryList,
          passProps: {
            action: this.props.action,
            pods: this.props.pods,
            episodes: this.props.episodes
          }
        }} />
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
  container: {
    flex: 1,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
