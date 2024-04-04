import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export function SuccessScreen({ onOpenCamera }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Logado com sucesso!</Text>
      <TouchableOpacity style={styles.button} onPress={onOpenCamera}>
        <Text>Abrir Câmera</Text>
      </TouchableOpacity>
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
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
});
