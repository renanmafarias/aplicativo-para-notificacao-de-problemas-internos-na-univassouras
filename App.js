import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { BiometricLogin } from './components/BiometricLogin';
import { SuccessScreen } from './components/SuccessScreen';
import { AddRecordScreen } from './components/AddRecordScreen';
import { ListRecordsScreen } from './components/ListRecordsScreen'; 

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [addingRecord, setAddingRecord] = useState(false);
  const [listingRecords, setListingRecords] = useState(false); 

  const handleLogin = () => setLoggedIn(true);
  const handleOpenAddRecord = () => setAddingRecord(true);
  const handleOpenListRecords = () => setListingRecords(true); 
  const handleGoBack = () => {
    setAddingRecord(false);
    setListingRecords(false); 
  };

  const handleGoBackList = () => {
    setAddingRecord(false);
  };

  const handleLogout = () => setLoggedIn(false);

  return (
    <View style={styles.container}>
      {loggedIn ? (
        addingRecord ? (
          <AddRecordScreen onGoBack={handleGoBackList} />
        ) : listingRecords ? (
          <ListRecordsScreen onGoBack={handleGoBack} onOpenAddRecord={handleOpenAddRecord} /> 
        ) : (
          <SuccessScreen 
            onOpenAddRecord={handleOpenAddRecord} 
            onOpenListRecords={handleOpenListRecords} 
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
