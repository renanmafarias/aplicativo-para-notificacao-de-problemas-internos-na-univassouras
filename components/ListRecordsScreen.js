import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons'; 
import { fetchRecords, deleteRecord, syncRecordsWithFirebase } from '../database';

export default function ListRecordsScreen({ navigation, route }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    loadRecords();
  }, [route.params?.trigger]);

  const loadRecords = () => {
    fetchRecords((success, records) => {
      syncRecordsWithFirebase();
      if (success) setRecords(records);
    });
  };

  const renderRecord = ({ item }) => (
    <View style={styles.recordItem}>
      <View style={styles.recordItemRow}>
        <Text style={styles.recordText}>Descrição:</Text>
        <Text style={styles.recordValue}>{item.description}</Text>
      </View>
      <View style={styles.recordItemRow}>
        <Text style={styles.recordText}>Foto:</Text>
        {item.photo ? (
          //<Image source={{ uri: `data:image/png;base64,${item.photo}` }} style={styles.recordImage} />
          <Text>{item.photo.slice(item.photo.length - 30)}</Text>
        ) : (
          <Text style={styles.recordText}>Sem foto</Text>
        )}
      </View>
      <View style={styles.recordItemRow}>
        <Text style={styles.recordText}>Latitude:</Text>
        <Text style={styles.recordValue}>{item.latitude}</Text>
      </View>
      <View style={styles.recordItemRow}>
        <Text style={styles.recordText}>Longitude:</Text>
        <Text style={styles.recordValue}>{item.longitude}</Text>
      </View>
      <View style={styles.recordItemRow}>
        <TouchableOpacity
          style={styles.action}
          onPress={() => {
            navigation.navigate('Atualizar registro', { recordId: item.id, recordDescription: item.description, recordPhoto: item.photo, recordLatitude: item.latitude, recordLongitude: item.longitude, trigger : Math.random() });
          }}>
          <Text style={styles.actionText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={() => handleRecordDeletion(item.id)}>
          <Text style={styles.actionText}>Deletar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleRecordDeletion = (recordId) => {
    deleteRecord(recordId, (success, records) => {
      if (success) {
        loadRecords();
      }
    });
  };
  
  return (
    <View style={styles.container}>
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
    padding: 20,
    marginVertical: 8,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#6D1D20',
    borderRadius: 10,
  },
  recordItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  recordValue: {
    fontSize: 16,
  },
  recordImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  action: {
    margin: 10,
    backgroundColor: '#6D1D20',
    borderRadius: 5,
    padding: 10,
  },
  actionText: {
    color: '#fff',
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
    borderRadius: 5,
    padding: 10,
  },
});