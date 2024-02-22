import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Converter() {

    const api =  process.env.EXPO_PUBLIC_API_URL;
    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.EXPO_PUBLIC_API_KEY);
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders,
    };

    const [euroInput, setEuroInput] = useState('');
    const [selectedCurrency, setSelectedCurrency] = useState();
    const [currencies, setCurrencies] = useState({});
    const [convertedEuros, setConvertedEuros] = useState('result');

    useEffect(() => {
        fetch(api + "/symbols", requestOptions)
        .then(response => {
            if(!response.ok)
                throw new Error("Error in fetch: " + response.statusText);
            return response.json();
            })
        .then(response => {
            setCurrencies(response.symbols);
        })
        .catch(err => {
            console.error(err);
        });
    }, []);


    const convertCurrencies = () => {
        fetch(api + '/convert?to=EUR&from=' + selectedCurrency + '&amount=' + euroInput, requestOptions)
        .then(response => {
          if(!response.ok)
            throw new Error("Error in fetch: " + response.statusText);
          return response.json();
        })
        .then(response => {
          setConvertedEuros((Math.round(response.result * 100) / 100).toFixed(2) + " €");
        })
        .catch(err => {
          console.error(err);
        });
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.result}>{convertedEuros}</Text>
            </View>
            <View style={styles.search}>
                <View style={{flexDirection:"row", alignItems: "center", justifyContent: "center"}}>
                <TextInput 
                    style={styles.input}
                    onChangeText={input => setEuroInput(input)}
                    inputMode='numeric'
                />
                <Picker
                    style={{ height: "auto", width: "35%" }} 
                    selectedValue={selectedCurrency}
                    onValueChange={(itemValue) => {
                        setSelectedCurrency(itemValue);
                    }
                }> 
                    { Object.keys(currencies).map(
                        currencyCode => (
                            <Picker.Item key={currencyCode} label={currencyCode} value={currencyCode} />
                        ))
                    }
                </Picker>
                </View>
            </View>
            <Button 
                title="Convert"
                onPress={convertCurrencies}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      //justifyContent: "center",
      paddingTop: "40%",
      alignItems: "center"

    },
    input: {
      width: "60%",
      height: 40,
      fontSize: 20,
      borderColor: 'blue',
      borderWidth: 1,
      textAlign: "center",
    },
    search: {
        width: "90%",
    },
    result: {
        fontSize: 30,
        padding: 20,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 25,
    }
});
  