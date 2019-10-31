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
  Picker,
} from 'react-native';
import Axios from 'axios';

// require moment
const moment = require('moment');

// import Modal from 'react-native-modalbox';

class RoomScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false, //modal bawaan react-native
      checkInModalVisible: false,

      input: '', //handle Data input Add Room
      datacustomers: '',
      roomName: '',
      customerName: '',
      id: '',
      myToken: '',

      dataBookings: [],
      duration: '',
      checkInRoomId: '',
      checkInRoomName: '',
      userId: '0',
    };
  }

  // Handle Duration (Langkah 2 Menambah Durasi)
  handleDurationInput = text => {
    this.setState({
      duration: text,
    });
  };

  //   test Moment.js (Langkah 1 Menambah Durasi)
  difTime = () => {
    console.log('waktu hari ini : ' + moment().format('HH:mm'));
    console.log('penambahan waktu : ' + this.state.duration);

    // (Langkah 3 menambah Durasi)
    console.log(
      'End Time : ' +
        moment()
          .add(this.state.duration, 'minutes')
          .format('YYYY/MM/DD HH:mm:ss'),
    );
  };

  //ADD CHECKOUT HANDLE (Langkah 1 Add Check In Durasi)
  checkInAddBtnHandler = async id => {
    const data = {
      customrId: this.state.userId,
      roomId: this.state.checkInRoomId,
      isBooked: 1,
      isDone: 0,
      duration: this.state.duration,
      order_end_time: moment()
        .add(this.state.duration, 'minutes')
        .format('YYYY/MM/DD HH:mm:ss'),
    };

    const config = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.myToken}`,
      },
      data,
    };

    // console.log(data);

    await Axios(`http://192.168.1.22:5000/api/v2/booking`, config).then(res => {
      console.log(res.data);
      this.setCheckInModalVisible(false);
      this.onLoad();
    });
  };

  checkOutBtnHandler = async () => {
    const checkoutConfig = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.myToken}`,
      },
    };

    await Axios(
      `http://192.168.1.22:5000/api/v2/booking/${this.state.checkInRoomId}`,
      checkoutConfig,
    ).then(res => {
      this.setModalVisible(false);

      this.onLoad();
    });

    // console.log(
    //   `http://192.168.1.22:5000/api/v2/booking/${this.state.checkInRoomId}`,
    // );
  };

  //SHOW CHECK IN MODAL
  setCheckInModalVisible(visible, booking) {
    this.setState({
      editModalVisible: visible,
      id: booking ? booking.id : '',
      customerName: booking ? booking.name : '',
    });
  }

  setModalVisible(visible, roomId) {
    this.setState({
      modalVisible: visible,
      checkInRoomId: roomId,
    });
  }

  setCheckInModalVisible(visible, roomId, roomName) {
    this.setState({
      checkInModalVisible: visible,
      checkInRoomId: roomId,
      checkInRoomName: roomName,
    });
  }

  async componentDidMount() {
    this.setState({
      myToken: await AsyncStorage.getItem('myToken'),
    });
    this.onLoad();
  }

  getCostumerData = async () => {
    const costumerData = await Axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.myToken}`,
      },
      url: `http://192.168.1.22:5000/api/v2/customers`,
    });
    this.setState({
      dataCustomers: costumerData,
    });
  };

  onLoad = async () => {
    const bookingData = await Axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.myToken}`,
      },
      url: `http://192.168.1.22:5000/api/v2/bookings`,
    });

    const costumerData = await Axios({
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.myToken}`,
      },
      url: `http://192.168.1.22:5000/api/v2/customers`,
    });
    //   console.log('++++++++++++++++++++++++++++++++++++', res.data);
    await this.setState({
      dataBookings: bookingData.data,
      dataCustomers: costumerData.data,
    });

    //Mengambil data customer
    this.state.dataCustomers.map(x => {
      console.log('1111111111111111111111111111', x);
    });
  };

  render() {
    console.log('>>>>>>>>>>>>>', this.state.dataBookings);
    console.log('<><><><><><><>', this.state.dataBookings);

    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <View>
            <FlatList
              data={this.state.dataBookings}
              numColumns={3}
              keyExtractor={(item, index) => index}
              renderItem={({item: rowData}) => {
                // Styling Booking Room
                const bookStyle = {
                  width: 100,
                  height: 100,
                  justifyContent: 'center',
                  marginHorizontal: 10,
                  marginVertical: 15,
                };

                // Where Room Is Not Booked
                const bookAvail = {
                  backgroundColor: '#1b5e20',
                };

                // Where Room Is Booked
                const bookUnavail = {
                  backgroundColor: 'grey',
                };
                const bookRoomStyle = [
                  bookStyle,
                  rowData.booking && rowData.booking.isBooked
                    ? bookUnavail
                    : bookAvail,
                ];

                if (rowData.booking && rowData.booking.isBooked == true) {
                  return (
                    <TouchableOpacity
                      buttonDisabled={true}
                      onPress={() => this.setModalVisible(true, rowData.id)}>
                      <View style={bookRoomStyle}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              textTransform: 'capitalize',
                              fontWeight: 'bold',
                            }}>
                            {rowData.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                } else {
                  return (
                    <TouchableOpacity
                      buttonDisabled={true}
                      onPress={() =>
                        this.setCheckInModalVisible(
                          true,
                          rowData.id,
                          rowData.name,
                        )
                      }>
                      <View style={bookRoomStyle}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              textAlign: 'center',
                              textTransform: 'capitalize',
                              fontWeight: 'bold',
                            }}>
                            {rowData.name}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  );
                }
              }}
            />

            {/*MODAL CHECKOUT ROOM*/}
            <Modal
              animationType="slide"
              transparent={false}
              style={styles.modal}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                {/* <TextInput
                  onChangeText={room => this.setState({input: room})}
                  placeholder="Room Name"
                  style={styles.textInput}
                /> */}

                <Text>Ini Modal Checkout</Text>
              </View>
              <View>
                <TouchableOpacity onPress={() => this.checkOutBtnHandler()}>
                  <View style={styles.btnSave}>
                    <Text>Check Out</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.setModalVisible(false)}>
                  <View style={styles.btnCancel}>
                    <Text>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>

            {/*MODAL CHECKIN ROOM*/}
            <Modal
              animationType="slide"
              transparent={false}
              style={styles.modal}
              visible={this.state.checkInModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  onChangeText={room => this.setState({roomName: room})}
                  placeholder="Room Name"
                  value={this.state.checkInRoomName}
                  style={styles.textInput}
                />

                <Picker
                  selectedValue={this.state.userId}
                  style={{height: 50, width: '100%'}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({userId: itemValue})
                  }>
                  <Picker.Item label="Pilih User" value="0" />

                  {this.state.dataCustomers &&
                    this.state.dataCustomers.map(x => {
                      return <Picker.Item label={x['name']} value={x.id} />;
                    })}
                </Picker>

                <TextInput
                  onChangeText={text => this.handleDurationInput(text)}
                  placeholder="Duration (Minutes)"
                  value={this.state.duration}
                  style={styles.textInput}
                />
              </View>

              <Text>Ini Modal Checkin</Text>
              <View>
                <TouchableOpacity onPress={() => this.checkInAddBtnHandler()}>
                  <View style={styles.btnSave}>
                    <Text>CheckIn</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setCheckInModalVisible(false)}>
                  <View style={styles.btnCancel}>
                    <Text>Cancel</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    );
  }
}

export default RoomScreen;

const styles = StyleSheet.create({
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
