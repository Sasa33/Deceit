import React, { Component } from 'react-native'
import { Provider } from 'react-redux'
import configStore from './store'
import App from './App'

let store = configStore()

export default class Root extends Component{
  render() {
    return (
        <Provider store={store}>
          <App />
        </Provider>
      )
  }
}
