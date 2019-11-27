import React, {Component} from 'react';
import {Image, Text, TouchableHighlight, View, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
var Parser = require('expr-eval').Parser;
//import styles from './styles';


class ImprovedEulersScreen extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      func: '',
      step: 0,
      initial: 0,
      y: 0,
      final: 0,
      exec: false,
      accum: [],
    };
  }

  solve = () => {

    if(this.state.step === 0){
      alert('Please enter a step size')
    }
    else if(this.state.func === ''){
      alert('Please enter a function')
    }
    else if(this.state.final === 0){
      alert('Please enter y( )')
    }
    else if(this.state.initial >= this.state.final){
      alert('Initial condition must be less than y()')
    }
    else {
      let accum = [];
      let stepNum = 0;
      let x = 0;
      let yNino = 0;
      let y = 0;

      let step = parseFloat(this.state.step);
      let initial = parseFloat(this.state.initial);
      let statey = parseFloat(this.state.y);
      let final = parseFloat(this.state.final);


      let func = this.state.func;
      let parser = new Parser();
      let expr = parser.parse(func);

      try {
        let som = Math.abs(final - initial);
        let num = som / step; // determines number of steps

        while (stepNum < num) {
          if (stepNum === 0) { //first iteration for x
            x = initial + step;
            console.log('itter one');
          } else {
            x += step; // second or more iteration for x
          }


          if (stepNum === 0) {
            try {
              yNino = statey + step * (expr.evaluate({ x: initial, y: statey })); // if first iteration, set -> y = y(0) + h f(x0, y0)
              y = statey + (step/2) * ((expr.evaluate({ x: initial, y: statey })) + (expr.evaluate({ x: x + step, y: yNino })));
            } catch (error) {
              alert(error + "This often happens when your function is not correct syntactically");
              // expected output: ReferenceError: nonExistentFunction is not defined
              // Note - error messages will vary depending on browser
            }
            //y = statey + step * (initial * statey);
          } else {
            try {
              yNino = y + step * (expr.evaluate({x: x - step, y: y}));
              let temp = y;
              y = temp + (step/2) * ((expr.evaluate({x: x - step, y: y})) + (expr.evaluate({x: x, y: yNino}))); // otherwise y = y(stepNum) + h f(x(stepNum)y(stepNum))\
            } catch (error) {
              alert(error + "This often happens when your function is not correct syntactically");
              // expected output: ReferenceError: nonExistentFunction is not defined
              // Note - error messages will vary depending on browser
            }
          }
          accum.push({
            step: stepNum + 1,
            x: x,
            y: y,
          });
          stepNum++;
        }
      } catch (error) {
        alert(error + "This often happens when your function is not correct syntactically");
        // expected output: ReferenceError: nonExistentFunction is not defined
        // Note - error messages will vary depending on browser
      }
      this.setState({accum});
      this.setState({exec: true});
    }
  };

  goBak = () => {

    this.setState({exec: false})
  };

  render() {
    let {func, step, initial, y, final} = this.state;
    return (
      <KeyboardAvoidingView behavior={Platform.select({android: undefined, ios: 'padding'})} >
        {!this.state.exec && (
          <ScrollView style={{height: '100%'}}>
            <TouchableHighlight onPress={() => this.props.navigation.goBack()} style={{ marginLeft: '5%', marginTop: '5%' }}>
              <Image
                source={require("../../assets/back.jpg")}
              />
            </TouchableHighlight>
            <View style={{alignItems: 'center'}}>
              <Text style={{marginTop: '20%', fontWeight: 'bold', fontSize: 18}}>Improved Euler</Text>
              <Text>Enter a function: y′=f(x,y) in terms of x and y only </Text>
              <Text>Note: Multiplication is not implied, please use an asterisk.</Text>
              <Text>Example: 3x+y should be 3*x+y.</Text>
              <Text>Note: Enter trig function with parens. Example-> cos(x)</Text>
              <TextInput
                style={{
                  width: '90%',
                  height: '7%',
                  marginTop: 10,
                  marginBottom: 10,
                  borderRadius: 4,
                  borderWidth: 0.5,
                  borderColor: '#000000'}}
                placeholder=" Function"
                onChangeText={func => this.setState({func: func.toLowerCase()})}
                value={String(this.state.func)}  /// parse input as a string
              />
              <Text>Enter step size </Text>
              <TextInput
                style={{
                  width: '90%',
                  height: '7%',
                  marginTop: 10,
                  marginBottom: 10,
                  borderRadius: 4,
                  borderWidth: 0.5,
                  borderColor: '#000000'}}
                placeholder=" h= "
                onChangeText={step => this.setState({step})}
                value={String(this.state.step)}
              />
              <Text>Enter initial condition </Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text>y( </Text>
                <TextInput
                  style={{
                    width: '5%',
                    height: '60%',
                    //marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: '#000000'}}
                  placeholder="  "
                  onChangeText={initial => this.setState({initial})}
                  value={String(this.state.initial)}
                />
                <Text> ) = </Text>
                <TextInput
                  style={{
                    width: '30%',
                    height: '60%',
                    //marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: '#000000'}}
                  placeholder="  "
                  onChangeText={y => this.setState({y})}
                  value={String(this.state.y)}
                />
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <Text>Find y( </Text>
                <TextInput
                  style={{
                    width: '15%',
                    height: '60%',
                    //marginTop: 10,
                    marginBottom: 10,
                    borderRadius: 4,
                    borderWidth: 0.5,
                    borderColor: '#000000'}}
                  placeholder="  "
                  onChangeText={final => this.setState({final})}
                  value={String(this.state.final)}
                />
                <Text> ) </Text>
              </View>
              <TouchableHighlight onPress={this.solve} style={{marginTop: 20, backgroundColor: 'gray'}}>
                <Text style={{
                  padding: 3,
                  borderRadius: 4,
                  borderWidth: 0.5,
                  borderColor: '#000000'}}>Execute</Text>
              </TouchableHighlight>
            </View>
          </ScrollView>
        )}
        {this.state.exec && (
          <View style={{height: '100%'}}>
            <View style={{flexDirection: 'row', paddingLeft: '5%', paddingTop: '5%' }}>
              <TouchableHighlight onPress={this.goBak} style={{ marginRight: '15%' }}>
                <Image
                  source={require("../../assets/back.jpg")}
                />
              </TouchableHighlight>
              <View>
                <Text style={{fontSize: 18}}>Solution</Text>
              </View>
            </View>
            <ScrollView style={{ marginTop: '7%'}}>
              {
                this.state.accum.map(step => {
                  return(
                    <View>
                      <View style={{marginBottom: '2%'}}>
                        <Text style={{fontWeight: 'bold'}}>Step Number = {step.step}</Text>
                      </View>
                      <Text>x = {step.x}</Text>
                      <Text>y = {step.y}</Text>
                    </View>
                  )
                })
              }
            </ScrollView>
          </View>
        )}
      </KeyboardAvoidingView>
    );
  }
}

export default ImprovedEulersScreen;
