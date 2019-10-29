/*Example to Make Different Type of Modal Box*/
import React from 'react';
//import React
 
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
} from 'react-native';
//import React Native Component
 
import Modal from 'react-native-modalbox';
//import Modal for different modal box
 
var screen = Dimensions.get('window');
//Screen Dimention for list width used below
 
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
    };
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
 
  renderList() {
    //function to return List (To show on Modal)
    var list = [];
    for (var i = 0; i < 50; i++) {
      list.push(
        <Text style={styles.text} key={i}>
          Item {i}
        </Text>
      );
    }
    return list;
  }
 
  render() {
    var BContent = (
      //Close button component
      <TouchableOpacity
        style={styles.button}
        onPress={() => this.setState({ isOpen: false })}>
        <Text style={styles.buttonText}>x</Text>
      </TouchableOpacity>
    );
 
    return (
      <View style={styles.wrapper}>
        <Text style={styles.text}>Example of Different Type of Modal</Text>
 
        {/*Button to open Basic Modal which is modal1 in this example*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.refs.modal1.open()}>
          <Text style={styles.buttonText}>Open Basic modal</Text>
        </TouchableOpacity>
 
        {/*Button to open Top Location Modal which is modal2 in this example*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.refs.modal2.open()}>
          <Text style={styles.buttonText}>Open Top Modal</Text>
        </TouchableOpacity>
 
        {/*Button to open Canter Location with cancel disable/enable Modal which is modal3 in this example*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.refs.modal3.open()}>
          <Text style={styles.buttonText}>
            Open Center Modal + disable
          </Text>
        </TouchableOpacity>
 
        {/*Button to open Bottom Modal which is modal4 in this example*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.refs.modal4.open()}>
          <Text style={styles.buttonText}>
            Open Bottom Model
          </Text>
        </TouchableOpacity>
 
        {/*Button to open/close using state*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.setState({ isOpen: true })}>
          <Text style={styles.buttonText}>
            Open Close Modal using state
          </Text>
        </TouchableOpacity>
 
        {/*Button to open Bottom Modal with Scrollview which is modal6 in this example*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.refs.modal6.open()}>
          <Text style={styles.buttonText}>Open Bottom Modal + ScrollView</Text>
        </TouchableOpacity>
 
        {/*Button to open Modal with Text Input which is modal7 in this example*/}
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.refs.modal7.open()}>
          <Text style={styles.buttonText}>Open Modal with Input + Keyboard</Text>
        </TouchableOpacity>
 
        {/*Basic Modal*/}
        <Modal
          style={[styles.modal, styles.modal1]}
          ref={'modal1'}
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          onClosingState={this.onClosingState}>
          <Text style={styles.text}>
            This is a Basic modal. Please tab to close
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.setState({ swipeToClose: !this.state.swipeToClose })
            }>
            <Text style={styles.buttonText}>
              Disable swipeToClose({this.state.swipeToClose ? 'true' : 'false'})
            </Text>
          </TouchableOpacity>
        </Modal>
 
        {/*Top Location Modal*/}
        <Modal
          style={[styles.modal, styles.modal2]}
          backdrop={false}
          position={'top'}
          ref={'modal2'}>
          <Text style={[styles.text, { color: 'white' }]}>Modal on top</Text>
        </Modal>
 
        {/*Canter Location with cancel disable/enable*/}
        <Modal
          style={[styles.modal, styles.modal3]}
          position={'center'}
          ref={'modal3'}
          isDisabled={this.state.isDisabled}>
          <Text style={styles.text}>Modal centered</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              this.setState({ isDisabled: !this.state.isDisabled })
            }>
            <Text style={styles.buttonText}>
              Disable ({this.state.isDisabled ? 'true' : 'false'})
            </Text>
          </TouchableOpacity>
        </Modal>
 
        {/*Bottom Modal*/}
        <Modal
          style={[styles.modal, styles.modal4]}
          position={'bottom'}
          ref={'modal4'}>
          <Text style={styles.text}>Bottom Modal</Text>
        </Modal>
 
        {/*Modal with state to Open/Close*/}
        <Modal
          isOpen={this.state.isOpen}
          onClosed={() => this.setState({ isOpen: false })}
          style={[styles.modal, styles.modal4]}
          position={'center'}
          backdropContent={BContent}>
          <Text style={styles.text}>Modal with backdrop content</Text>
        </Modal>
 
        {/*Bottom Modal with List*/}
        <Modal
          style={[styles.modal, styles.modal4]}
          position={'bottom'}
          ref={'modal6'}
          swipeArea={20}>
          <ScrollView>
            <View style={{ width: screen.width, paddingLeft: 10 }}>
              {this.renderList()}
            </View>
          </ScrollView>
        </Modal>
 
        {/*Modal with TextInput*/}
        <Modal
          ref={'modal7'}
          style={[styles.modal, styles.modal4]}
          position={'center'}>
          <View>
            <Text style={styles.text}>
              Text Input in Modal
            </Text>
            <TextInput
              placeholder="Enter Name"
              style={{ 
                height: 50, 
                width: 200, 
                backgroundColor: '#DDDDDD',
                marginTop:16
              }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}
 
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
  modal2: {
    height: 230,
    backgroundColor: 'orange',
  },
  modal3: {
    height: 300,
    width: 300,
  },
  modal4: {
    height: 300,
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