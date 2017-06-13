import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image
} from 'react-native';

export default class ListCom extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }
  async getMoviesFromApi() {
   try {
     let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=a07e22bc18f5cb106bfe4cc1f83ad8ed');
     let responseJson = await response.json();
     console.log(JSON.stringify(responseJson));
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(responseJson.results)
     })
   } catch(error) {
     console.error(error);
   }
 }

  componentDidMount(){
    this.getMoviesFromApi();
  }

  renderRow(rowData){
    return(
      <View style={{flexDirection:"row", borderColor:"white", borderWidth:1}}>
        <View style={{flex: 3}}>
          <Image source={{uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path}}
            style={{width: 100, height: 130}}/>
        </View>
        <View style={{flex: 7}}>
          <Text>{rowData.title}</Text>
          <Text numberOfLines={4}>{rowData.overview}</Text>
        </View>
      </View>

    )
  }

  render(){
    return(
      <View style={{backgroundColor: "orange"}}>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
            enableEmptySections={true}
          />
      </View>
    )
  }

}
