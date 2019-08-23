import React, { Component } from "react";  
import { 
  View,
  StyleSheet, 
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Text
} from 'react-native';
import {
  Container,
  Item,
  Input,
  Icon,
  Button
} from 'native-base';

export default class LoginScreen extends React.Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <View style={{alignItems: 'center'}}>
            <Text>test</Text>
          </View>
          
          <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
              <Container style={styles.infoContainer}>
                <Item rounded style={styles.itemStyle}>
                  <Icon
                    active
                    name='call'
                    style={styles.iconStyle}
                  />
                  <Icon
                    active
                    name='md-arrow-dropdown'
                    style={[styles.iconStyle, { marginLeft: 0 }]}
                  />
                  <Input 
                    placeholder='+33'
                    placeholderTextColor='#adb4bc'
                    keyboardType={'phone-pad'}
                    returnKeyType='done'
                    autoCapitalize='none'
                    autoCorrect={false}
                    secureTextEntry={false}
                    style={styles.inputStyle}                   
                  />
                </Item>
              </Container>
            </View>
          </TouchableWithoutFeedback>
          <View style={{alignItems: 'center',}}>
        <Button style={{width:150, alignItems: 'center', justifyContent: 'center'}} primary onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={{fontWeight: "bold", color: 'white'}}>CONTINUER</Text>
            </Button>
        </View>
        </KeyboardAvoidingView>
        
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column'
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 200,
    bottom: 250,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  iconStyle: { 
    color: '#4285F4',
    fontSize: 28,
    marginLeft: 15
  },
  itemStyle: {
    marginBottom: 10,
  },
  inputStyle: {
    flex: 1,
    fontSize: 17,
    fontWeight: 'bold',
    color: '#212121',
  }
})