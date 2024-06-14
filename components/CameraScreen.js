import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Modal, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import * as ImageManipulator from 'expo-image-manipulator';

export default function CameraScreen({ navigation, route }) {
  const ref = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [captured, setCaptured] = useState(null);
  const [open, setOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [Base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');

      if (Platform.OS === 'android' && status !== 'granted') {
        alert('É necessário permitir o acesso à câmera para tirar fotos.');
      }
    })();
  }, []);

  
  async function takePicture() {
    if (ref) {
    const data = await ref.current.takePictureAsync({quality: 0});
    const resizedImage = await ImageManipulator.manipulateAsync(
    data.uri,
    [{ resize: { width: 600, height: 600}}],
    { compress: 1, format: ImageManipulator.SaveFormat.JPEG, base64: true }
    );
    setBase64Image(resizedImage.base64);
    setCaptured(data.uri);
    setOpen(true);
    if (hasPermission === true) {
    await MediaLibrary.saveToLibraryAsync(data.uri);
    } else {
    console.warn('Sem permissão para salvar na galeria!');
    }
  }
}

  const savePhoto = async () => {
    if (captured) {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(captured);
        setOpen(false);
        setShowMessage(true);
        setTimeout(() => {
          setShowMessage(false);
        }, 3000);
        if (route.params.action === 'Addition') {
          navigation.navigate('Adicionar registro', {recordPhoto : Base64Image});
        }
        else {
          navigation.navigate('Atualizar registro', {recordId : route.params.recordId, recordDescription : route.params.recordDescription, recordPhoto : Base64Image, recordLatitude : route.params.recordLatitude, recordLongitude : route.params.recordLongitude, trigger : Math.random()});
        }
      } else {
        alert('É necessário permitir o acesso ao armazenamento para salvar fotos.');
      }
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