import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

// Importación de todas las pantallas
import MapScreen from './src/screens/MapScreen';
import ReportScreen from './src/screens/ReportScreen';
import ChatAIScreen from './src/screens/ChatIAScreen'; // Corregido el nombre aquí
import ProfileScreen from './src/screens/ProfileScreen'; // ¡Importación nueva!

export default function App() {
  const [currentTab, setCurrentTab] = useState('map');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      
      {currentTab === 'map' && (
        <MapScreen onNavigateTab={(tab) => setCurrentTab(tab)} />
      )}
      
      {currentTab === 'alerts' && (
        <ReportScreen
          onBack={() => setCurrentTab('map')}
          onNavigateTab={(tab) => setCurrentTab(tab)}
        />
      )}
      
      {currentTab === 'chat' && (
        <ChatAIScreen
          onBack={() => setCurrentTab('map')}
          onNavigateTab={(tab) => setCurrentTab(tab)}
        />
      )}
      
      {/* Esta es la condición que faltaba para el muñequito */}
      {currentTab === 'profile' && (
        <ProfileScreen
          onBack={() => setCurrentTab('map')}
          onNavigateTab={(tab) => setCurrentTab(tab)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B11',
  },
});