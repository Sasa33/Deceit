import React from 'react-native'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import App from './App'

class Root extends Component{
  constructor(props) {
    super(props)
    this.state = {
      store: configureStore(() => this.setState())
    }
  }

  render() {
    return (
        <Provider store={this.state.store}>
          <App />
        </Provider>
      )
  }
}