import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';

export function BiometricLogin({ onLogin }) {
  const [biometricsAvailable, setBiometricsAvailable] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setBiometricsAvailable(compatible);
    })();
  }, []);

  const handleLogin = async () => {
    const authentication = await LocalAuthentication.authenticateAsync();
    if (authentication.success) {
      onLogin();
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo-da-univassouras.png')}
        alt="Logo da Univassouras"
        style={styles.img}
      />
      <Text style={styles.title}>Entrar</Text>
      <Text style={styles.message}>
        {biometricsAvailable
          ? 'Faça o login !'
          : 'Dispositivo não compatível com biometrias'}
      </Text>
      {biometricsAvailable && (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Ionicons name="finger-print-sharp" size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 90,
    fontSize: 32
  },
  message: {
    fontSize: 20
  },
  button: {
    backgroundColor: '#6D1D20',
    color: '#ffffff',
    paddingTop: 15,
    paddingRight: 30,
    paddingBottom: 15,
    paddingLeft: 30,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: '#ffffff',
  },
  img: {
    width: 200,
    height: 141,
  }
});
