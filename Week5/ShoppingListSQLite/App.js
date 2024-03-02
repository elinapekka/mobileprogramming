import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('shoppinglistdb.db');

export default function App() {

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState([]);

  const updateList = () => {
    db.transaction(tx => {
    tx.executeSql('SELECT * FROM ShoppingList;', [], (_, { rows }) =>
    setItems(rows._array)
    );
    }, null, null);
    setName('');
    setAmount('');
  }

  const saveItem = () => {
    db.transaction(tx => {
      tx.executeSql('INSERT INTO ShoppingList (name, amount) values (?, ?);',
      [name, amount]);
    }, null, updateList)      
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM ShoppingList WHERE id = ?;', [id]);
    }, null, updateList)
  }

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ShoppingList (id INTEGER PRIMARY KEY NOT NULL, name TEXT, amount TEXT);');
    }, () => console.error("Error when creating DB"), updateList);
  }, []); 


  const itemSeparator = () => {
    return(
      <View style={{
        backgroundColor: 'black', 
        height: 1, 
        marginTop: 5, 
        marginBottom: 5,
      }}>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add to shopping list</Text>
      <TextInput
        style={styles.input}
        placeholder='Name'
        onChangeText={name => setName(name)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder='Amount'
        onChangeText={amount => setAmount(amount)}
        value={amount}
      />
      <Button onPress={saveItem} title="Save" />

      <Text style={styles.title}>List</Text>
      <FlatList
        ItemSeparatorComponent={itemSeparator}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) =>
          <View style={styles.listContainer}>
            <Text style={styles.itemText}>{item.name}   {item.amount} </Text>
            <Button onPress={() => deleteItem(item.id)} title="bought"/>
          </View>
        }
        data={items}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  title: {
    fontSize: 20,
    paddingTop: 20,
    paddingBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    height: 30,
    width: "50%",
    borderWidth: 1,
    margin: 5,

  },
  listContainer: {
    width: '100%',
    margin: 5,
    fontSize: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 20,
    marginRight: 20,
  }
});
