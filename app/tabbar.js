import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Image} from 'react-native';

import {TabViewAnimated, TabBar, SceneMap} from 'react-native-tab-view';


import ListView from './list';

const FirstRoute = () => <ListView apiLink="https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed" />
const SecondRoute = () => <ListView apiLink="https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed"/>

export default class TabbarCom extends Component {
  state = {
    index: 0,
    routes: [
      {
        key: '1',
        title: 'Now playing',
        icon: 'https://png.icons8.com/clapperboard-filled/ios7/50'
      }, {
        key: '2',
        title: 'Top rated',
        icon: "https://png.icons8.com/star-filled/ios7/50"
      }
    ]
  };

  _handleChangeTab = index => this.setState({index});

  _renderIcon = ({ route }) => {
    return <Image source={{uri: route.icon}}
      style={{width: 20, height: 20}}/>
  };

  renderFooter  = props => <TabBar
    {...props}
    renderIcon={this._renderIcon}
    style={styles.indicator}
  />;

  //  _renderScene = SceneMap({'1': FirstRoute, '2': SecondRoute});
  _renderScene = ({route}) => {
    switch(route.key){
      case '1':
        return <ListView apiLink="https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed" navigator = {this.props.navigator}/>;
      case '2':
        return <ListView apiLink="https://api.themoviedb.org/3/movie/top_rated?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed" navigator = {this.props.navigator}/>
    }
  };

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
  indicator: {
    backgroundColor: '#F6AA1E',
    height: 60,
  },
});
