import {createStackNavigator} from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';

import BottomTabNavigator from './BottomTabNavigator';
import CheckInScreen from '../screens/CheckInScreen';

const UserRoute = createStackNavigator({
  BottomTabNavigator: {
    screen: BottomTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  
  CheckInScreen: {
    screen: CheckInScreen
  },
});

export default UserRoute;