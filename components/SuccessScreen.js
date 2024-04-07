import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export function SuccessScreen({ onOpenCamera, onLogout, onOpenMap }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>Bem Vindo !</Text>
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={onOpenMap}>
          <FontAwesome5 name="map-marked" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={onOpenCamera}>
          <Feather name="camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={onLogout}>
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
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#6D1D20',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 20,
  },
  navButton: {
    paddingVertical: 3,
    paddingHorizontal: 30,
    marginTop: 15,
  },
});

