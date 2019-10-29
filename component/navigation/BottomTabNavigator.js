import React, { Component } from 'react'
import { Text } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/FontAwesome5'

import RoomScreen from '../screens/RoomScreen'
import CheckInScreen from '../screens/CheckInScreen'
import CustomerScreen from '../screens/CustomerScreen'
import SettingScreen from '../screens/SettingScreen'

// const RoomStack = createStackNavigator({
//   RoomStack: {
//     screen: RoomScreen,
//     navigationOptions: {
//       header: null
//     },
//   },
// });

const BottomTabNavigator = createBottomTabNavigator(
  {
    RoomScreen: {
      screen: RoomScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[focused ? {color: '#09CE61'} : {color: 'grey'}, { textAlign: 'center', fontSize: 10 }]}>
              Rooms
            </Text>
          )
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon
              name="bed"
              style={focused ? {color: '#09CE61'} : {color: 'grey'}}
              size={23} />
          )
        }
      },
    },
    CheckInScreen: {
      screen: CheckInScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[focused ? {color: '#09CE61'} : {color: 'grey'}, { textAlign: 'center', fontSize: 10 }]}>
              Check In
            </Text>
          )
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon
              name="calendar-check"
              style={focused ? {color: '#09CE61'} : {color: 'grey'}}
              size={23} />
          )
        }
      },
    },
    CustomerScreen: {
      screen: CustomerScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[focused ? {color: '#09CE61'} : {color: 'grey'}, { textAlign: 'center', fontSize: 10 }]}>
              Customer
            </Text>
          )
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon
              name="user"
              style={focused ? {color: '#09CE61'} : {color: 'grey'}}
              size={23} />
          )
        }
      },
    },
    SettingScreen: {
      screen: SettingScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[focused ? {color: '#09CE61'} : {color: 'grey'}, { textAlign: 'center', fontSize: 10 }]}>
              Setting
            </Text>
          )
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon
              name="cog"
              style={focused ? {color: '#09CE61'} : {color: 'grey'}}
              size={23} />
          )
        }
      },
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#000000',
      inactiveTintColor: '#777777',
      labelStyle: {
        fontSize: 12,
      },
      style: {
        backgroundColor: '#ffffff',
        borderBottomWidth: 0,
        padding: 5,

        borderTopWidth: 0,
        shadowOffset: {width: 9, height: 9},
        shadowColor: 'black',
        shadowOpacity: 0.5,
        elevation: 5,
      },
    },
  },
);
export default BottomTabNavigator;