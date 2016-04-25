import React from 'react-native'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'

class Root extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <Provider store={store}>
          <App />
        </Provider>
      )
  }
}