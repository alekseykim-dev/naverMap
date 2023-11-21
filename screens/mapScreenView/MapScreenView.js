import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import NaverMapView, {
  Align,
  Marker,
  Path,
  Polyline,
  Circle,
  Polygon,
} from '../../components/map';
import {PermissionsAndroid, Platform, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {LayerGroup} from '../../components/map/index';
import Geolocation from '@react-native-community/geolocation';

const MapViewScreen = ({navigation}) => {
  const mapView = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      // For iOS, set permission to true as it's handled at the system level
      setPermissionGranted(true);
      fetchLocation();
    }
  }, []);

  async function requestLocationPermission() {
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
        setPermissionGranted(true);
        fetchLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const fetchLocation = () => {
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
      {enableHighAccuracy: false, timeout: 30000, maximumAge: 10000},
    );
  };

  return (
    <>
      <NaverMapView
        ref={mapView}
        style={{width: '100%', height: '100%'}}
        showsMyLocationButton={permissionGranted}
        center={currentLocation ? {...currentLocation, zoom: 16} : undefined}
        useTextureView>
        {currentLocation && <Marker coordinate={currentLocation} />}
        {/* ... other map elements */}
      </NaverMapView>
    </>
  );
};

// async function requestLocationPermission() {
//   if (Platform.OS !== 'android') return;
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location Permission',
//         message:
//           'This app needs access to your location to show it on the map.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       console.log('You can use the location');
//     } else {
//       console.log('Location permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }

export default MapViewScreen;
