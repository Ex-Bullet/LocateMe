import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text,
  Alert
} from "react-native";
import { Container, Item, Input, Icon, Button } from "native-base";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

const valide = /^(\+33\s[1-9]{8})|(0[1-9]\s{8})$/;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      location: null,
      errorMessage: null,
      lnt: null,
      latitude: null
    };
  }


  check = () => {

    let checks = valide.test(this.state.text);

    if (checks) {
      fetch("https://locatemeapi.herokuapp.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          phoneNumber: this.state.text,
          lat: this.state.location.coords.latitude,
          lng: this.state.location.coords.longitude
        })
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.props.navigation.navigate ('Home', {
            pn: this.state.text,
            lnt: this.state.lnt,
            lng: this.state.lng})
        })
        .catch((error) => {
          console.error(error);
        });
    }
    else {
      Alert.alert("error enculey")
    }
    // console.log(this.state.text);
    // console.log(this.state.location);
    // console.log(this.state.location.coords.latitude, this.state.location.coords.longitude);

};

  componentDidMount() {
    this._getloc();
  }

  _getloc = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
    this.setState({ lnt: location.coords.latitude});
    this.setState({lng: location.coords.longitude});

  };


  render() {
    
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="padding"
          enabled
        >
          <View style={{ alignItems: "center" }}>
            <Text>Locate Me</Text>
          </View>

          <TouchableWithoutFeedback
            style={styles.container}
            onPress={Keyboard.dismiss}
          >
            <View style={styles.container}>
              <Container style={styles.infoContainer}>
                <Item rounded style={styles.itemStyle}>
                  <Icon active name="call" style={styles.iconStyle} />
                  <Icon
                    active
                    name="md-arrow-dropdown"
                    style={[styles.iconStyle, { marginLeft: 0 }]}
                  />
                  <Input
                    placeholder="+33"
                    placeholderTextColor="#adb4bc"
                    keyboardType={"phone-pad"}
                    returnKeyType="done"
                    autoCapitalize="none"
                    maxLength={11}
                    autoCorrect={false}
                    secureTextEntry={false}
                    style={styles.inputStyle}
                    onChangeText={text => this.setState({ text })}
                    value={this.setState.text}
                  />
                </Item>
              </Container>
            </View>
          </TouchableWithoutFeedback>
          <View style={{ alignItems: "center" }}>
            <Button
              style={{
                width: 150,
                alignItems: "center",
                justifyContent: "center"
              }}
              primary
              onPress={this.check}
            >
              <Text style={{ fontWeight: "bold", color: "white" }}>
                CONTINUER
              </Text>
            </Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column"
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 200,
    bottom: 250,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30
  },
  iconStyle: {
    color: "#4285F4",
    fontSize: 28,
    marginLeft: 15
  },
  itemStyle: {
    marginBottom: 10
  },
  inputStyle: {
    flex: 1,
    fontSize: 17,
    fontWeight: "bold",
    color: "#212121"
  }
});
