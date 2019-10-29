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

      customerName: '',
      identityNumber: '',
      phoneNumber: '',
      image: 'https://forums.steamrep.com/data/avatars/l/70/70889.jpg?1420358208',

      id: '',


      dataCustomers: []
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

  componentDidMount(){
    this.onLoad();
  }

  onLoad = () => {
    Axios.get(`http://192.168.1.22:5000/api/v2/customers`).then(res => {
      console.log( '++++++++++++++++++++++++++++++++++++', res.data)
      this.setState({
        dataCustomers:res.data
      })
    })
  }

  render(){
      console.log('>>>>>>>>>>>>>',this.state.dataCustomers)
      return(
      <View>
        <View>
          <View>
            <View>
              <TouchableOpacity onPress={() => this.refs.AddCustomer.open()} style={{backgroundColor: 'green', height: 50, marginHorizontal: 5, borderRadius:3, marginVertical: 5, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 16, fontWeight: 'bold', color: "#FFF"}}>Add Customer</Text>
              </TouchableOpacity>
            </View>
            <FlatList data={this.state.dataCustomers} keyExtractor={(item, index) => index} renderItem={({ item: rowData }) => {
              return(
                <TouchableOpacity onPress={() => this.handleOpenEditCustomer(rowData.id, rowData.name, rowData.identity_number, rowData.phone_number)}>
                  <View style={styles.customerContainer}>
                    <View>
                        <Image source={{uri:rowData.image}} style ={{height: 120, width: 120, borderRadius: 100}} />
                    </View>
                    <View style={{ justifyContent: 'center', marginLeft: 15 }}>
                      <Text style={styles.textCustomer}>
                          {rowData.name}
                      </Text>
                      <Text style={styles.textCustomer}>
                          {rowData.identity_number}
                      </Text>
                      <Text style={styles.textCustomer}>
                          {rowData.phone_number}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
              }}
            />


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
  customerContainer: {
    marginHorizontal: 10, 
    marginVertical: 15, 
    flexDirection: 'row', 
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
  textCustomer: {
    textTransform: 'capitalize', 
    fontWeight: 'bold',
    fontSize: 16
  }
});