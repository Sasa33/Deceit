import React, {
  Component, 
  View, 
  Text,
  StyleSheet
} from 'react-native'

import CategoryList from './components/CategoryList'

export default class App extends Component{
  render() {
    console.log(this.props)

    return (
      <CategoryList navigator={this.props.navigator}/>
    )
  }
}