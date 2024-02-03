import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function History({route, navigation}) {

  const { historyData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.result}>History</Text>
      
      <View style={styles.history}>
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
