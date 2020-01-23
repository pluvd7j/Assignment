//import liraries
import React, { Component } from 'react';
import {
    createStackNavigator,
    NavigationActions,
    DrawerActions,
    createDrawerNavigator,
    createMaterialTopTabNavigator,createBottomTabNavigator
  } from "react-navigation";

//------------>Page Import<----------------\\

import Table from "./Src/Table";


// create a component
class Router extends Component {
    
    render() {
        const Router = createStackNavigator({  
          Table: {
            screen: Table,            
            navigationOptions: ({ navigation }) => ({
              title: "Table",
              // header:null,
              headerStyle: {
                backgroundColor: "#343C3F", 
                height: 48
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                // fontWeight: "Normal",
                fontSize: 18
              }
            })
          },
      },
      {
        initialRouteName: "Table"
      });
        return (
            <Router/>
        );
    }
}

//make this component available to the app
export default Router