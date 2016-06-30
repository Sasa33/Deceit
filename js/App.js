import React, { Component } from 'react'

import Platform from 'Platform'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TabView from './components/TabView'
import { switchTab } from './actions/navigation'

class App extends Component{

  render() {
    return (
      <TabView {...this.props}/>
    )
  }
}

const mapStateToProps = (state) => ({
  tab: state.navigation
})

const mapDispatchToProps = (dispatch) => ({
  onTabSelect: bindActionCreators(switchTab, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
