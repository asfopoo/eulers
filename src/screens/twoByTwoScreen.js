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

export default class TwoByTwoScreen extends Component {

  state = {
    oneOne: '',
    oneTwo: '',
    oneThree: '',
    twoOne: '',
    twoTwo: '',
    twoThree: '',
  };

  solve = () => {
    let sol = (this.state.oneOne * this.state.twoTwo) - (this.state.oneTwo * this.state.twoOne);
    alert("Solution = " + sol);
  };

  render() {
    return (
      <View style={{flex: 1, alignItems: "center"}}>
        <KeyboardAvoidingView style={{flex: 1, alignItems: "center"}}>
        <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={{ marginRight: '85%', marginTop: '5%' }}>
          <Image
            source={require("../../assets/back.jpg")}
          />
        </TouchableHighlight>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: '5%'}}>Calculate your determinant</Text>
          <View style={{ flexDirection: 'row', marginTop: '10%'}}>
            <TextInput
              style={styles.input}
              placeholder=" 1,1 "
              onChangeText={oneOne => this.setState({oneOne})}
              value={String(this.state.oneOne)}
            />
            <TextInput
              style={styles.input}
              placeholder=" 1,2 "
              onChangeText={oneTwo => this.setState({oneTwo})}
              value={String(this.state.oneTwo)}
            />
            <TextInput
              style={styles.input}
              placeholder=" 1,3 "
              onChangeText={oneThree => this.setState({oneThree})}
              value={String(this.state.oneThree)}
            />
          </View>
          <View style={{ flexDirection: 'row'}}>
            <TextInput
              style={styles.input}
              placeholder=" 2,1 "
              onChangeText={twoOne => this.setState({twoOne})}
              value={String(this.state.twoOne)}
            />
            <TextInput
              style={styles.input}
              placeholder=" 2,2 "
              onChangeText={twoTwo => this.setState({twoTwo})}
              value={String(this.state.twoTwo)}
            />
            <TextInput
              style={styles.input}
              placeholder=" 2,3 "
              onChangeText={twoThree => this.setState({twoThree})}
              value={String(this.state.twoThree)}
            />
          </View>
          <View style={{marginTop: '10%'}}>
            <TouchableHighlight style={styles.button} onPress={this.solve}>
              <Text style={{fontSize: 18}}>Calculate</Text>
            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "rgb(203,215,221)",
    alignItems: "center",
    borderRadius: 20,
    width: 110,
    height: '25%',
    paddingVertical: 3,
    borderColor: '#000000',
    marginTop: '4%',
    elevation: 2,
    shadowOffset: {height: 1, width: 1}
  },
  input: {
    width: '16%',
    height: '10%',
    marginTop: '10%',
    //marginBottom: 10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000000',
    alignContent: "center"
  }
});
