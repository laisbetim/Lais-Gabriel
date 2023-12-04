import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import MapView, { Marker } from 'react-native-maps';

const MapaLaisGabriel = () => {
  const [location, setLocation] = useState(null);
  const [magnetometer, setMagnetometer] = useState({});
  const [subscription, setSubscription] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('white');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Não tem permissão');
        return;
      }

      let info = await Location.getCurrentPositionAsync({});
      console.log(info);
      setLocation(info);
    })();
  }, []);

  const getPositiveHeading = (heading) => (heading < 0 ? 360 + heading : heading);

  const subscribe = () => {
    setSubscription(Magnetometer.addListener(magnetometerListener));
  };

  const unsubscribe = () => {
    subscription?.remove();
    setSubscription(null);
  };

  const magnetometerListener = (data) => {
    setMagnetometer(data);
    updateDirection(data);
  };

  const updateDirection = (data) => {
    const angle = Math.atan2(data.y, data.x) * (180 / Math.PI);
    let compassDirection = '';

    if (angle >= 45 && angle < 135) {
      compassDirection = 'Sul';
      setBackgroundColor('#836FFF');
    } else if (angle >= 135 || angle < -135) {
      compassDirection = 'Oeste';
      setBackgroundColor('#00CED1');
    } else if (angle >= -135 && angle < -45) {
      compassDirection = 'Norte';
      setBackgroundColor('#9932CC');
    } else {
      compassDirection = 'Leste';
      setBackgroundColor('#DA70D6');
    }
  };

  useEffect(() => {
    const initSensors = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission not granted');
        return;
      }

      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

      subscribe();

      return () => {
        unsubscribe();
      };
    };

    initSensors();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Magnetometro:{'\n'}
          z: {magnetometer?.z || 'Loading...'} {'\n'}
          {location ? (
            <>
              Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}
            </>
          ) : (
            'Location not available'
          )}
        </Text>
      </View>

      <Image
        source={require('../assets/rosadosve.png')}
        style={{
          marginTop: 20,
          width: 100,
          height: 100,
          alignSelf: 'center',
          zIndex: 1,
          transform: [{ rotate: `${getPositiveHeading(magnetometer.z || 0)}deg` }],
        }}
      />

      <View style={styles.mapContainer}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="My Location"
              description="This is where I am"
            />
          </MapView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infoContainer: {
    paddingTop: 100,
    paddingBottom: 100,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    width: 300,
    height: 300,
  },
});

export default MapaLaisGabriel;