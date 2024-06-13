import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { insertRecord } from '../database';

export default function AddRecordScreen({ navigation, route }) {
  const [recordDescription, setRecordDescription] = useState('');
  const [recordPhoto, setRecordPhoto] = useState('');
  const [recordLocalization, setRecordLocalization] = useState({latitude : 0, longitude : 0});

  useEffect(() => {
    if (route.params?.photo) {
      setRecordPhoto(route.params?.photo);
    }
  }, [route.params?.photo]);

  const handleSaveRecord = () => {
    /*
    if (!recordDescription || !recordPhoto || recordLocalization.latitude === 0 || recordLocalization.longitude === 0) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }
    */
    insertRecord(
      recordDescription,
      recordPhoto,
      recordLocalization.latitude,
      recordLocalization.longitude,
      (success, data) => {
        if (success) {
          navigation.navigate('Listar registros');
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
        numberOfLines={4} // Define um número padrão de linhas visíveis
      />
      {recordPhoto ? (
        <Text>{recordPhoto.slice(0, 10)}</Text>
      ) : (
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Câmera', {action : 'Addition'})}>
        <Text style={styles.buttonText}>Tirar foto</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Mapa')}>
        <Text style={styles.buttonText}>Marcar localização</Text>
      </TouchableOpacity>
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