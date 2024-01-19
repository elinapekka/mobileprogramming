import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {

  const [correctNumber, setCorrectNumber] = useState(0);
  const [inputNumber, setInputNumber] = useState('');
  const [output, setOutput] = useState("Guess number between 1-100");

  const guessNumber = () => {
    if (Number(inputNumber) == correctNumber) {
      openAlert();
      setOutput("Guess number between 1-100");
      setCorrectNumber(Math.floor(Math.random() * 100) + 1);

    } else if (Number(inputNumber) >= 1 && Number(inputNumber) <= 100) {
      (Number(inputNumber) > correctNumber) ? 
        setOutput("Lower than " + inputNumber) : 
        setOutput("Higher than " + inputNumber)

    } else {
      setOutput("Please enter number between 1 and 100")
    }
  };

  const openAlert = () => {
    Alert.alert("Congratulations!", inputNumber + " was correct!");
  }

  
  useEffect(() => {
    setCorrectNumber(Math.floor(Math.random() * 100) + 1);
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.output}>{output}</Text>
      <TextInput 
        style={styles.input} 
        inputMode='numeric'
        onChangeText={input => setInputNumber(input)}
      />
      <Button title="Guess" onPress={guessNumber} />
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
  output: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 10,
  }
});
