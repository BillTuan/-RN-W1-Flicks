import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  TextInput
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
  if(route.name == 'TabView'){
    return (<Text style={{marginTop: 25, marginLeft: 90, fontSize: 20, fontWeight: '900'}}>Flicks</Text>)
  }
},
}
const styles = StyleSheet.create({
text:{
  fontSize: 20,
}
});
module.exports = (
<Navigator.NavigationBar
  routeMapper={NavigationBarRouteMapper}
  style ={{backgroundColor: 'orange', height: 30}}
/>
)
