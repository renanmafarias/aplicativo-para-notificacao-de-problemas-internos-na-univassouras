import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { insertRecord } from '../database';

export default function AddRecordScreen({ navigation, route }) {
  const [recordDescription, setRecordDescription] = useState('');
  const [recordPhoto, setRecordPhoto] = useState('');
  const [recordLocalization, setRecordLocalization] = useState({latitude : 0, longitude : 0});

  useEffect(() => {
    if (route.params?.recordPhoto) setRecordPhoto(route.params.recordPhoto);
  }, [route.params?.recordPhoto]);

  useEffect(() => {
    if (route.params?.recordLatitude && route.params?.recordLongitude) setRecordLocalization(
      {latitude : route.params.recordLatitude, longitude : route.params.recordLongitude}
    );
  }, [route.params?.recordLatitude, route.params?.recordLongitude]);


  const handleSaveRecord = () => {
    if (!recordDescription || !recordPhoto || !recordLocalization.latitude || !recordLocalization.longitude) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }
    insertRecord(
      recordDescription,
      recordPhoto,
      recordLocalization.latitude,
      recordLocalization.longitude,
      (success, records) => {
        if (success) {
          navigation.navigate('Listar registros', {trigger : Math.random()});
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Home')}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Adicionar registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva o problema:"
        value={recordDescription}
        onChangeText={setRecordDescription}
        multiline={true}
        numberOfLines={4}
      />
      {recordPhoto ? (
          <Image source={{ uri: `data:image/png;base64,${route.params.recordPhoto}` }} style={styles.recordImage} />
        ) : (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Câmera', {action : 'Addition'})}>
        <Text style={styles.buttonText}>Tirar foto</Text>
        </TouchableOpacity>
      )}
      {recordLocalization.latitude ? (
        <>
          <View style={styles.line} />
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>Latitude: <Text style={styles.locationValue}>{recordLocalization.latitude}</Text></Text>
            <Text style={styles.locationText}>Longitude: <Text style={styles.locationValue}>{recordLocalization.longitude}</Text></Text>
          </View>
        </>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mapa', {action : 'Addition'})}>
        <Text style={styles.buttonText}>Marcar localização</Text>
      </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.submitButton} onPress={handleSaveRecord}>
        <Text style={styles.submitButtonText}>Gravar registro</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recordImage: {
    width: 300,
    height: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  input: {
    height: 100, // Ajuste a altura para um valor maior
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top', // Alinha o texto no topo do TextInput
  },
  line: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationText: {
    color: '#6D1D20',
    fontWeight: 'bold',
  },
  locationValue: {
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#6D1D20',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#6D1D20',
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#6D1D20',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});