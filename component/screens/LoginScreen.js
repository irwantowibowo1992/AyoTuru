import React, {Component} from 'react';
import {Text, Form, Item, Input, Button, Icon} from 'native-base';
import {View, ImageBackground, Image, AsyncStorage} from 'react-native';
import Axios from 'axios';

import axios from '../../apiConfig.js';
import {stackNavigator} from 'react-navigation';

import RoomScreen from './RoomScreen';

//import bgImage from '../../image/bgImage.jpeg';
import Logo from '../../image/bedtime.png';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: 'eye-off',
      status: true,
      buttonDisabled: true,
      email: '',
      password: '',
    };
  }

  changeIcon = () => {
    this.setState({
      status: !this.state.status,
    });
  };

  emailValidator = email => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) == true) {
      this.setState({
        email,
        buttonDisabled: false,
      });
    } else {
      this.setState({
        email,
        buttonDisabled: true,
      });
    }
  };

  onLogin = () => {
    axios({
      method: 'POST',
      url: '/login',
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    }).then(res => {
      if (typeof res.data.token !== 'undefined') {
        console.log(res.data);
        AsyncStorage.setItem('myToken', res.data.token);
        AsyncStorage.setItem('id', JSON.stringify(res.data.id));

        this.props.navigation.navigate('Room');
      } else {
        alert('Ingat, Pembajakan bisa bikin Petani Makmur');
      }
      console.log(res.data.token);
    });
  };

  render() {
    //const { navigate } = this.props.navigation;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.containerTitle}>
          <View style={{marginBottom: 25}}>
            <Text style={{fontSize: 30, color: '#000'}}>Ayo Turu</Text>
          </View>
          <Image source={Logo} style={styles.logo} />
          <Text style={styles.titleText}>Login With Your Account</Text>
        </View>

        <Form style={styles.formInput}>
          <Item style={styles.pastContainer}>
            <Input
              placeholder="Email........"
              onChangeText={email => this.emailValidator(email)}
              placeholderTextColor="#000"
              style={styles.inputTxt}
            />
          </Item>

          <Item style={styles.pastContainer}>
            <Input
              secureTextEntry={this.state.status}
              onChangeText={pass => this.setState({password: pass})}
              placeholder="Password......."
              placeholderTextColor="#000"
              style={styles.inputTxt}
            />
            <Icon
              name={this.state.status ? 'eye' : 'eye-off'}
              onPress={() => this.changeIcon()}
              style={{marginRight: 10, color: '#000'}}
            />
          </Item>
        </Form>

        <Button
          success
          block
          disabled={this.state.buttonDisabled}
          style={styles.botton}
          onPress={() => this.onLogin()}>
          <Text>Login</Text>
        </Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#dff9fb',
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  containerTitle: {
    alignItems: 'center',
  },
  titleText: {
    color: '#000',
    marginTop: 20,
    marginBottom: 25,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'helvetica',
    textTransform: 'uppercase',
  },
  pastContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    height: 45,
    borderRadius: 25,
    fontSize: 18,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    marginRight: 15,
    marginTop: 10,
  },
  formInput: {
    marginRight: 15,
  },
  botton: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 30,
    marginLeft: 15,
    borderRadius: 25,
  },
  inputTxt: {
    color: '#000',
  },
};
