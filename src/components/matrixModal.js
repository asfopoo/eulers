import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, TextInput, KeyboardAvoidingView, Dimensions} from 'react-native';


const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;


class MatrixModal extends Component {

  state = {
    modalVisible: this.props.visible,
  };

  two = () => {
    this.props.close();
    this.props.navigation.navigate("TwoByTwo")
  };

  three = () => {
    this.props.close();
    this.props.navigation.navigate("ThreeByThree")
  };

  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{
            marginTop: 50,
            paddingTop: 130,
            backgroundColor: "#bfbeba",
            width: "90%",
            height: 500,
            margin: "5%",
            borderRadius: 20,
            shadowColor: "black",
            shadowOffset: {height: 2},
            shadowOpacity: 0.3,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{marginBottom: 40, fontSize: 18, fontWeight: 'bold'}}>Choose your matrix size</Text>
            <KeyboardAvoidingView>
              <View style={{flex: 1, flexDirection: 'column', alignContent: 'space-between', justifyContent: 'space-between', marginBottom: '53%'}}>
                <TouchableHighlight
                  onPress={this.three}
                  style={{
                    marginTop: '10%',
                    borderWidth: 1,
                    borderColor: "#ffffff",
                    borderRadius: 14,
                    paddingVertical: 6,
                    paddingHorizontal: 13,
                    alignItems: 'center',
                    marginBottom: 20
                    }}>
                  <Text>3 X 3</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={this.two}
                  style={{
                    marginTop: '10%',
                    borderWidth: 1,
                    borderColor: "#ffffff",
                    borderRadius: 14,
                    paddingVertical: 6,
                    paddingHorizontal: 13,
                    alignItems: 'center',
                    marginBottom: 20
                }}>
                  <Text>2 X 2</Text>
                </TouchableHighlight>
              </View>
              <View style={{marginTop: 30, marginBottom: 40}}>
                <TouchableHighlight
                  onPress={this.props.close} style={{
                  //marginTop: '20%',
                  borderWidth: 1,
                  borderColor: "#ffffff",
                  borderRadius: 14,
                  paddingVertical: 6,
                  paddingHorizontal: 13,
                  alignItems: 'center',
                  }}>
                  <Text>Cancel</Text>
                </TouchableHighlight>
              </View>
            </KeyboardAvoidingView>
          </View>
        </Modal>
      </View>
    );
  }
}

export default MatrixModal;
