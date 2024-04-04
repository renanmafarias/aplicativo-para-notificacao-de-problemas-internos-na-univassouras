import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export function CameraScreen() {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false); // Estado para controlar a exibição da mensagem

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (ref.current) {
      const data = await ref.current.takePictureAsync();
      setCaptured(data.uri);
      setOpen(true);
    }
  };

  const savePhoto = async () => {
    if (captured) {
      await MediaLibrary.saveToLibraryAsync(captured);
      setOpen(false);
      setShowMessage(true); // Exibe a mensagem após salvar a imagem
      setTimeout(() => {
        setShowMessage(false); // Oculta a mensagem após 3 segundos
      }, 3000);
    }
  };

  const closePreview = () => {
    setOpen(false);
    setCaptured(null); // Reset the captured image URI
  };

  return (
    <View style={styles.container}>
      {hasPermission === false ? (
        <Text>Libere o uso da câmera</Text>
      ) : (
        <Camera style={styles.camera} type={type} ref={ref}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Image style={styles.icon} source={require("../assets/flip.png")} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePicture}>
              <Image style={styles.icon} source={require("../assets/camera.png")} />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <Modal transparent={true} visible={open}>
        <View style={styles.modalContainer}>
          <Image style={styles.imagePreview} source={{ uri: captured }} />
          <TouchableOpacity style={styles.closeButton} onPress={closePreview}>
            <Image style={styles.closeIcon} source={require("../assets/close.png")} />
          </TouchableOpacity>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={savePhoto}>
              <Text>Salvar na galeria</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showMessage && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>Imagem salva com sucesso!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  icon: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imagePreview: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 160,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  closeIcon: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 170, 
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
