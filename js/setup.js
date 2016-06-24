import React, { Component } from 'react-native'
import { Provider } from 'react-redux'
import configStore from './store'
import App from './App'
import throttle from 'lodash/throttle'
import { saveCacheList } from './localStorage.js'

let store = configStore()

store.subscribe(throttle(() => {
  console.log('saving cacheList...');
  console.log(store.getState().cacheList);
  saveCacheList(store.getState().cacheList)
}, 10000))

export default class Root extends Component{
  render() {
    return (
        <Provider store={store}>
          <App />
        </Provider>
      )
  }
}
