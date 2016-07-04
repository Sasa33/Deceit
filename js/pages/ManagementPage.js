import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CachedListPage from './CachedListPage'

import Button from 'apsl-react-native-button'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { removeAllCaches, removeOneCache } from '../localStorage'
import { removeCacheList, removeCache } from '../actions/cache'


const ManagerPage = ({navigator}) => {
  return (
    <View>
      <CachedListPage navigator={ navigator } />
      <Button onPress={() => removeAllCaches(this.props.action.removeCacheList)}
        style={{margin: 15, backgroundColor: '#ff0000'}} >
        Remove all cached files.
      </Button>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    cacheList: state.cacheList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    action: bindActionCreators({
      removeCacheList,
      removeCache
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPage)
