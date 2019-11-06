import React, {Component} from 'react';
import {Text} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';

import RoomScreen from '../screens/RoomScreen';
import CheckInScreen from '../screens/CheckInScreen';
import CustomerScreen from '../screens/CustomerScreen';
import SettingScreen from '../screens/SettingScreen';

const RoomStack = createStackNavigator({
  RoomStack: {
    screen: RoomScreen,
    navigationOptions: {
      title: 'ROOMS',
      headerStyle: {
        backgroundColor: '#32ff7e',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1,
      },
    },
  },
});

const CheckInStack = createStackNavigator({
  CheckInStack: {
    screen: CheckInScreen,
    navigationOptions: {
      title: 'CHECK IN',
      headerStyle: {
        backgroundColor: '#32ff7e',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1,
      },
    },
  },
});

const CustomerStack = createStackNavigator({
  CustomerStack: {
    screen: CustomerScreen,
    navigationOptions: {
      title: 'CUSTOMER',
      headerStyle: {
        backgroundColor: '#32ff7e',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1,
      },
    },
  },
});

const SettingStack = createStackNavigator({
  SettingStack: {
    screen: SettingScreen,
    navigationOptions: {
      title: 'SETTING',
      headerStyle: {
        backgroundColor: '#32ff7e',
      },
      headerTintColor: '#000000',
      headerTitleStyle: {
        fontWeight: 'bold',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        flexGrow: 1,
      },
    },
  },
});

const BottomTabNavigator = createBottomTabNavigator(
  {
    Room: {
      screen: RoomStack,
      navigationOptions: {
        header: null,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[
                focused ? {color: '#09CE61'} : {color: 'grey'},
                {textAlign: 'center', fontSize: 10},
              ]}>
              Rooms
            </Text>
          );
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon
              name="bed"
              style={focused ? {color: '#09CE61'} : {color: 'grey'}}
              size={23}
            />
          );
        },
      },
    },
    CheckIn: {
      screen: CheckInStack,
      navigationOptions: {
        header: null,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[
                focused ? {color: '#09CE61'} : {color: 'grey'},
                {textAlign: 'center', fontSize: 10},
              ]}>
              Check In
            </Text>
          );
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon
              name="calendar-check"
              style={focused ? {color: '#09CE61'} : {color: 'grey'}}
              size={23}
            />
          );
        },
      },
    },
    Customer: {
      screen: CustomerStack,
      navigationOptions: {
        header: null,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[
                focused ? {color: '#09CE61'} : {color: 'grey'},
                {textAlign: 'center', fontSize: 10},
              ]}>
              Customer
            </Text>
          );
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon
              name="user"
              style={focused ? {color: '#09CE61'} : {color: 'grey'}}
              size={23}
            />
          );
        },
      },
    },
    Setting: {
      screen: SettingScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: ({focused}) => {
          return (
            <Text
              style={[
                focused ? {color: '#09CE61'} : {color: 'grey'},
                {textAlign: 'center', fontSize: 10},
              ]}>
              Setting
            </Text>
          );
        },
        tabBarIcon: ({focused}) => {
          return (
            <Icon
              name="cog"
              style={focused ? {color: '#09CE61'} : {color: 'grey'}}
              size={23}
            />
          );
        },
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
