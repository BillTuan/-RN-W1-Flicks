import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableHighlight,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Ionicons';

export default class ListCom extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      searchText: '',
      refreshing: false,
      listView: true,
      currentPage: 1,
      isFirstPage: true,
      _postData: [],
    };
  }
  getMoviesFromApi() {
    if(this.state.isFirstPage){
      this.setState({
        _postData: []
      })
    }
    return fetch(this.props.apiLink + this.state.currentPage)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        _postData : this.state._postData.concat(responseJson.results),
        dataSource: this.state.dataSource.cloneWithRows(this.state._postData),
        isFirstPage: false,
        currentPage: this.state.currentPage + 1,
      })
    })
    .catch((error) => {
    console.error(error);
  });
 }

  componentWillMount(){
    this.getMoviesFromApi();
  }

  renderRow(rowData){
    return(
      <TouchableHighlight onPress={() => this.props.navigator.push({name: 'DetailView',
        passProps: {
          imageURL: rowData.poster_path,
          title: rowData.title,
          date: rowData.release_date,
          vote: rowData.vote_average,
          overview: rowData.overview,
          popularity: rowData.popularity,
        }
      })}>
        <View>
          <View style={{flexDirection:"row"}}>
            <View style={{flex: 3}}>
              <Image
                source={{uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path }}
                indicator={Progress.Pie}
                indicatorProps={{
                    size: 50,
                    borderWidth: 0,
                    color: 'rgba(150, 150, 150, 1)',
                    unfilledColor: 'rgba(200, 200, 200, 0.2)'
                  }}
                style={{width: 100, height: 130}}
              />
            </View>
            <View style={{flex: 7}}>
              <Text style={{fontWeight: '600', fontSize: 22, marginBottom: 15, color: 'black'}}>{rowData.title}</Text>
              <Text numberOfLines={4}>{rowData.overview}</Text>
            </View>
          </View>
          <View style={{height: 2, backgroundColor: "white"}}></View>
        </View>
      </TouchableHighlight>
    )
  }
renderRowGrid(rowData){
  return(
     <TouchableHighlight onPress={() => this.props.navigator.push({name: 'DetailView',
      passProps: {
        imageURL: rowData.poster_path,
        title: rowData.title,
        date: rowData.release_date,
        vote: rowData.vote_average,
        overview: rowData.overview,
        popularity: rowData.popularity,
      }
    })}
    style={styles.item}>
        <View>
            <Image
              source={{uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path}}
              indicator={Progress.Pie}
              indicatorProps={{
                  size: 20,
                  borderWidth: 0,
                  color: 'rgba(150, 150, 150, 1)',
                  unfilledColor: 'rgba(200, 200, 200, 0.2)'
                }}
              style={{width: 150, height: 180}}
            />
            <Text style={{fontWeight: '600', fontSize: 22, marginBottom: 15, color: 'black'}}>{rowData.title}</Text>
        </View>
     </TouchableHighlight>
  )
}
setSearchText(event) {
 let searchText = event.nativeEvent.text;
 this.setState({searchText});

 let filteredData = this.filterNotes(searchText, this.state._postData);
 this.setState({
   dataSource: this.state.dataSource.cloneWithRows(filteredData),
 });
}

filterNotes(searchText, notes) {
  let row = [];
  let text = searchText.toLowerCase();
  for (var i = 0; i < notes.length; i++) {
    let title = notes[i].title.toLowerCase();
   if (title.search(text) !== -1) {
     row.push(notes[i])
   }
  }
  return row;
}
_onRefresh(){
  this.setState({refreshing: true, isFirstPage: true,});

  this.getMoviesFromApi().then(() => {
    this.setState({
      refreshing: false
    })
  })
}

_onEndReached(){
  this.getMoviesFromApi();
}

List(){
  return(
    <ListView
       refreshControl={
       <RefreshControl
         refreshing={this.state.refreshing}
         onRefresh={this._onRefresh.bind(this)}
       />}
      dataSource={this.state.dataSource}
      renderRow={(rowData) => this.renderRow(rowData)}
      onEndReached={this._onEndReached.bind(this)}
      enableEmptySections={true}
    />)
}
Grid(){
  return (
    <ListView  contentContainerStyle={styles.list}
     refreshControl={
     <RefreshControl
       refreshing={this.state.refreshing}
       onRefresh={this._onRefresh.bind(this)}
     />}
    dataSource={this.state.dataSource}
    renderRow={(rowData) => this.renderRowGrid(rowData)}
    onEndReached={this._onEndReached.bind(this)}
    enableEmptySections={true}
  />)
}
  render(){
    var iconName = this.state.listView === true ? "ios-grid-outline" : "ios-list-box-outline";
    return(
      <View style={{backgroundColor: "orange"}}>
        <View style={{borderBottomWidth: 1, borderTopWidth: 1, backgroundColor: 'white', flexDirection:'row', justifyContent: "space-between"}}>
          <TextInput
            placeholder = 'Search...'
            value={this.state.searchText}
            onChange={this.setSearchText.bind(this)}
            style = {{width: 300}}
          />
          <TouchableOpacity onPress = {() => this.setState({listView: !this.state.listView})}>
            <Icon name={iconName} size={50}/>
          </TouchableOpacity>
        </View>
        {/* {this.Grid()} */}
        {this.state.listView === true ? this.List() : this.Grid()}
      </View>
    )
  }
}


var styles = StyleSheet.create({
    list: {
      flexDirection: 'row',
      flexWrap: 'wrap',
     justifyContent: "center"
    },
    item: {
      margin: 2,
      width: Dimensions.get('screen').width*.47,
      height: Dimensions.get('screen').height*.45,
    }
});
