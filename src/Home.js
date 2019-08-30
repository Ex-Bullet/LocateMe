import React from "react";
import { View, Platform, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import axios from 'axios';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pn: this.props.navigation.getParam('pn'),
            lat: this.props.navigation.getParam('lat'),
            lng: this.props.navigation.getParam('lng'),
            users: null
          }
        }
      
        componentDidMount () {
            axios.get('https://locatemeapi.herokuapp.com/all')
            .then(res => {
              this.setState({users: res.data});
              console.log(this.state.users);
              
            })
        }


    render() {
      return (
        
        <View style ={styles.container}>
        <MapView style={styles.map}>
        <MapView
          initialRegion={{
            latitude: this.state.lat,
            longitude: this.state.lng,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05
          }}
          />
          <Circle
          center={{ latitude: this.state.lat, longitude: this.state.lng}}
          radius={1000}
        />
        <Marker
      coordinate={{
        latitude: this.state.lat,
        longitude: this.state.lng
      }}
      title="Ma position"
      />
      {/* {this.state.users.map(user => (
        <Marker
          coordinate={{
            latitude: user.lat,
            longitude: user.lng
          }}
          
        />
      ))} */}
        </MapView>
        
      </View>
      );
    }
  }




const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%'
  },
});