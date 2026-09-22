import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapScreen from './src/screens/MapScreen';
import ReportScreen from './src/screens/ReportScreen';

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B11',
  },
});