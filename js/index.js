import React, { Component } from 'react-native'
import { Provider } from 'react-redux'
import configStore from './store'
import App from './App'

let store = configStore()

export default class Root extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Provider store={store}>
          <App store={store} {...this.props}/>
        </Provider>
      )
  }
}
