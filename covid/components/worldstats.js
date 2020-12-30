import React, {useState, useEffect} from 'react';
import axios from "axios";
import { Button, View, Text, StyleSheet, TouchableOpacity  } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; 
export default function WorldStats({ navigation }) {
  const[world_population,set_world_population]=useState()
  const[confirmedcases,setConfirmedcases]=useState()
  const[cwrp,setCwrp]=useState()
  const[recovered,setRecovered]=useState()
  const[critical,setCritical]=useState()
  const[deaths,setDeaths]=useState()
  const[lastUpdate,setlastUpdate]=useState()
  const[worldpopulation,setWorldpopulation]=useState()
  useEffect(() => {
    
    getData();
    getworlddata();
  },[])
    
  function getworlddata(){
    const options = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/worldpopulation',
  headers: {
    'x-rapidapi-key': '40838189e4mshb5ffc5960cde754p1c2078jsn5b6a894a4513',
    'x-rapidapi-host': 'world-population.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	setWorldpopulation(response.data.body.world_population);
  console.log("check",response.data.body.world_population)
}).catch(function (error) {
	console.error(error);
});

  }
  
  function getData() {
    

const options = {
  method: 'GET',
  url: 'https://covid-19-data.p.rapidapi.com/totals',
  params: {code: 'it'},
  headers: {
    'x-rapidapi-key': '407dcfb4d8msh6fbe7a6d709521cp1f2c51jsnc0a21c33e440',
    'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	setConfirmedcases(response.data[0].confirmed)
  setRecovered(response.data[0].recovered)
  setCritical(response.data[0].critical)
  setDeaths(response.data[0].deaths)
  setlastUpdate(response.data[0].lastUpdate)

}).catch(function (error) {
	console.error(error);
});
  }
  function calculate(value){
    const val =(100 * value) / worldpopulation
    return val.toFixed(2)
  }
  const Header =({name, openDrawer})=> (
  <View style={styles.header}>
    <TouchableOpacity onPress={()=>openDrawer()}>
      <Icon name="ios-menu" size={32} />
    </TouchableOpacity>
    <Text>{name}</Text>
    <Text style={{width:50}}></Text>
  </View>
)
  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.navigate('Stats By Country')} title="Go back Stats By Country" />
      <Header name="World Stats" openDrawer={navigation.openDrawer}/>
 
  <Text style={styles.fortext1}>Total World Population: {worldpopulation}</Text>

      <Text style={styles.fortext2}>Confirmed Cases: {confirmedcases} are {calculate(confirmedcases)}% of World population {worldpopulation} </Text>

      <Text style={styles.fortext2}>Recovered Cases: {recovered} are {calculate(recovered)}% of World population {worldpopulation}</Text>

      <Text style={styles.fortext2}>Critical Cases: {critical} are {calculate(critical)}% of World population {worldpopulation}</Text>

      <Text style={styles.fortext2}>Deaths: {deaths} are {calculate(deaths)}% of World population {worldpopulation}</Text>

      <Text style={styles.fortext2}>lastUpdated {lastUpdate} </Text>
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

    fortext1: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
    borderBottomWidth:3,
    borderColor:'blue',
    },

  fortext2: {
    color: 'black',
    alignItems:"left",
    fontWeight: 'bold',
    fontSize: 15,
    borderBottomWidth:4,
    borderColor:'blue',
  },
  header:{
    width:"100%",
    height:60,
    fontWeight: 'bold',
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center",
    paddingHorizontal:20
      }

  
});

