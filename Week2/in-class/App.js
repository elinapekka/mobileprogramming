import { useState } from 'react'; 
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [item, setItem] = useState('');
  const [items, setItems] = useState([]);

  const handleAdd = () => {
    setItems([item, ...items]);
    setItem('');
  };

  const itemSeparator = () => {
    return(
      <View style={{backgroundColor: 'black', height: 1, }}>

      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 30, fontWeight:'bold'}}>Make a list</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10}}>
        <TextInput 
          style={{borderWidth: 1, borderColor: 'blue', width: 200, height: 27, fontSize: 15}}
          placeholder='text' 
          value={item}
          onChangeText={text => setItem(text)}
        />
        <Button title="Add Item" onPress={handleAdd} />
      </View>

      <View>
        <FlatList 
          data={items}
          ItemSeparatorComponent={itemSeparator}
          renderItem={({item}) => 
            <View style={styles.listItem}>
              <Text style={{fontSize: 15}}>Item: </Text>
              <Text style={{fontSize: 15}}>{item}</Text>
            </View>
          }
        />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 120,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    //backgroundColor: 'lightgray',
    padding: 5,
    width: 300,
    margin: 5,
    flexDirection: 'row',
  },
});
