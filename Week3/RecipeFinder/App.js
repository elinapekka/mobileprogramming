import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicator, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = () => { 
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => {
      if(!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
      return response.json();
    })
    .then(response => {
      setRepositories(response.meals);
      setKeyword('');
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }

  const itemSeparator = () => {
    return(
      <View style={{
        backgroundColor: 'black', 
        height: 1, 
        //marginTop: 5, 
        marginBottom: 5,
      }}>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );

  } else {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <TextInput
            style={styles.inputField}
            placeholder='Type keyword'
            value={keyword}
            onChangeText={text => setKeyword(text)}
          />
          <Button 
            title="Search" 
            onPress={fetchRepositories} 
          />
        </View>

        <View style={{flex: 6, width: '90%'}}>
          <FlatList 
            ItemSeparatorComponent={itemSeparator}
            data={repositories}
            renderItem={({ item }) => 
              <View style={{flexDirection: "row", alignItems: "center", }}>
                <Image
                  style={styles.images}
                  source={{uri: item.strMealThumb}}
                />
                <Text style={styles.foodTitle}>{item.strMeal}</Text>
              </View>
            }
          />
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    width: "30%",
    height: 100,
  },
  foodTitle: {
    paddingLeft: 10,
    fontSize: 16,
  },
  search: {
    flex: 1, 
    marginTop: "20%", 
    flexDirection: "row", 
    alignItems: "center",
    justifyContent: "center",
    width: "100%",

  },
  inputField: {
    borderWidth: 1, 
    borderColor: 'black', 
    width: 200, 
    height: 27, 
    fontSize: 15,
    backgroundColor: "white",
  }
});
