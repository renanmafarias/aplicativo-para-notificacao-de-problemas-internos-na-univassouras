import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BiometricLogin } from './components/BiometricLogin';
import { SuccessScreen } from './components/SuccessScreen';
import { CameraScreen } from './components/CameraScreen';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleOpenCamera = () => {
    setCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {loggedIn ? (
        cameraOpen ? (
          <CameraScreen onCloseCamera={handleCloseCamera} />
        ) : (
          <SuccessScreen onOpenCamera={handleOpenCamera} onLogout={handleLogout} />
        )
      ) : (
        <BiometricLogin onLogin={handleLogin} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
