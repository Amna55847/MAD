import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StudentProvider } from './src/context/StudentContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <StudentProvider>
      <AppNavigator />
      <StatusBar style="auto" />
    </StudentProvider>
  );
}
