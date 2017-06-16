import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Image,
  TouchableHighlight,
  TextInput,

} from 'react-native';

export default class ListCom extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      searchText: ''
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
      <TouchableHighlight onPress={() => this.props.navigator.push({name: 'DetailView',
        passProps: {
          imageURL: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path,
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
              <Image source={{uri: 'https://image.tmdb.org/t/p/w342' + rowData.poster_path}}
                style={{width: 100, height: 130}}/>
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

setSearchText(event) {
 let searchText = event.nativeEvent.text;
 this.setState({searchText});
 fetch(this.props.apiLink)
 .then((response) => response.json())
 . then((responseJson) => {
     let filteredData = this.filterNotes(searchText, responseJson.results);

     this.setState({
       dataSource: this.state.dataSource.cloneWithRows(filteredData),
     });
 });
}

filterNotes(searchText, notes) {

  let row = [];
  let text = searchText.toLowerCase();
  for (var i = 0; i < notes.length; i++) {
    // console.log(note);
    let title = notes[i].title.toLowerCase();
   if (title.search(text) !== -1) {
     row.push(notes[i])
   }
  }
  return row;
}

  render(){
    return(
      <View style={{backgroundColor: "orange"}}>
        <View style={{borderBottomWidth: 1, borderTopWidth: 1, backgroundColor: 'white'}}>
          <TextInput
            placeholder = 'Search...'
            value={this.state.searchText}
            onChange={this.setSearchText.bind(this)}
          />
        </View>
        <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData) => this.renderRow(rowData)}
            enableEmptySections={true}
          />
      </View>
    )
  }
}

// ListCom.propType = {
//   apiLink: React.PropTypes.string,
//   navigator: React.PropTypes.object
// }
