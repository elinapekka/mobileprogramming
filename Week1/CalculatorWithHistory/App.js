import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {

  const [currentValue, setCurrentValue] = useState('');
  const [firstInput, setFirstInput] = useState('');
  const [secondInput, setSecondInput] = useState('');
  const [historyData, setHistoryData] = useState([]);

  const calculationMinus = () => {
    if (firstInput.length > 0 && secondInput.length > 0) {

      if(isNaN(Number(firstInput)) || isNaN(Number(secondInput))) {
        setCurrentValue("Not a number");
      } else {
        setCurrentValue(String(Number(firstInput) - Number(secondInput)));
        setHistoryData([(firstInput + ' - ' + secondInput + ' = ' + (Number(firstInput) - Number(secondInput))), ...historyData]);
      }

    } else {
      setCurrentValue("Add numbers to both fields")
    }
  }

  const calculationPlus = () => {
    if (firstInput.length > 0 && secondInput.length > 0) {

      if(isNaN(Number(firstInput)) || isNaN(Number(secondInput))) {
        setCurrentValue("Not a number");
      } else {
        setCurrentValue(String(Number(firstInput) + Number(secondInput)));
        setHistoryData([(firstInput + ' + ' + secondInput + ' = ' + (Number(firstInput) + Number(secondInput))), ...historyData]);
      }

    } else {
      setCurrentValue("Add numbers to both fields")
    }
  } 

  return (
    <View style={styles.container}>
      <Text style={styles.result}>Result: {currentValue}</Text>
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
        <Button title='+' style={{}} onPress={calculationPlus}/>
        <Button color='red' title='-' onPress={calculationMinus} />        
      </View>
      
      <View style={styles.history}>
        <Text>History:</Text>
        <FlatList data={historyData} renderItem={({item}) => <Text>{item}</Text>}/>
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
    alignContent: 'flex-start',
    justifyContent: 'flex-start',
  },
  input: {
    width: 200,
    height: 40,
    fontSize: 20,
    borderColor: 'blue',
    borderWidth: 1,
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    width: 200,
    margin: 10,
    justifyContent: 'space-evenly',
  },
  result: {
    fontSize: 25,
    padding: 10,
    marginTop: 100,
  },
  history: {
    fontSize: 15,
    flex: 1,
    alignItems: 'center',
  }
});
