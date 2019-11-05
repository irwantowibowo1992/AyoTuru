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
import FAB from 'react-native-fab';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Axios from 'axios';

// import Modal from 'react-native-modalbox';

class RoomScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false, //modal bawaan react-native
      editModalVisible: false,

      input: '', //handle Data input Add Room

      roomName: '',
      id: '',
      myToken: '',

      dataRooms: [],
    };
  }

  //function modal
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  setEditModalVisible(visible, room) {
    this.setState({
      editModalVisible: visible,
      id: room ? room.id : '',
      roomName: room ? room.name : '',
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
      url: `http://192.168.1.115:5000/api/v2/rooms`,
    }).then(res => {
      console.log('++++++++++++++++++++++++++++++++++++', res.data);
      this.setState({
        dataRooms: res.data,
      });
    });
  };

  //FUNCTION ADD ROOM
  postRoom = async () => {
    await Axios({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.myToken}`,
      },
      url: 'http://192.168.1.115:5000/api/v2/room',
      data: {
        name: this.state.input,
      },
    })
      .then(res => {
        console.log(res.data);
        this.setModalVisible(false);
        this.onLoad();
      })
      .catch(err => {
        console.log(err);
      });
  };

  //FUNCTION EDIT ROOM
  handleEditRoom = async () => {
    await Axios({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.myToken}`,
      },
      url: `http://192.168.1.115:5000/api/v2/room/${this.state.id}`,
      data: {
        name: this.state.roomName,
      },
    })
      .then(res => {
        console.log(res.data);
        this.setEditModalVisible(false);
        this.onLoad();
      })
      .catch(err => {
        this.setEditModalVisible(false);
        console.log(err.message);
      });
    this.componentDidMount();
  };

  render() {
    console.log('>>>>>>>>>>>>>', this.state.dataRooms);
    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <View>
            <FlatList
              data={this.state.dataRooms}
              numColumns={3}
              keyExtractor={(item, index) => index}
              renderItem={({item: rowData}) => {
                return (
                  <TouchableOpacity
                    buttonDisabled={true}
                    onPress={() => this.setEditModalVisible(true, rowData)}>
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        justifyContent: 'center',
                        marginHorizontal: 10,
                        marginVertical: 15,
                        backgroundColor: '#00b0ff',
                        borderRadius: 5,
                      }}>
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
              }}
            />

            <FAB
              buttonColor="#69e2ff"
              iconTextColor="#FFFFFF"
              onClickAction={() => this.setModalVisible(true)}
              visible={true}
              iconTextComponent={<Icon name="plus" />}
            />

            {/*Modal Add Rooom*/}
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
                  onChangeText={room => this.setState({input: room})}
                  placeholder="Room Name"
                  style={styles.textInput}
                />
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
                  onChangeText={room => this.setState({roomName: room})}
                  placeholder="Room Name"
                  value={this.state.roomName}
                  style={styles.textInput}
                />
              </View>
              <View>
                <TouchableOpacity onPress={() => this.handleEditRoom()}>
                  <View style={styles.btnSave}>
                    <Text>Save</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.setEditModalVisible(false)}>
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
    backgroundColor: '#64dd17',
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },

  btnCancel: {
    backgroundColor: '#ff3d00',
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    borderRadius: 5,
  },
});
