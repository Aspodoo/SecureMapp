import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { Ionicons, Feather, MaterialIcons } from '@expo/vector-icons';

let MapView, Marker, PROVIDER_DEFAULT;
if (Platform.OS !== 'web') {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_DEFAULT = Maps.PROVIDER_DEFAULT;
}

const BOGOTA_CENTER = {
  latitude: 4.6486,
  longitude: -74.0889,
  latitudeDelta: 0.12,
  longitudeDelta: 0.12,
};

export default function MapScreen({ onNavigateTab }) {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F141C" />

      {/* --- MAPA --- */}
      {Platform.OS === 'web' ? (
        <View style={styles.webMapContainer}>
          <iframe
            title="Bogota Map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-74.1450%2C4.5900%2C-74.0300%2C4.7100&layer=mapnik"
            style={styles.iframeMap}
          />
          <View style={styles.darkOverlay} pointerEvents="none" />

          {/* Marcador de usuario centrado */}
          <View style={styles.userPulseWeb} pointerEvents="none">
            <View style={styles.userDotBorder}>
              <View style={styles.userDot} />
            </View>
          </View>
        </View>
      ) : (
        <MapView
          style={styles.map}
          provider={PROVIDER_DEFAULT}
          initialRegion={BOGOTA_CENTER}
          customMapStyle={darkMapStyle}
        >
          <Marker
            coordinate={{ latitude: 4.6486, longitude: -74.0889 }}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View style={styles.userDotBorder}>
              <View style={styles.userDot} />
            </View>
          </Marker>
        </MapView>
      )}

      {/* --- ENCABEZADO SUPERIOR --- */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="more-vertical" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <MaterialIcons name="security" size={24} color="#0095FF" />
            <Text style={styles.logoText}>
              SECUREM<Text style={styles.redDot}>A</Text>PP
            </Text>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color="#94A3B8" />
            <TextInput
              placeholder="Buscar..."
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Badge "seguro" */}
        <View style={styles.safeBadge}>
          <Ionicons name="cellular" size={16} color="#FFFFFF" />
          <Text style={styles.safeBadgeText}>SEGURO</Text>
        </View>
      </SafeAreaView>

      {/* --- BARRA INFERIOR --- */}
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          {/* Pestaña 1: Mapa (Activo) */}
          <TouchableOpacity
            style={[styles.tabButton, styles.activeTabButton]}
            onPress={() => onNavigateTab && onNavigateTab('map')}
          >
            <Feather name="map" size={22} color="#0B0F17" />
          </TouchableOpacity>

          {/* Pestaña 2: Alertas (Abre la pantalla de reporte) */}
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => onNavigateTab && onNavigateTab('alerts')}
          >
            <Feather name="alert-triangle" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Pestaña 3: Chat */}
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => onNavigateTab && onNavigateTab('chat')}
          >
            <Ionicons name="chatbubble-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Pestaña 4: Perfil */}
          <TouchableOpacity
            style={styles.tabButton}
            onPress={() => onNavigateTab && onNavigateTab('profile')}
          >
            <Feather name="user" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#161B22' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#161B22' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8B949E' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#262C36' }] },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0F17',
    position: 'relative',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  webMapContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    backgroundColor: '#0F141C',
  },
  iframeMap: {
    width: '100%',
    height: '100%',
    border: 'none',
    filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)',
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(11, 15, 23, 0.40)',
  },
  userPulseWeb: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 149, 255, 0.28)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDotBorder: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  userDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#0095FF',
  },
  headerSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F141C',
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 10,
  },
  headerButton: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  redDot: {
    color: '#FF2E56',
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E2634',
    borderRadius: 20,
    paddingHorizontal: 12,
    height: 36,
    gap: 6,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    outlineStyle: 'none',
  },
  safeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#2E7D32',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginTop: 12,
    marginLeft: 16,
    gap: 6,
    elevation: 4,
  },
  safeBadgeText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#0F141C',
    width: '100%',
    height: 64,
    borderRadius: 35,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
  },
  tabButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
  },
});