import React, {
  Component, 
  View, 
  Text,
  StyleSheet
} from 'react-native'

import List from './components/List'

export default class App extends Component{
  render() {
    console.log(this.props)

    return (
      
      <List navigator={this.props.navigator}/>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'black',
    backgroundColor: 'white',
    fontSize: 30,
    margin: 80
  },
  container: {
    padding: 10
  }
})