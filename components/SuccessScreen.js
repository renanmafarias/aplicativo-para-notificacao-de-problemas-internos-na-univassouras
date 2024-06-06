import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

export function SuccessScreen({ onOpenAddRecord, onOpenListRecords, onLogout }) {
  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/campus-da-univassouras.jpg')} style={styles.imageSection} />
      <View style={styles.contentSection}>
        <Text style={styles.title}>Seja bem-vindo!</Text>
        <Text style={styles.message}>Navegue pelo aplicativo a partir dos botões abaixo</Text>
      </View>
      <View style={styles.navigationContainer}>
        <TouchableOpacity style={styles.navButton} onPress={onOpenAddRecord}>
          <FontAwesome5 name="plus" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={onOpenListRecords}>
          <FontAwesome5 name="list" size={24} color="white" /> 
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
  },
  imageSection: {
    width: '100%',
    flex: 4,
  },
  contentSection: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
  },
  message: {
    margin: 20,
    fontSize: 20,
    textAlign: 'center',
  },
  navigationContainer: {
    position: 'relative',
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
