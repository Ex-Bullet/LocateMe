import React from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pn: this.props.navigation.getParam('pn'),
            lnt: this.props.navigation.getParam('lnt'),
            lng: this.props.navigation.getParam('lng')
          };

        }
      // componentDidMount(){
      //   console.log(this.state.pn);
        
      // }
    render() {

      return (
        
        <View style ={styles.container}>
        <MapView style={styles.map}>
        <MapView
          initialRegion={{
            latitude: this.state.lnt,
            longitude: this.state.lng
          }}
          />
        <Marker
      coordinate={{
        latitude: this.state.lnt,
        longitude: this.state.lng
      }}
      title={"Ma position"}
      description={"test"}
      />

        </MapView>
            
      </View>
      );
    }
  }




const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});