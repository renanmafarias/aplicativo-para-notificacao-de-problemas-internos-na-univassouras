import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as Location from 'expo-location';

export default function MapScreen({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [newMarkerCoords, setNewMarkerCoords] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

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

  const handleSave = () => {
    if (route.params.action === 'Addition') {
      navigation.navigate('Adicionar registro', {recordLatitude : latitude, recordLongitude : longitude});
    }
    else {
      navigation.navigate('Atualizar registro', {recordId : route.params.recordId, recordDescription : route.params.recordDescription, recordPhoto : route.params.recordPhoto, recordLatitude : latitude, recordLongitude : longitude, trigger : Math.random()});
    }
}

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
      <MapView
        loadingEnabled={true}
        onMapLoaded={() => {setLatitude(location.latitude); setLongitude(location.longitude)}}
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}> 
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}> 
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
