import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';

export function ListRecordsScreen({ onGoBack, onOpenAddRecord }) {
  const records = []; 

  const renderItem = ({ item }) => (
    <View style={styles.recordItem}>
      <Text style={styles.recordText}>{item.title}</Text>
      <Text style={styles.recordText}>{item.complete ? 'Completo' : 'Incompleto'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Problemas</Text>
      {records.length === 0 ? (
        <Text style={styles.noRecordsText}>Não existe registro de problema.</Text>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={onGoBack}>
          <AntDesign name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onOpenAddRecord}>
          <FontAwesome5 name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  noRecordsText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  listContainer: {
    padding: 20,
  },
  recordItem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  recordText: {
    fontSize: 16,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#6D1D20',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#6D1D20',
    borderRadius: 20,
    padding: 10,
  },
});
