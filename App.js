import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import ListRecordsScreen from './components/ListRecordsScreen';
import AddRecordScreen from './components/AddRecordScreen';
import UpdateRecordScreen from './components/UpdateRecordScreen';
import CameraScreen from './components/CameraScreen';
import MapScreen from './components/MapScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerStyle : {backgroundColor : '#6D1D20'}, headerTintColor : '#fff', headerBackVisible : false}}>
        <Stack.Screen name="Login" component={LoginScreen}></Stack.Screen>
        <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
        <Stack.Screen name="Adicionar registro" component={AddRecordScreen}></Stack.Screen>
        <Stack.Screen name="Atualizar registro" component={UpdateRecordScreen}></Stack.Screen>
        <Stack.Screen name="Listar registros" component={ListRecordsScreen}></Stack.Screen>
        <Stack.Screen name="Câmera" component={CameraScreen}></Stack.Screen>
        <Stack.Screen name="Mapa" component={MapScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
