import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {

  const [currentValue, setCurrentValue] = useState('');
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');

  const calculationMinus = () => {
    if (firstInput.length > 0 && secondInput.length > 0) {
      (isNaN(Number(firstInput)) || isNaN(Number(secondInput))) ? setCurrentValue("Not a number") : 
      setCurrentValue("Result: " + String(Number(firstInput) - Number(secondInput)));
    } else {
      setCurrentValue("Add numbers to both fields")
    }
  }

  const calculationPlus = () => {
    if (firstInput.length > 0 && secondInput.length > 0) {
      (isNaN(Number(firstInput)) || isNaN(Number(secondInput))) ? setCurrentValue("Not a number") : 
      setCurrentValue("Result: " + String(Number(firstInput) + Number(secondInput)));
    } else {
      setCurrentValue("Add numbers to both fields")
    }
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.result}>{currentValue}</Text>
      <TextInput 
        style={styles.input}
        onChangeText={input => setFirstInput(input)}
        inputMode='numeric'
      />
      <TextInput 
        style={styles.input}
        onChangeText={input => setSecondInput(input)}
        inputMode='numeric'
      />
      <View style={styles.buttons}>
        <Button size='xl' title='+' style={{}} onPress={calculationPlus}/>
        <Button size='xl' color='red' title='-' onPress={calculationMinus} />        
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    fontSize: 20,
    borderColor: 'blue',
    borderWidth: 1,
  },
  buttons: {
    flexDirection: 'row',
    alignContent: 'space-around',
  },
  result: {
    fontSize: 15,
    padding: 10,
  }
});
