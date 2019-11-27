import {Image, Text, TouchableHighlight, View, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native';
import React from 'react';
var Parser = require('expr-eval').Parser;
//import styles from './styles';


class eulersScreen extends React.Component {


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

      //f(x, y) = x + 2y
      // h = .25
      //y(0) = 0
      //xo = 0
      //yo = 0

      //step 1
      //x1 = xo + h
      //x1 = 0 + 0.25
      //x1 = 0.25
      let stepNum = 0;
      let x = 0;
      let y = 0;

      let step = parseFloat(this.state.step);
      let initial = parseFloat(this.state.initial);
      let statey = parseFloat(this.state.y);
      let final = parseFloat(this.state.final);


      //y1 = yo + h f(xo, yo)
      //y1 = yo + h (xo + 2yo)
      //y1 = 0 + 0.25 (0 + 2*0)
      //y1 = 0

      //step 2
      //x2 = x1 + h
      //x2 = 0.25 + 0.25
      //x2 = 0.5

      //y2 = y1 + h f(x1, y1)
      //y2 = y1 + h (x1 + 2y1)
      //y2 = 0 + 0.25 (0.25 + 2*0)
      //y2 = 0.0625


      /*console.log('initial', initial);
      console.log('final', final);
      console.log('step', step);
      console.log('statey', statey);
      console.log('stepNum', stepNum);*/

      let func = this.state.func;
      let parser = new Parser();
      let expr = parser.parse(func);
      //console.log('here here here', expr.evaluate({ x: 3, y:  })); // 7

      try {
        let som = Math.abs(final - statey);
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
              y = statey + step * (expr.evaluate({ x: initial, y: statey })); // if first iteration, set -> y = y(0) + h f(x0, y0)
            } catch (error) {
              alert(error + "This often happens when your function is not correct syntactically");
              // expected output: ReferenceError: nonExistentFunction is not defined
              // Note - error messages will vary depending on browser
            }
            //y = statey + step * (initial * statey);
          } else {
            /*console.log('init * state', (x * y));
            console.log('x', x);
            console.log('y', y);*/
            try {
              y = y + step * (expr.evaluate({x: x - step, y: y})); // otherwise y = y(stepNum) + h f(x(stepNum)y(stepNum))
              //y = y + step * ((x - step) * y);
            } catch (error) {
              alert(error + "This often happens when your function is not correct syntactically");
              // expected output: ReferenceError: nonExistentFunction is not defined
              // Note - error messages will vary depending on browser
            }
          }
          /*console.log('stepNum ', stepNum);
          console.log('y = ', y);
          console.log('x = ', x);*/
          //accum = this.state.accum;
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
              <Text style={{marginTop: '20%', fontWeight: 'bold', fontSize: 18}}>Eulers Method</Text>
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

export default eulersScreen;
