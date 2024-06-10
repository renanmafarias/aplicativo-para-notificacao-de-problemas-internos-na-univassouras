import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

export default function CameraScreen({ navigation }) {
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
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
      }, 3000);
    }
  };

  const closePreview = () => {
    setOpen(false);
    setCaptured(null);
  };

  return (
    <View style={styles.container}>
      {hasPermission === false ? (
        <Text>Libere o uso da câmera</Text>
      ) : (
        <Camera style={styles.camera} type={type} ref={ref}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonTake} onPress={takePicture}>
              <Feather name="camera" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <MaterialCommunityIcons name="camera-flip-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <Modal transparent={true} visible={open}>
        <View style={styles.modalContainer}>
          <Image style={styles.imagePreview} source={{ uri: captured }} />
          <TouchableOpacity style={styles.close} onPress={closePreview}>
            <AntDesign name="closecircleo" size={24} color="white" />
          </TouchableOpacity>
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={savePhoto}>
              <AntDesign name="save" size={24} color="black" />
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
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  buttonTake: {
    backgroundColor: '#6D1D20',
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
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
  close: {
    position: 'absolute',
    top: 170,
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 165,
    width: '100%',
    alignItems: 'center',
  },
  messageContainer: {
    position: 'absolute',
    bottom: 670,
    width: '100%',
    alignItems: 'center',
  },
  messageText: {
    backgroundColor: '#6D1D20',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
});
