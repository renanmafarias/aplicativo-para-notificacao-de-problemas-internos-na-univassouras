import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import { fetchRecords, deleteRecord, syncRecordsWithFirebase } from '../database';

export default function ListRecordsScreen({ navigation }) {
  const [records, setRecords] = useState([]);

  const renderRecord = ({ item }) => (
    <View style={styles.recordItem}>
      <Text style={styles.recordText}>{item.description}</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Atualizar registro', {recordId : item.id});
        }}>
          <Text>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRecordDeletion(item.id)}>
        <Text>Deletar</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
    fetchRecords((success, records) => {
      syncRecordsWithFirebase();
      if (success) setRecords(records);
    });
  };

  const handleRecordDeletion = (recordId) => {
    deleteRecord(recordId, (success, records) => {
      if (success) {
        loadRecords();
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de registros</Text>
      {records.length === 0 ? (
          <Text style={styles.noRecordsText}>Não existe registro de problema</Text>
        ) : (
          <FlatList
            data={records}
            keyExtractor={record => record.id}
            renderItem={renderRecord}
          />
        )}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <AntDesign name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Adicionar registro')}>
          <FontAwesome5 name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
  recordItem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  recordText: {
    fontSize: 16,
  },
  input: {
    height: 100, // Ajuste a altura para um valor maior
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    textAlignVertical: 'top', // Alinha o texto no topo do TextInput
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
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  }
});
