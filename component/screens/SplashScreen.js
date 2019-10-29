import React, { Component } from 'react'
import { View, Image, StyleSheet } from 'react-native'

import logoImage from '../../image/ayoTuru.png'

class SplashScreen extends Component {
    render(){
        return(
            <View style={styles.container}>
                <Image source={logoImage} style={styles.logo} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default SplashScreen