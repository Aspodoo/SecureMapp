import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function ReportScreen({ onBack, onNavigateTab }) {
  const [incidentType, setIncidentType] = useState('');
  const [description, setDescription] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0B0F17" />

      {/* --- ENCABEZADO --- */}
      <SafeAreaView style={styles.headerSafeArea}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="arrow-left" size={26} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <MaterialIcons name="security" size={24} color="#0095FF" />
            <Text style={styles.logoText}>
              securem<Text style={styles.redDot}>a</Text>pp
            </Text>
          </View>

          <View style={{ width: 26 }} />
        </View>
      </SafeAreaView>

      {/* --- FORMULARIO CON SCROLL --- */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Botón: Usar ubicación actual */}
        <TouchableOpacity style={styles.currentLocationPill}>
          <View style={styles.pillIconCircle}>
            <Ionicons name="location-sharp" size={14} color="#FFFFFF" />
          </View>
          <Text style={styles.currentLocationText}>Usar ubicacion actual ?</Text>
        </TouchableOpacity>

        {/* Campo: ¿Qué Sucedió? */}
        <Text style={styles.sectionLabel}>SUCESO</Text>
        <TextInput
          style={styles.inputField}
          placeholder="Ejemplo: Robo, Agresión, Disparos ...etc"
          placeholderTextColor="#E2E8F0"
          value={incidentType}
          onChangeText={setIncidentType}
        />

        {/* Tarjeta: Ubicación del incidente */}
        <View style={styles.mapCard}>
          <Text style={styles.cardTitle}>UBICACION DEL INCIDENTE</Text>
          <View style={styles.miniMapPreview}>
            {Platform.OS === 'web' ? (
              <iframe
                title="Mini Map Preview"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-74.0950%2C4.5980%2C-74.0750%2C4.6150&layer=mapnik"
                style={styles.iframeMiniMap}
              />
            ) : null}
            <View style={styles.miniMapOverlay} pointerEvents="none">
              <Ionicons name="location-sharp" size={32} color="#EF4444" />
              <Text style={styles.neighborhoodText}>LOS MÁRTIRES</Text>
            </View>
            <View style={styles.mapControls}>
              <View style={styles.mapControlButton}><Text style={styles.controlText}>+</Text></View>
              <View style={styles.mapControlButton}><Text style={styles.controlText}>-</Text></View>
              <View style={styles.mapControlButton}><Ionicons name="compass-outline" size={14} color="#CBD5E1" /></View>
            </View>
          </View>
        </View>

        {/* Campo: Descripción */}
        <Text style={styles.sectionLabel}>DESCRIPCION</Text>
        <TextInput
          style={[styles.inputField, styles.textAreaField]}
          placeholder="Describa el incidente"
          placeholderTextColor="#E2E8F0"
          multiline={true}
          numberOfLines={4}
          value={description}
          onChangeText={setDescription}
        />

        {/* Tarjeta: Agregar evidencia */}
        <View style={styles.evidenceCard}>
          <Text style={styles.cardTitle}>AGREGAR EVIDENCIA (OPCIONAL)</Text>
          <View style={styles.evidenceButtonsRow}>
            <TouchableOpacity style={styles.evidenceButton}>
              <Feather name="camera" size={36} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.evidenceButton}>
              <Feather name="image" size={36} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 110 }} />
      </ScrollView>

      {/* --- BOTÓN FLOTANTE ENVIAR (VERDE) --- */}
      <TouchableOpacity style={styles.floatingSendButton}>
        <Ionicons name="send" size={24} color="#0B0F17" style={{ marginLeft: 2 }} />
      </TouchableOpacity>

      {/* --- BARRA INFERIOR --- */}
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.tabButton} onPress={() => onNavigateTab('map')}>
            <Feather name="map" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.tabButton, styles.activeTabButton]}>
            <Feather name="alert-triangle" size={22} color="#0B0F17" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabButton} onPress={() => onNavigateTab('chat')}>
            <Ionicons name="chatbubble-outline" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.tabButton} onPress={() => onNavigateTab('profile')}>
            <Feather name="user" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070B11',
  },
  headerSafeArea: {
    backgroundColor: '#0B0F17',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  redDot: {
    color: '#FF2E56',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  currentLocationPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#64748B',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 8,
    marginBottom: 16,
  },
  pillIconCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentLocationText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  sectionLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 8,
    marginLeft: 2,
    fontWeight: '500',
  },
  inputField: {
    backgroundColor: '#7D8A99',
    borderRadius: 10,
    color: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 16,
    outlineStyle: 'none',
  },
  textAreaField: {
    height: 90,
    textAlignVertical: 'top',
  },
  mapCard: {
    backgroundColor: '#0B0F17',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '500',
  },
  miniMapPreview: {
    height: 140,
    borderRadius: 14,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#16202E',
  },
  iframeMiniMap: {
    width: '100%',
    height: '100%',
    border: 'none',
    filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)',
  },
  miniMapOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(7, 11, 17, 0.45)',
  },
  neighborhoodText: {
    color: '#E2E8F0',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 2,
  },
  mapControls: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    borderRadius: 6,
    padding: 4,
    gap: 4,
  },
  mapControlButton: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {
    color: '#CBD5E1',
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 16,
  },
  evidenceCard: {
    backgroundColor: '#0B0F17',
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
  },
  evidenceButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 40,
    paddingVertical: 10,
  },
  evidenceButton: {
    padding: 8,
  },
  floatingSendButton: {
    position: 'absolute',
    right: 22,
    bottom: 96,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
  },
  bottomBarContainer: {
    position: 'absolute',
    bottom: 24,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    backgroundColor: '#0B0F17',
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
    borderWidth: 1,
    borderColor: '#1E293B',
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