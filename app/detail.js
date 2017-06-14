import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

export default class DetailCom extends Component {

  render(){
    return(
      <View style={{flex: 1, backgroundColor: "blue"}}>
        <Image source={{uri: 'https://image.tmdb.org/t/p/w342/gfJGlDaHuWimErCr5Ql0I8x9QSy.jpg'}}
      style={{flex: 1}}/>
      <Text>{this.props.title}</Text>
      </View>
    )
  }
}
