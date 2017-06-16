import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  StatusBar
} from 'react-native';

import TabBar from './tabbar';
import DetailPage from './detail';
import CustomNavBar from './navbar';

export default class Movie extends Component {
  renderScene(route, navigator){
    switch (route.name) {
      case "TabView": return(
          <TabBar navigator = {navigator} {...route.passProps}/>
      );
      case "DetailView": return(<DetailPage title={route.passProps.title}
        date =  {route.passProps.date}
        vote =  {route.passProps.vote}
        overview =  {route.passProps.overview}
        imageURL = {route.passProps.imageURL}
        popularity = {route.passProps.popularity}
       />);
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
