import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';

var NavigationBarRouteMapper = {
LeftButton: (route, navigator, index, navState) =>{
  if(route.name == 'DetailView'){
    return (
      <TouchableOpacity onPress={() => navigator.pop()}>
        <Text style={styles.text}>Back</Text>
      </TouchableOpacity>
    );
  }
},
RightButton: (route, navigator, index, navState) => {
  return
},
Title: (route, navigator, index, navState) => {
  return;
},
}
const styles = StyleSheet.create({
text:{
  fontSize: 20,
}
});
module.exports = (
<Navigator.NavigationBar
  routeMapper={NavigationBarRouteMapper} />
)
