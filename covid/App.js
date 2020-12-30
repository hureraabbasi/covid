import * as React from 'react';
import { Button, View, Ionicons, FontAwesome } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import StatsByCountry from './components/statsbycountry';
import WorldStats from './components/worldstats';
import FavoriteCountries from './components/favoritecountries';
import CountryStat from './components/countrystat';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World Stats">
        <Drawer.Screen name="Stats By Country" component={StackNavigator} />
      
        <Drawer.Screen name="World Stats" component={WorldStats} />
        <Drawer.Screen name="Favorite Countries" component={FavoriteCountries} />
      </Drawer.Navigator>
      
    </NavigationContainer>
  );
}
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Stats By Country"}
      
    >
      <Stack.Screen
        name="Stats By Country"
        component={StatsByCountry}
        
      />
      <Stack.Screen
        name="CountryStat"
        component={CountryStat}
        
      />
      
    </Stack.Navigator>
  )
}
