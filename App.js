import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BiometricLogin } from './components/BiometricLogin';
import { SuccessScreen } from './components/SuccessScreen';
import { CameraScreen } from './components/CameraScreen';
import MapViewComponent from './components/MapViewComponent';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false); // Estado para controlar se o mapa está aberto

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleOpenCamera = () => {
    setCameraOpen(true);
  };

  const handleCloseCamera = () => {
    setCameraOpen(false);
  };

  const handleOpenMap = () => {
    setMapOpen(true);
  };

  const handleGoBack = () => {
    setMapOpen(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      {loggedIn ? (
        cameraOpen ? (
          <CameraScreen onCloseCamera={handleCloseCamera} />
        ) : mapOpen ? ( // Renderiza o mapa se mapOpen for verdadeiro
          <MapViewComponent onGoBack={handleGoBack} />
        ) : (
          <SuccessScreen onOpenCamera={handleOpenCamera} onLogout={handleLogout} onOpenMap={handleOpenMap} /> // Adiciona a função onOpenMap
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
