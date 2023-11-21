import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import NaverMapView, {
  Align,
  Marker,
  Path,
  Polyline,
  Circle,
  Polygon,
} from './components/map';
import {PermissionsAndroid, Platform, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {LayerGroup} from './components/map/index';
import Geolocation from '@react-native-community/geolocation';
import MapViewScreen from './screens/mapScreenView/MapScreenView';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = () => (
  <Tab.Navigator>
    <Tab.Screen name={'map'} component={MapViewScreen} />
  </Tab.Navigator>
);

export default App;
