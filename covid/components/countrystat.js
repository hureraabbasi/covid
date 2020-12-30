import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
export default function CountryStat({ route,navigation }) {
  const[confirmedcases,setConfirmedcases]=useState()
  const[recovered,setRecovered]=useState()
  const[critical,setCritical]=useState()
  const[deaths,setDeaths]=useState()
  const[lastUpdate,setlastUpdate]=useState()
  const[country,setCountry]=useState()
  useEffect(() => {
    setCountry(route.params.country)
    console.log(route.params.country)
    getData(route.params.country);
  },[route.params.country])
    
  
  function getData(counti) {
    const options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/country',
  params: {name: counti},
  headers: {
    'x-rapidapi-key': '407dcfb4d8msh6fbe7a6d709521cp1f2c51jsnc0a21c33e440',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data[0]);
  setConfirmedcases(response.data[0].confirmed)
  setRecovered(response.data[0].recovered)
  setCritical(response.data[0].critical)
  setDeaths(response.data[0].deaths)
  setlastUpdate(response.data[0].lastUpdate)
}).catch(function (error) {
	console.error(error);
});
    
  }
  return (
    
      
      <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Go back Stats By Country" />
      <Text style={styles.bigBlue}>{country} Cases</Text>
      <Text style={styles.fortext2}>Confirmed Cases: {confirmedcases}</Text>
      <Text style={styles.fortext2}>Recovered Cases: {recovered}</Text>
      <Text style={styles.fortext2}>Critical Cases: {critical}</Text>
      <Text style={styles.fortext2}>Deaths Cases: {deaths}</Text>
      <Text style={styles.fortext2}>lastUpdated {lastUpdate}</Text>
    </View>
      
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
  
  appButton: {
    elevation: 8,
    backgroundColor: 'black',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  fortext2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  },

  
});

