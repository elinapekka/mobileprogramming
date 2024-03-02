import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, View, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const [location, setLocation] = useState(null); // State where location is saved

  const [search, setSearch] = useState('');
  const [initial, setInitial] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221
  });
  const [markerTitle, setMarkerTitle] = useState('Haaga-Helia');
  const [coordinates, setCoordinates] = useState({latitude: 60.201373, longitude: 24.934041});

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to get location')
      return;
    }

    let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
    setLocation(location);
    console.log('Location:', location)
  };

  useEffect(() => {getLocation()}, []);


  const api =  process.env.EXPO_PUBLIC_API_URL;

  const fetchLocation = () => { 
    fetch(api + `/search?q=${search.replace(/ /g, '+')}&api_key=${process.env.EXPO_PUBLIC_API_KEY}`)
    .then(response => {
      if(!response.ok)
        throw new Error("Error in fetch: " + response.statusText);
      return response.json();
    })
    .then(response => {
      /*
      setInitial({
        latitude: response[0].boundingbox[0], 
        longitude: response[0].boundingbox[1], 
        latitudeDelta: response[0].boundingbox[2],
        longitudeDelta: response[0].boundingbox[3]
      });
      */
      setCoordinates({latitude: response[0].lat, longitude: response[0].lon});
      setMarkerTitle(search);
      setSearch('');
    })
    .catch(err => {
      console.error(err);
    });
  }


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initial}
      >
        <Marker
          coordinate={{latitude: coordinates.latitude, longitude: coordinates.longitude}}
          title={markerTitle}
        />
      </MapView>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          onChangeText={input => setSearch(input)}
        />
        <Button
          title="Search" 
          onPress={fetchLocation} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  search: {
    height: '10%',
    width: '100%',
  },
  input: {
    width: '100%',
    height: 30,
    fontSize: 25,
    borderWidth: 1,
    borderColor: 'black',
  }
});


/*

import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [location, setLocation] = useState('Haaga-Helia'); 
  const [coordinates, setCoordinates] = useState({longitude: 60.201373, latitude: 24.934041});

  return (
    <View style={styles.container}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: 60.200692,
          longitude: 24.934302,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221
        }}
      >
        <Marker 
          coordinate={coordinates}
          title={location}
        />
      </MapView>
      <TextInput
        style={styles.input}
        onChangeText={input => setLocation(input)}
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
  },
  input: {
    width: '100%',
    height: 30,
    fontSize: 25,
    borderWidth: 1,
    borderColor: 'black',
  }
});

*/