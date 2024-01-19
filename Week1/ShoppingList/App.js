import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [shoppingItem, setShoppingItem] = useState('');
  const [shoppingList, setShoppingList] = useState([]);


  const addToShoppingList = () => {
    setShoppingList([...shoppingList, {key: shoppingItem}]);
    setShoppingItem('');
  }

  const clearShoppingList = () => {
    setShoppingList([]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.addItem}>
        <TextInput style={styles.input} onChangeText={input => setShoppingItem(input)}/>
        <Button title="Add" onPress={addToShoppingList} />
        <Button color='red' title="Clear" onPress={clearShoppingList}/>
      </View>
      <Text style={styles.title}>Shopping list</Text>
      <FlatList 
        style={styles.list}
        data={shoppingList}
        renderItem={ ({item}) => <Text style={styles.listItem}>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
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
    paddingTop: 90,
  },
  input: {
    width: '60%',
    height: 'auto',
    fontSize: 15,
    borderColor: 'blue',
    borderWidth: 1,
    marginTop: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15
  },
  addItem: {
    flexDirection: 'row',
    paddingBottom: 10,
    width: '100%',
    justifyContent: 'center',
  },
  list: {
    flex:1,
  },
  listItem: {
    fontSize: 17,
    paddingTop: 5,
  }
});
