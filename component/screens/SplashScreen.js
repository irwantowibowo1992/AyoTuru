import React, {Component} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import logoImage from '../../image/bedtime.png';

class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />
        <Text style={styles.logoText}>AyoTuru</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#dff9fb'
  },
  logo: {
    height: 200,
    width: 200,
  },
  logoText: {
    fontFamily: 'Pacifico',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
    marginTop: 20,
  },
});

export default SplashScreen;
