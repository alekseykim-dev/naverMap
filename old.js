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
import {
  PermissionsAndroid,
  Platform,
  TouchableOpacity
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {LayerGroup} from './components/map/index';
import Geolocation from '@react-native-community/geolocation';

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

const MapViewScreen = ({navigation}) => {
  const mapView = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        console.log(position.coords);
      },
      error => {
        console.error(error);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
      },
    );
  }, []);

  const [enableLayerGroup, setEnableLayerGroup] = useState(true);

  return (
    <>
      <NaverMapView
        ref={mapView}
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={true}
        center={currentLocation ? {...currentLocation, zoom: 16} : undefined}
        // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        // onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
        // onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}
        useTextureView>
        {currentLocation && <Marker coordinate={currentLocation} />}
        {/* ... other map elements */}
      </NaverMapView>
    </>
  );
};

async function requestLocationPermission() {
  if (Platform.OS !== 'android') return;
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This app needs access to your location to show it on the map.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export default App;
