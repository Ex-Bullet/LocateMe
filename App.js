import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from './src/Login';
import HomeScreen from './src/Home';


const MainNavigator = createStackNavigator({
  Login: {screen: LoginScreen},
  Home: {screen: HomeScreen}
});

const App = createAppContainer(MainNavigator);

export default App;