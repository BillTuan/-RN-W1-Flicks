import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator
} from 'react-native';

import TabBar from './tabbar';
import DetailPage from './detail';
import CustomNavBar from './navbar';

export default class Movie extends Component {
  renderScene(route, navigator){
    switch (route.name) {
      case "TabView": return(<TabBar navigator = {navigator} {...route.passProps}/>);
      case "DetailView": return(<DetailPage title={route.passProps.title}/>);
    }
  }
  configureScene(){
    return Navigator.SceneConfigs.SwipeFromLeft;
  }

  render() {
    return (
      <Navigator
        initialRoute={{name:"TabView"}}
        renderScene={this.renderScene}
        configureScene={this.configureScene.bind(this)}
        navigationBar={CustomNavBar}
      />
    );
  }
}
