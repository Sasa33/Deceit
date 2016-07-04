import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CachedListPage from './CachedListPage'

export default ({navigator}) => {
  return (
    <View>
      <CachedListPage navigator={ navigator } />
    </View>
  )
}
