import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';

export default function MapViewComponent({ onGoBack }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [newMarkerCoords, setNewMarkerCoords] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão da localização negada!');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  const handleMapPress = (event) => {
    setNewMarkerCoords(event.nativeEvent.coordinate);
  };

  let text = 'Aguarde...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Localização</Text>
      </View>
      <MapView
        loadingEnabled={true}
        onPress={handleMapPress} 
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }
            : undefined
        }
        style={styles.map}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            pinColor="blue" 
            draggable={false} 
            title="Minha Localização"
            description="Meu local de aula"
          />
        )}
        {newMarkerCoords && (
          <Marker
            coordinate={newMarkerCoords}
            pinColor="red" 
            title="Novo Marcador"
            description="Novo local de aula"
          />
        )}
      </MapView>
      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.button} onPress={onGoBack}> 
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleSection: {
    flex: 2,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: '#6D1D20'
  },
  title: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: '700'
  },
  map: {
    flex: 8
  },
  buttonSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
  },
  button: {
    backgroundColor: '#6D1D20',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
