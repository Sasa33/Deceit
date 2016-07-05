import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CachedListPage from './CachedListPage'

import Button from 'apsl-react-native-button'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { removeOneCache } from '../localStorage'
import { removeCacheList, removeCachedFiles, removeCache } from '../actions/cache'


const ManagerPage = ({navigator, cacheList, action}) => {
  const removeCacheButton = cacheList && cacheList.length ?
    <Button onPress={() => {
        action.removeCacheList()
        action.removeCachedFiles()
      }}
     style={{margin: 15, backgroundColor: '#ff0000'}} >
     Remove all cached files.
    </Button> : null
  return (
    <View>
      <CachedListPage navigator={ navigator } />
      { removeCacheButton }
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
      removeCachedFiles,
      removeCache
    }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManagerPage)
