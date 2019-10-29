import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import Axios from 'axios'

import Modal from 'react-native-modalbox';

class RoomScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
      // For Open and Close Modal
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,

      input: '', //handle Data input Add Room

      roomName: '',
      id: '',


      dataRooms: []
    }
  }

  onClose() {
    //called on modal closed
    console.log('Modal just closed');
  }
 
  onOpen() {
    //called on modal opened
    console.log('Modal just opened');
  }
 
  onClosingState(state) {
    //called on modal close/open of the swipe to close change
    console.log('Open/Close of the SwipeToClose just changed');
  }



  // componentDidMount(){
  //   this.fatchData()
  // }

  componentDidMount(){
    this.onLoad();
  }

  onLoad = () => {
    Axios.get(`http://192.168.1.22:5000/api/v2/rooms`).then(res => {
      console.log( '++++++++++++++++++++++++++++++++++++', res.data)
      this.setState({
        dataRooms:res.data
      })
    })
  }

  //Function Add Room
  postRoom = async () => {
    await Axios({
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.token}`,
      },
      url: 'http://192.168.1.22:5000/api/v2/room',
      data: {
        name: this.state.input,
      },
    })
      .then(res => {
        console.log(res);
        this.refs.AddRoom.close()
        // this.props.navigation.navigate('RoomScreen')
        this.onLoad();
      })
      .catch(err => {
        console.log(err);
      });
      // this.props.navigation.navigate('RoomScreen')
  };

  //Function Open Edit Room
  handleOpenEditRoom(id,name){
    // alert(id)
    this.refs.EditRoom.open()
    this.setState({id:id})
  }

  //Function Edit Room
  handleEditRoom = async () => {
    this.refs.EditRoom.close()
    await Axios({
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${this.state.token}`,
      },
      url: `http://192.168.1.22:5000/api/v2/room/${this.state.id}`,
      data: {
        name: this.state.roomName,
      },
    })
    .then(res => {
      console.log(res);
      // this.props.navigation.navigate('RoomScreen')
    })
    .catch(err => {
      console.log(err);
    });
    // this.props.navigation.navigate('RoomScreen')
    this.componentDidMount()
  }

  render(){
      console.log('>>>>>>>>>>>>>',this.state.dataRooms)
      return(
        <View>
          <View style={{alignItems: 'center'}}>
            <View>
              <View>
                  <TouchableOpacity onPress={() => this.refs.AddRoom.open()} style={{backgroundColor: 'green', height: 50, marginHorizontal: 10, marginVertical: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Add Room</Text>
                  </TouchableOpacity>
              </View>
              <FlatList data={this.state.dataRooms} numColumns={3} keyExtractor={(item, index) => index} renderItem={({ item: rowData }) => {
                return(
                  <TouchableOpacity buttonDisabled={true}  onPress={() => this.handleOpenEditRoom(rowData.id, rowData.name)}>
                    <View style={{ width: 100, height: 100, justifyContent: 'center', marginHorizontal: 10, marginVertical: 15, backgroundColor: "#1b5e20"}}>
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={{ textAlign: 'center', textTransform: 'capitalize', fontWeight: 'bold' }}>
                              {rowData.name}
                          </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
                }}
              />

              {/*Modal Add Rooom*/}
              <Modal
                ref={'AddRoom'}
                style={[styles.modal, styles.modal4]}
                position={'center'}>
                <View>
                  <TextInput onChangeText={room => this.setState({input: room})}
                    placeholder="Room Name"
                    style={{ 
                      height: 50, 
                      width: 250, 
                      backgroundColor: '#DDDDDD',
                      marginTop:16
                    }}
                  />

                  <TouchableOpacity onPress={() => this.postRoom()}>
                    <View style={{backgroundColor: "#387002", marginTop: 20, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Save</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.refs.AddRoom.close()}>
                    <View style={{backgroundColor: "#a30000", marginTop: 20, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Cancel</Text>
                    </View>
                  </TouchableOpacity>

                </View>
              </Modal>

              {/*Modal Edit Rooom*/}
              <Modal
                ref={'EditRoom'}
                style={[styles.modal, styles.modal4]}
                position={'center'}>
                <View>
                  <Text style={styles.text}>
                    Text Input in Modal
                  </Text>
                  <TextInput onChangeText={name => this.setState({roomName: name})}
                    placeholder="Room Name"
                    style={{ 
                      height: 50, 
                      width: 250, 
                      backgroundColor: '#DDDDDD',
                      marginTop:16
                    }}
                  />

                  <TouchableOpacity onPress={() => this.handleEditRoom()}>
                    <View style={{backgroundColor: "#387002", marginTop: 20, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Save</Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => this.refs.EditRoom.close()}>
                    <View style={{backgroundColor: "#a30000", marginTop: 20, height: 40, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Cancel</Text>
                    </View>
                  </TouchableOpacity>

                </View>
              </Modal>
            </View>
          </View>
        </View>
      )
  }
}

export default RoomScreen

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 50,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal4: {
    height: 300,
    width: 300,
  },
  text: {
    color: 'black',
    fontSize: 22,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'green',
    width: 300,
    marginTop: 16,
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    color: '#d0d0d0',
  },
});