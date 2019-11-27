import React, { Component } from 'react';
import {Text, TouchableHighlight, View, ImageBackground, StyleSheet, Dimensions} from 'react-native';
import MatrixModal from '../components/matrixModal';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class HomeScreen extends Component {

  state={
    modalVisible: false,
  };

  changeModal = () => {
    this.setState({modalVisible: true});
  };

  render() {
    return (
      <ImageBackground
        style={{ flex: 1, justifyContent: "center", alignItems: "center"}}
        resizeMode="stretch"
        source={require("../../assets/math.jpeg")}>
{/*
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#BABABA' }}>
*/}
        <Text style={{fontWeight: 'bold', fontSize: 24, color: 'white'}}>Methods to calculate your equation</Text>
        <TouchableHighlight onPress={() => {this.props.navigation.navigate("Eulers")}} style={styles.button}>
          <Text style={{fontSize: 18}}>Eulers</Text>
        </TouchableHighlight>
        {/*<TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate("Runge")}>
          <Text style={{fontSize: 18}}>Runga-Kutta</Text>
        </TouchableHighlight>*/}
        <TouchableHighlight style={styles.button} onPress={() => this.props.navigation.navigate("ImprovedEuler")}>
          <Text style={{fontSize: 18}}>Improved Euler</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={() => {this.props.navigation.navigate("Laplace")}}>
          <Text style={{fontSize: 18}}>Laplace Table</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button} onPress={this.changeModal}>
          <Text style={{fontSize: 18}}>Matrix Solver</Text>
        </TouchableHighlight>
        <MatrixModal visible={this.state.modalVisible} close={() => this.setState({modalVisible: false})} navigation={this.props.navigation}/>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#bfbeba",
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


