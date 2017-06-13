import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';


import ListView from './index';

const FirstRoute = () => <ListView apiLink="https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed"/>
const SecondRoute = () => <ListView apiLink="https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed"/>

export default class TabbarCom extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: '1',
        title: 'Now playing',
        icon: 'clapperboard'
      }, {
        key: '2',
        title: 'Top rated',
        icon: 'stars'
      }
    ]
  };

  _handleChangeTab = index => this.setState({index});

  _renderIcon = ({ route }) => {
  };

  renderFooter  = props => <TabBar
    {...props}
    renderIcon={this._renderIcon}
  />;

  _renderScene = SceneMap({'1': FirstRoute, '2': SecondRoute});

  render() {
    return (
      // <ListView apiLink="https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed"/>
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter ={this.renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
