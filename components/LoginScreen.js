import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
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
      navigation.navigate('Home');
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
          ? 'Clique no botão abaixo para fazer o login por biometria'
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 90,
    fontSize: 40,
    fontWeight: '700'
  },
  message: {
    margin: 20,
    marginBottom: 40,
    fontSize: 20,
    textAlign: 'center'
  },
  button: {
    backgroundColor: '#6D1D20',
    color: '#ffffff',
    paddingTop: 15,
    paddingRight: 30,
    paddingBottom: 15,
    paddingLeft: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#ffffff',
  },
  img: {
    width: 200,
    height: 141,
  }
});
