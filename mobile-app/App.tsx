import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './navigation/RootNavigator';
import { AuthProvider } from './contexts/AuthContext';
import { SavingsProvider } from './contexts/SavingsContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <SavingsProvider>
          <NavigationContainer>
            <StatusBar style="auto" />
            <RootNavigator />
          </NavigationContainer>
        </SavingsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
