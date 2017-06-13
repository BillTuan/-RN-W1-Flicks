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
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
    };
  }
  async getMoviesFromApi(apiLink) {
   try {
     let response = await fetch(apiLink);
     let responseJson = await response.json();
     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(responseJson.results)
     })
   } catch(error) {
     console.error(error);
   }
 }

  componentDidMount(){
    this.getMoviesFromApi(this.props.apiLink);
  }

  renderRow(rowData){
    return(
      <View>
        <View style={{flexDirection:"row"}}>
          <View style={{flex: 3}}>
            <Image source={{uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path}}
              style={{width: 100, height: 130}}/>
          </View>
          <View style={{flex: 7}}>
            <Text>{rowData.title}</Text>
            <Text numberOfLines={4}>{rowData.overview}</Text>
          </View>
        </View>
        <View style={{height: 2, backgroundColor: "white"}}></View>
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

ListCom.propType = {
  apiLink: React.PropTypes.string
}
