import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export function SuccessScreen({ onOpenCamera, onLogout }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Bem Vindo !</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} >
          <FontAwesome5 name="map-marked" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onOpenCamera}>
          <Feather name="camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onLogout}>
          <Entypo name="log-out" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
    paddingBottom: 20, // Espaçamento entre os botões e a parte inferior da tela
  },
  button: {
    backgroundColor: '#6D1D20',
    paddingTop: 15,
    paddingRight: 30,
    paddingBottom: 15,
    paddingLeft: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
  }
});
