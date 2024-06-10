import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { fetchRecords, updateRecord } from '../database';

export default function UpdateRecordScreen({ navigation, route }) {
  const [recordDescription, setRecordDescription] = useState('');
  const [recordPhoto, setRecordPhoto] = useState('');
  const [recordLocalization, setRecordLocalization] = useState({latitude : 0, longitude : 0});

  useEffect(() => {
    fetchRecords((success, data) => {
      if (success) {
        for (const record of data) {
          if (record.id === route.params.recordId) {
            setRecordDescription(record.description);
          }
        }
      }
    });
  }, []);

  const handleSaveRecord = () => {
    updateRecord(
      route.params.recordId,
      recordDescription,
      recordPhoto,
      recordLocalization.latitude,
      recordLocalization.longitude,
      (success, records) => {
        if (success) {
          navigation.navigate('Listar registros');
        }
      }
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Listar registros')}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Atualizar registro {route.params.recordId}</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva o problema:"
        value={recordDescription}
        onChangeText={setRecordDescription}
        multiline={true}
        numberOfLines={4} // Define um número padrão de linhas visíveis
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Câmera')}>
        <Text style={styles.buttonText}>Atualizar foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mapa')}>
        <Text style={styles.buttonText}>Atualizar localização</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSaveRecord}>
        <Text style={styles.submitButtonText}>Atualizar registro</Text>
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
