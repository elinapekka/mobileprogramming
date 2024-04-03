import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiIIdZCOlOff0yQQ37_kP0MC_lHx3SK2M",
  authDomain: "mycourses-a7b0b.firebaseapp.com",
  databaseURL: "https://mycourses-a7b0b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mycourses-a7b0b",
  storageBucket: "mycourses-a7b0b.appspot.com",
  messagingSenderId: "732162588087",
  appId: "1:732162588087:web:e9ba7abf3343a13b44fc32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export default function App() {
  const [course, setCourse] = useState({
    title: '',
    credits: ''
  });
  const [courses, setCourses] = useState([]);

  const handleSave = () => {
    push(ref(database, '/courses'), {course});  
    setCourse({
      title: '',
      credits: ''
    })
  }

  useEffect(() => {
    onValue(ref(database, '/courses'), snapshot => {
      const data = snapshot.val();
      setCourses(Object.values(data));
      console.log(Object.values(data));
      console.log(courses)
    })
  }, [])

  return (
    <View style={styles.container}>
      <TextInput 
      value={course.title} 
      onChangeText={value => setCourse({...course, title: value})} 
      placeholder='Course title'
      />
      <TextInput 
      value={course.credits} 
      onChangeText={value => setCourse({...course, credits: value})} 
      placeholder='Credits'
      />
      <Button 
      title = "Add Course"
      onPress={handleSave}
      />

      <FlatList data={courses} 
      renderItem={({item}) => <Text>{item.title} {item.credit}</Text>}/>
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
    paddingTop: 100,
  },
});
