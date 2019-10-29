import {createStackNavigator} from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';

const MainNavigation = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
  Logout: {
    screen: LoginScreen,
    navigationOptions: {
      header: null,
    },
  },
});

export default MainNavigation;