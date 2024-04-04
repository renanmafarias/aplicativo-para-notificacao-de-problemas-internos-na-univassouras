import React, { useState, useEffect, useRef } from 'react';
import { Image, Modal, StyleSheet, SafeAreaView, Text, View, TouchableOpacity, Platform, CameraRoll } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Libere o uso da câmera</Text>;
  }

  async function take() {
    if (ref) {
      const data = await ref.current.takePictureAsync();
      setCaptured(data.uri);
      setOpen(true);
    }
  }

  async function savePhoto() {
    if (captured) {
      if (Platform.OS === 'android') {
        const permission = await MediaLibrary.requestPermissionsAsync();
        if (permission.status !== 'granted') {
          console.log('Permission denied!');
          return;
        }
      }
      
      MediaLibrary.saveToLibraryAsync(captured)
        .then(() => {
          console.log('Foto salva com sucesso !');
          setOpen(false);
          setShowMessage(true);
          setTimeout(() => {
            setShowMessage(false);
          }, 3000); // Define 3000 milissegundos (3 segundos) para remover a mensagem
        })
        .catch((error) => {
          console.log('Erro ao salvar a foto na galeria: ', error);
        });
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera style={styles.camera} type={type} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonFlip}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Image style={styles.icon} source={require("./assets/flip.png")} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonTake} onPress={take}>
            <Image style={styles.icon} source={require("./assets/camera.png")} />
          </TouchableOpacity>
        </View>
      </Camera>
      <Modal transparent={true} visible={open} >
        <View style={styles.contentPhoto}>
          <TouchableOpacity style={styles.buttonClose} onPress={() => setOpen(false)}>
            <Image style={styles.icon} source={require("./assets/close.png")} />
          </TouchableOpacity>
          <Image style={styles.img} source={{ uri: captured }} />
          <TouchableOpacity style={styles.buttonSave} onPress={savePhoto}>
            <Text style={styles.textSave}>Salvar na galeria</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Foto salva com sucesso na galeria!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: "80%",
    height: "80%"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row"
  },
  buttonFlip: {
    position: "absolute",
    bottom: 50,
    left: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  buttonTake: {
    position: "absolute",
    bottom: 50,
    right: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  contentPhoto: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  img: {
    width: "100%",
    height: "80%"
  },
  buttonClose: {
    position: "absolute",
    top: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  buttonSave: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    margin: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  textSave: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  messageText: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});