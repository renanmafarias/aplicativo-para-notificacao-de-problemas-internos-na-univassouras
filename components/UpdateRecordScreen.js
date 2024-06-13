import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { fetchRecords, updateRecord } from '../database';

export default function UpdateRecordScreen({ navigation, route }) {
  const [recordId, setRecordId] = useState('');
  const [recordDescription, setRecordDescription] = useState('');
  const [recordPhoto, setRecordPhoto] = useState('');
  const [recordLocalization, setRecordLocalization] = useState({});

useEffect(() => {
  setRecordId(route.params?.recordId);
  setRecordDescription(route.params?.recordDescription);
  setRecordPhoto(route.params?.recordPhoto);
  setRecordLocalization({latitude : route.params?.recordLatitude, longitude : route.params?.recordLongitude});
}, [route.params?.trigger]);

  const handleSaveRecord = () => {
    updateRecord(
      recordId,
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
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Listar registros')}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Atualizar registro {route.params?.recordId}</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva o problema:"
        value={recordDescription}
        onChangeText={setRecordDescription}
        multiline={true}
        numberOfLines={4}
      />
      <Text style={styles.locationText}>Foto (base 64): <Text style={styles.locationValue}>{recordPhoto.slice(recordPhoto.length - 30)}</Text></Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Câmera', {action : 'Update', recordId : recordId, recordPhoto : recordPhoto, recordDescription : recordDescription, recordLatitude : recordLocalization.latitude, recordLongitude : recordLocalization.longitude})}>
        <Text style={styles.buttonText}>Atualizar foto</Text>
      </TouchableOpacity>

      <View style={styles.line} />
      
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>Latitude: <Text style={styles.locationValue}>{recordLocalization.latitude}</Text></Text>
        <Text style={styles.locationText}>Longitude: <Text style={styles.locationValue}>{recordLocalization.longitude}</Text></Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mapa', {action : 'Update', action : 'Update', recordId : recordId, recordPhoto : recordPhoto, recordDescription : recordDescription, recordLatitude : recordLocalization.latitude, recordLongitude : recordLocalization.longitude})}>
        <Text style={styles.buttonText}>Atualizar localização</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSaveRecord}>
        <Text style={styles.submitButtonText}>Salvar</Text>
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
