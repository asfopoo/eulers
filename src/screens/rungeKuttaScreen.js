import {
  Image,
  Text,
  TouchableHighlight,
  View,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground, StyleSheet,
} from 'react-native';
import React, {Component} from 'react';

export default class RungeKuttaScreen extends Component {
  render() {
    return (
        <View>
          <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={{ marginLeft: '5%', marginTop: '5%' }}>
            <Image
              source={require("../../assets/back.jpg")}
            />
          </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(203,215,221)",
    alignItems: "center",
    borderRadius: 20,
    width: '50%',
    paddingVertical: 3,
    borderColor: '#000000',
    marginTop: '4%',
    elevation: 2,
    shadowOffset: {height: 1, width: 1}
  },
});
