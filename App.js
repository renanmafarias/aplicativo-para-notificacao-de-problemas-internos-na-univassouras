import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BiometricLogin } from './components/BiometricLogin';
import { SuccessScreen } from './components/SuccessScreen';
import { CameraScreen } from './components/CameraScreen';
import MapViewComponent from './components/MapViewComponent';
import { AddRecordScreen } from './components/AddRecordScreen';

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [addingRecord, setAddingRecord] = useState(false);

  const handleLogin = () => setLoggedIn(true);
  const handleOpenCamera = () => setCameraOpen(true);
  const handleCloseCamera = () => setCameraOpen(false);
  const handleOpenMap = () => setMapOpen(true);
  const handleGoBack = () => {
    setMapOpen(false);
    setAddingRecord(false);
  };
  const handleLogout = () => setLoggedIn(false);
  const handleOpenAddRecord = () => setAddingRecord(true);

  return (
    <View style={styles.container}>
      {loggedIn ? (
        addingRecord ? (
          <AddRecordScreen onGoBack={handleGoBack} />
        ) : (
          <SuccessScreen 
            onOpenAddRecord={handleOpenAddRecord} 
            onLogout={handleLogout} 
          />
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
