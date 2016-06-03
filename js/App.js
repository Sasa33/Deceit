import React, {
  Component,
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

  render() {
    console.log(this.props);
    return (
      <NavigatorIOS style={styles.container}
        initialRoute={{
          title: 'Topics',
          component: CategoryList,
          passProps: {...this.props}
        }} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

const mapStateToProps = (state) => {
  return {
    pods: state.pods
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators({ fetchPods, fetchEpisodes }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
