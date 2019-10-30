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
  Modal,
} from 'react-native';
import Axios from 'axios';

class CustomerScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false, //modal bawaan react-native
      editModalVisible: false,

      customerName: '',
      identityNumber: '',
      phoneNumber: '',
      image:
        'https://forums.steamrep.com/data/avatars/l/70/70889.jpg?1420358208',

      id: '',
      myToken: '',

      dataCustomers: [],
    };
  }

  //SHOW MODAL
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  //SHOW EDIT MODAL
  setEditModalVisible(visible, customer) {
    this.setState({
      editModalVisible: visible,
      id: customer ? customer.id : '',
      customerName: customer ? customer.name : '',
      identityNumber: customer ? customer.identity_number : '',
      phoneNumber: customer ? customer.phone_number : '',
      image: customer ? customer.image : '',
    });
  }

  async componentDidMount() {
    this.setState({
      myToken: await AsyncStorage.getItem('myToken'),
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
      url: `http://192.168.1.22:5000/api/v2/customers`,
    }).then(res => {
      console.log('++++++++++++++++++++++++++++++++++++', res.data);
      this.setState({
        dataCustomers: res.data,
      });
    });
  };

  //FUNCTION ADD CUSTOMER
  postCustomer = async () => {
    await Axios({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.myToken}`,
      },
      url: 'http://192.168.1.22:5000/api/v2/customer',
      data: {
        name: this.state.customerName,
        identity_number: this.state.identityNumber,
        phone_number: this.state.phoneNumber,
        image: this.state.image,
      },
    })
      .then(res => {
        console.log(res);
        this.setModalVisible(false);
        this.onLoad();
      })
      .catch(err => {
        console.log(err);
      });
    // this.props.navigation.navigate('RoomScreen')
  };

  //FUNCTION EDIT CUSTOMER
  handleEditCustomer = async () => {
    await Axios({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.myToken}`,
      },
      url: `http://192.168.1.22:5000/api/v2/customer/${this.state.id}`,
      data: {
        name: this.state.customerName,
        identity_number: this.state.identityNumber,
        phone_number: this.state.phoneNumber,
      },
    })
      .then(res => {
        this.setEditModalVisible(false);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
    this.componentDidMount();
  };

  render() {
    console.log('>>>>>>>>>>>>>', this.state.dataCustomers);
    return (
      <View style={{flex: 1}}>
        <TouchableOpacity
          onPress={() => this.setModalVisible(true)}
          style={{
            backgroundColor: 'green',
            height: 50,
            marginHorizontal: 5,
            borderRadius: 3,
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#FFF'}}>
            Add Customer
          </Text>
        </TouchableOpacity>
        <FlatList
          data={this.state.dataCustomers}
          keyExtractor={(item, index) => index}
          renderItem={({item: rowData}) => {
            return (
              <TouchableOpacity
                onPress={() => this.setEditModalVisible(true, rowData)}>
                <View style={styles.customerContainer}>
                  <View>
                    <Image
                      source={{uri: rowData.image}}
                      style={{height: 100, width: 100, borderRadius: 100}}
                    />
                  </View>
                  <View style={{justifyContent: 'center', marginLeft: 15}}>
                    <Text style={styles.textCustomer}>{rowData.name}</Text>
                    <Text style={styles.textCustomer}>
                      {rowData.identity_number}
                    </Text>
                    <Text style={styles.textCustomer}>
                      {rowData.phone_number}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />

        {/*Modal Add Customer*/}
        <Modal
          animationType="slide"
          transparent={false}
          style={styles.modal}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              onChangeText={customerName => this.setState({customerName})}
              placeholder="Customer Name"
              style={styles.textInput}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={identityNumber => this.setState({identityNumber})}
              placeholder="Identity Number"
              style={styles.textInput}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={phoneNumber => this.setState({phoneNumber})}
              placeholder="Phone Number"
              style={styles.textInput}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => this.postCustomer()}>
              <View style={styles.btnSave}>
                <Text>Save</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setModalVisible(false)}>
              <View style={styles.btnCancel}>
                <Text>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>

        {/*Modal Edit Rooom*/}
        <Modal
          animationType="slide"
          transparent={false}
          style={styles.modal}
          visible={this.state.editModalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TextInput
              onChangeText={customerName => this.setState({customerName})}
              placeholder="Customer Name"
              value={this.state.customerName}
              style={styles.textInput}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={identityNumber => this.setState({identityNumber})}
              placeholder="Identity Number"
              value={this.state.identityNumber}
              style={styles.textInput}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={phoneNumber => this.setState({phoneNumber})}
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              style={styles.textInput}
            />
          </View>
          <View>
            <TouchableOpacity onPress={() => this.handleEditCustomer()}>
              <View style={styles.btnSave}>
                <Text>Save</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.setEditModalVisible(false)}>
              <View style={styles.btnCancel}>
                <Text>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>

        {/*Modal Edit Rooom*/}
        {/* <Modal
          ref={'EditCustomer'}
          style={[styles.modal, styles.modal4]}
          position={'center'}>
          <View>
            <TextInput
              onChangeText={customerName => this.setState({customerName})}
              placeholder="Customer Name"
              style={{
                height: 50,
                width: 250,
                backgroundColor: '#DDDDDD',
                marginTop: 16,
              }}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={identityNumber => this.setState({identityNumber})}
              placeholder="Identity Number"
              style={{
                height: 50,
                width: 250,
                backgroundColor: '#DDDDDD',
                marginTop: 16,
              }}
            />
            <TextInput
              keyboardType="numeric"
              onChangeText={phoneNumber => this.setState({phoneNumber})}
              placeholder="Phone Number"
              style={{
                height: 50,
                width: 250,
                backgroundColor: '#DDDDDD',
                marginTop: 16,
              }}
            />

            <TouchableOpacity onPress={() => this.handleEditCustomer()}>
              <View
                style={{
                  backgroundColor: '#387002',
                  marginTop: 20,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Save</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.refs.EditCustomer.close()}>
              <View
                style={{
                  backgroundColor: '#a30000',
                  marginTop: 20,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Modal> */}
      </View>
    );
  }
}

export default CustomerScreen;

const styles = StyleSheet.create({
  customerContainer: {
    marginHorizontal: 10,
    marginVertical: 15,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  textCustomer: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textInput: {
    height: 50,
    width: 325,
    backgroundColor: '#DDDDDD',
    marginTop: 16,
    textAlign: 'center',
  },

  btnSave: {
    backgroundColor: '#387002',
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },

  btnCancel: {
    backgroundColor: '#a30000',
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
});
