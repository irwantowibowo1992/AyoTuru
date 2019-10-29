import React, { Component } from 'react'
import { View, Text, StyleSheet, Button, Image, FlatList, TouchableOpacity } from 'react-native'
import Axios from 'axios'

class RoomScreen extends Component {

  constructor(props){
    super(props)

    this.state = {
        dataRooms: []
    }
  }

  componentDidMount(){
    this.fatchData()
  }

  componentDidMount(){
    Axios.get(`http://192.168.1.22:5000/api/v2/rooms`).then(res => {
      console.log( '++++++++++++++++++++++++++++++++++++', res.data)
      this.setState({
        dataRooms:res.data
      })
    })
  }

  render(){
      console.log('>>>>>>>>>>>>>',this.state.dataRooms)
      return(
        <View>
          <View style={{alignItems: 'center'}}>
            <View>
              <View>
                  <TouchableOpacity style={{backgroundColor: 'green', height: 50, marginHorizontal: 5, marginVertical: 5, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold'}}>Add Room</Text>
                  </TouchableOpacity>
              </View>
              <FlatList data={this.state.dataRooms} numColumns={3} keyExtractor={(item, index) => index} renderItem={({ item: rowData }) => {
                return(
                  <TouchableOpacity buttonDisabled={true} >
                    <View style={{ width: 100, height: 100, justifyContent: 'center', marginHorizontal: 10, marginVertical: 15, backgroundColor: "green"}}>
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
            </View>
          </View>
        </View>
      )
  }
}

export default RoomScreen