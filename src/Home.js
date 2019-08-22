import React from "react";
import { View, Platform, Text, StyleSheet } from "react-native";
import MapView from 'react-native-maps';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Marker } from 'react-native-maps';


export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
            errorMessage: null,
          };
        }

    componentWillMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
          this.setState({
            errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
          });
        } else {
          this._getLocationAsync();
        }
      }
    
      _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
          this.setState({
            errorMessage: 'Permission to access location was denied',
          });
        }
    
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
      };
      
    render() {

        let cord = this.state.location;
        let text = 'Waiting..';
        if (this.state.errorMessage) {
            console.log(this.state.errorMessage);
             text = this.state.errorMessage;
          } else if (this.state.location) {
            console.log(this.state.location);    
             text = JSON.stringify(this.state.location);
          }
      return (
        <View style ={styles.container}>
            <Text>{text}</Text>
            {
                cord?
                <MapView
          style={styles.map}
        >
        <Marker
      coordinate={{latitude:cord.latitude, longitude:cord.longitude}}
      title={"dgssdgs"}
      description={"test"}
      />
        </MapView> : <Text>Waiting..</Text>
            }
            
        {/* <MapView
          style={styles.map}
          region={{
            latitude: cord.latitude,
            longitude: cord.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView> */}
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