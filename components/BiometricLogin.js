import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

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
      <Text>
        {biometricsAvailable
          ? 'Faça o login com biometria'
          : 'Dispositivo não compatível com biometrias'}
      </Text>
      {biometricsAvailable && (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text>Login com Biometria</Text>
        </TouchableOpacity>
      )}
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
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
});
