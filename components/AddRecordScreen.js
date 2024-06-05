import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraScreen } from './CameraScreen';
import MapViewComponent from './MapViewComponent';
import { AntDesign } from '@expo/vector-icons';

export function AddRecordScreen({ onGoBack }) {
  const [problemDescription, setProblemDescription] = useState('');
  const [cameraOpen, setCameraOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  const handleOpenCamera = () => setCameraOpen(true);
  const handleCloseCamera = () => setCameraOpen(false);
  const handleOpenMap = () => setMapOpen(true);
  const handleCloseMap = () => setMapOpen(false);

  const handleSaveRecord = () => {
    // Aqui você pode adicionar a lógica para salvar o registro, como enviar para uma API ou salvar em um banco de dados local
    console.log('Registro gravado:', {
      description: problemDescription,
      // Adicione outros dados relevantes aqui
    });
    onGoBack();
  };

  return (
    <View style={styles.container}>
      {cameraOpen ? (
        <CameraScreen onCloseCamera={handleCloseCamera} />
      ) : mapOpen ? (
        <MapViewComponent onGoBack={handleCloseMap} />
      ) : (
        <>
          <TouchableOpacity style={styles.closeButton} onPress={onGoBack}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Relatar Problema</Text>
          <TextInput
            style={styles.input}
            placeholder="Descreva o problema"
            value={problemDescription}
            onChangeText={setProblemDescription}
            multiline={true}
            numberOfLines={4} // Define um número padrão de linhas visíveis
          />
          <TouchableOpacity style={styles.button} onPress={handleOpenCamera}>
            <Text style={styles.buttonText}>Tirar Foto</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleOpenMap}>
            <Text style={styles.buttonText}>Marcar Localização</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleSaveRecord}>
            <Text style={styles.buttonText}>Gravar Registro</Text>
          </TouchableOpacity>
        </>
      )}
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
    backgroundColor: '#6D1D20',
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
