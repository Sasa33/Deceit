import React from 'react'

import BasePage from './BasePage'
import CachedList from '../components/CachedList'

export default () => {
  return <BasePage initialRoute={{
    name: 'CachedList',
    component: CachedList
  }} />
}
