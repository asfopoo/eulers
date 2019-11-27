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

export default class LaplaceScreen extends Component {
  render() {
    return (
      <ImageBackground
        style={{ flex: 1 }}
        resizeMode="stretch"
        source={require("../../assets/laplace.png")}>
        <View>
          <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={{ marginLeft: '5%', marginTop: '5%' }}>
            <Image
              source={require("../../assets/back.jpg")}
            />
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}
