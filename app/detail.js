import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  Animated,
 ScrollView,
 LayoutAnimation,
 TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Image from 'react-native-image-progress';
import * as Progress from 'react-native-progress';
import moment from 'moment';

export default class DetailCom extends Component {
  constructor() {
       super();
       this.state = {
         height: 200,
         line : 4,
         marginScroll: 450,
         loading: false,
       }
    }
    clickToOpen(){
      var height = this.state.height;
      var line = this.state.line;
      var marginScroll = this.state.marginScroll;
      if(height == 200){
        height = 50;
        line = 0
        marginScroll = 100
      }else{
        height = 200;
        line = 4
        marginScroll = 450
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      this.setState({
        height,
        line,
        marginScroll
      })
    }



  render(){
    var height = this.state.height;
    var line = this.state.line; // 0: will be showed all lines
    var marginScroll = this.state.marginScroll;
    var popularity = parseInt(this.props.popularity);
    var date = moment(this.props.date).format('ll');
    return(
       <View style={{flex: 1, marginTop: 30 }}>
         <Image source={{uri: "https://image.tmdb.org/t/p/original" + this.props.imageURL}}
         indicator={Progress.Circle}
         indicatorProps={{
             size: 80,
             borderWidth: 0,
             color: 'rgba(150, 150, 150, 1)',
             unfilledColor: 'rgba(200, 200, 200, 0.2)'
           }}
        style={{flex: 1}}>
        <View style={[styles.container,{marginTop: marginScroll}]}>
          <ScrollView
            style={{}}>
              <TouchableOpacity onPress={() => this.clickToOpen()}>
                <View style={[styles.page, {width:280, backgroundColor:'rgba(52, 52, 52, 0.9)', borderRadius: 10}]}>
                  <View style={{padding: 5}} numberOfLines={line}>
                    <Text style={[styles.text, {fontWeight: 'bold', fontSize: 22, marginBottom: 3}]}>
                      {this.props.title}
                    </Text>
                    <Text style={[styles.text]}>
                      <Icon name='ticket' size={15} color='#fff'/>
                      {date}
                    </Text>
                    <View style={{flexDirection:'row', marginTop: 3}}>
                        <Text style={styles.text}>
                          <Icon name='heart' size={15} color='#fff'/>
                          {this.props.vote}
                        </Text>
                        <Text style={[styles.text, {marginLeft: 200}]}>
                          <Icon name='commenting-o' size={15} color='#fff'/>
                          {popularity}
                        </Text>
                    </View>
                    <Text style={styles.text}>{this.props.overview}</Text>
                  </View>
                </View>
              </TouchableOpacity>
          </ScrollView>
        </View>
      </Image>
    </View>
    )
  }
}

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.0)',
    flexDirection: 'column-reverse',
    flex: 1,
  },
  page: {
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
  },
  text:{
    color: 'white',
    fontSize: 17
  }
})
