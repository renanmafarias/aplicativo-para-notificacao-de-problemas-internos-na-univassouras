import * as SQLite from 'expo-sqlite';
import NetInfo from "@react-native-community/netinfo";
import { doc, setDoc, deleteDoc, getDocs, collection } from 'firebase/firestore/lite';
import { firebaseDB } from './firebaseConfig';

const db = SQLite.openDatabase("database.db");

const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY NOT NULL, description TEXT NOT NULL, photo TEXT, latitude REAL, longitude REAL);",
      [],
      () => console.log("Tabela criada com sucesso!"),
      error => console.log("Erro ao tentar criar a tabela: " + error.message)
    );
  });
};

const insertRecord = (description, photo, latitude, longitude, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "INSERT INTO records (description, photo, latitude, longitude) VALUES (?, ?, ?, ?);",
      [description, photo, latitude, longitude],
      (_, result) => callback(true, result),
      (_, error) => callback(false, error)
    );
  });
};

const fetchRecords = callback => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM records;",
      [],
      (_, { rows }) => callback(true, rows._array),
      (_, error) => callback(false, error)
    );
  });
};

const deleteRecord = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "DELETE FROM records WHERE id = ?;",
      [id],
      (_, result) => callback(true, result),
      (_, error) => callback(false, error)
    );
  });
};

const updateRecord = (id, description, photo, latitude, longitude, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      "UPDATE records SET description = ?, photo = ?, latitude = ?, longitude = ? WHERE id = ?;",
      [description, photo, latitude, longitude, id],
      (_, result) => callback(true, result),
      (_, error) => callback(false, error)
    );
  });
};

const syncRecordsWithFirebase = async () => {
  const connection = await NetInfo.fetch();
  if (connection.isConnected) {
    fetchRecords(async (success, records) => {
      if (success) {
        try {
          const localRecords = records.map(record => record.id);
          const firestoreSnapshot = await getDocs(collection(firebaseDB, 'records'));
          const firestoreRecords = firestoreSnapshot.docs.map(doc => doc.id);
          for (const record of firestoreRecords) {
            if (!localRecords.includes(record)) {
              await deleteDoc(doc(firebaseDB, 'records', record));
            }
          }  
        }
        catch(exception) {
          console.log(exception);
        }
        try {
          for (const record of records) {
            await setDoc(doc(firebaseDB, 'records', record.id.toString()), {
              description : record.description,
              photo : record.photo,
              latitude : record.latitude,
              longitude : record.longitude
            });
          }
        }
        catch(exception) {
          console.log(exception);
        }
        console.log('Sincronização entre os registros do banco local e o Firebase concluída com sucesso!');
      }
      else {
        console.log('Falha ao buscar registros do banco local!');
      }
    });
  }
  else {
    console.log('Sem conexão com a internet. Não é possível sincronizar com o Firebase.');
  }
};

initDB();

export { initDB, insertRecord, fetchRecords, deleteRecord, updateRecord, syncRecordsWithFirebase };
