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

// import Modal from 'react-native-modalbox';

class RoomScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false, //modal bawaan react-native
      checkInModalVisible: false,

      input: '', //handle Data input Add Room

      roomName: '',
      id: '',
      myToken: '',

      dataBookings: [],
    };
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setCheckInModalVisible(visible) {
    this.setState({checkInModalVisible: visible});
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
      url: `http://192.168.1.22:5000/api/v2/booking`,
    }).then(res => {
      console.log('++++++++++++++++++++++++++++++++++++', res.data);
      this.setState({
        dataBookings: res.data,
      });
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
                      onPress={() => this.setModalVisible(true, rowData)}>
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
                        this.setCheckInModalVisible(true, rowData)
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
                <TouchableOpacity onPress={() => this.postRoom()}>
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

            {/*MODAL CHECKIN ROOM*/}
            <Modal
              animationType="slide"
              transparent={false}
              style={styles.modal}
              visible={this.state.checkInModalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              {/* <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <TextInput
                  onChangeText={room => this.setState({roomName: room})}
                  placeholder="Room Name"
                  value={this.state.roomName}
                  style={styles.textInput}
                />
              </View> */}

              <Text>Ini Modal Checkin</Text>
              <View>
                <TouchableOpacity onPress={() => this.handleEditRoom()}>
                  <View style={styles.btnSave}>
                    <Text>Save</Text>
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
