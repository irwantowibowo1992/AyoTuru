import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  FlatList,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from 'react-native';
import Axios from 'axios';
import {bold} from 'colorette';

class SettingScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      myToken: '',
      email: '',
      image: '',

      dataUsers: [],
    };
  }

  async componentDidMount() {
    this.setState({
      myToken: await AsyncStorage.getItem('myToken'),
      id: await AsyncStorage.getItem('id'),
    });
    this.onLoad();
  }

  onLoad = async () => {
    await Axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.myToken}`,
      },
      url: `http://192.168.1.22:5000/api/v2/user/${this.state.id}`,
    }).then(res => {
      console.log('++++++++++++++++++++++++++++++++++++', res.data.image);
      this.setState({
        image: res.data.image,
        email: res.data.email,
        name: res.data.name,
        // dataCustomers:res.data
      });
    });
  };

  render() {
    return (
      <View>
        <View style={styles.imageContainer}>
          <Image source={{uri: this.state.image}} style={styles.image} />
        </View>

        <View style={styles.profileText}>
          <Text style={styles.text}>{this.state.email}</Text>
          <Text style={styles.text}>{this.state.name}</Text>
        </View>

        <View style={styles.btnLogoutContainer}>
          <TouchableOpacity
            style={styles.btnLogout}
            onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 100,
  },
  profileText: {
    alignItems: 'center',
    marginVertical: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnLogoutContainer: {
    alignItems: 'center',
  },
  btnLogout: {
    backgroundColor: 'red',
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default SettingScreen;
