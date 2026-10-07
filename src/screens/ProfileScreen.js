import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Switch,
} from 'react-native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function ProfileScreen({ onBack, onNavigateTab }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);

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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* --- SECCIÓN SUPERIOR (Diseño exacto del Wireframe) --- */}
        <View style={styles.topSection}>
          {/* Avatar Circular con botón de edición */}
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarCircle}>
              <Feather name="user" size={64} color="#1E2634" />
            </View>
            <TouchableOpacity style={styles.editBadge}>
              <Feather name="edit-2" size={14} color="#CBD5E1" />
            </TouchableOpacity>
          </View>

          {/* Botón Píldora: Ajustes */}
          <TouchableOpacity style={styles.settingsPill}>
            <Feather name="settings" size={20} color="#1E2634" />
            <Text style={styles.settingsText}>Ajustes</Text>
          </TouchableOpacity>

          {/* Interruptor Modo Claro / Modo Oscuro */}
          <View style={styles.themePill}>
            <Feather name="sun" size={22} color={isDarkMode ? '#64748B' : '#F59E0B'} />
            <TouchableOpacity
              style={[styles.switchTrack, { backgroundColor: isDarkMode ? '#6D5BB6' : '#94A3B8' }]}
              onPress={() => setIsDarkMode(!isDarkMode)}
              activeOpacity={0.8}
            >
              <View style={[styles.switchThumb, isDarkMode ? styles.thumbRight : styles.thumbLeft]} />
            </TouchableOpacity>
            <Feather name="moon" size={22} color={isDarkMode ? '#CBD5E1' : '#64748B'} />
          </View>
        </View>

        {/* --- NUEVAS FUNCIONES DE SEGURIDAD SECUREMAPP --- */}
        <View style={styles.securitySection}>
          <Text style={styles.sectionTitle}>Mi Impacto Ciudadano</Text>
          
          <View style={styles.statsCard}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Reportes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Ionicons name="shield-checkmark" size={28} color="#22C55E" />
              <Text style={[styles.statLabel, { marginTop: 4 }]}>Confiable</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Rutas Seguras</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Centro de Seguridad</Text>

          <View style={styles.optionsMenu}>
            {/* Opción 1: Reporte Anónimo */}
            <View style={styles.menuRow}>
              <View style={styles.menuIconText}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(0, 149, 255, 0.15)' }]}>
                  <Feather name="eye-off" size={18} color="#0095FF" />
                </View>
                <View>
                  <Text style={styles.menuTitle}>Modo Anónimo</Text>
                  <Text style={styles.menuSub}>Ocultar mi nombre en reportes</Text>
                </View>
              </View>
              <Switch
                value={isAnonymous}
                onValueChange={setIsAnonymous}
                trackColor={{ false: '#334155', true: '#0095FF' }}
                thumbColor="#FFFFFF"
              />
            </View>

            <View style={styles.menuDivider} />

            {/* Opción 2: Contactos SOS */}
            <TouchableOpacity style={styles.menuRow}>
              <View style={styles.menuIconText}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(239, 68, 68, 0.15)' }]}>
                  <Feather name="phone-call" size={18} color="#EF4444" />
                </View>
                <View>
                  <Text style={styles.menuTitle}>Contactos SOS</Text>
                  <Text style={styles.menuSub}>Avisar en caso de emergencia</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#64748B" />
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            {/* Opción 3: Ficha Médica */}
            <TouchableOpacity style={styles.menuRow}>
              <View style={styles.menuIconText}>
                <View style={[styles.iconBox, { backgroundColor: 'rgba(34, 197, 94, 0.15)' }]}>
                  <Feather name="heart" size={18} color="#22C55E" />
                </View>
                <View>
                  <Text style={styles.menuTitle}>Información Médica</Text>
                  <Text style={styles.menuSub}>Datos vitales para rescatistas</Text>
                </View>
              </View>
              <Feather name="chevron-right" size={20} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 100 }} /> {/* Espacio para la barra inferior */}
      </ScrollView>

      {/* --- BARRA INFERIOR --- */}
      <View style={styles.bottomBarContainer}>
        <View style={styles.bottomBar}>
          {/* Pestaña 1: Mapa */}
          <TouchableOpacity style={styles.tabButton} onPress={() => onNavigateTab('map')}>
            <Feather name="map" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Pestaña 2: Alertas */}
          <TouchableOpacity style={styles.tabButton} onPress={() => onNavigateTab('alerts')}>
            <Feather name="alert-triangle" size={22} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Pestaña 3: IA Aegis */}
          <TouchableOpacity style={styles.tabButton} onPress={() => onNavigateTab('chat')}>
            <View style={styles.aiIconWrapper}>
              <Ionicons name="chatbubble-outline" size={24} color="#FFFFFF" />
              <Text style={[styles.aiInsideText, { color: '#FFFFFF' }]}>IA</Text>
            </View>
          </TouchableOpacity>

          {/* Pestaña 4: Perfil (Activo) */}
          <TouchableOpacity style={[styles.tabButton, styles.activeTabButton]}>
            <Feather name="user" size={22} color="#0B0F17" />
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
    paddingTop: 36,
  },
  topSection: {
    alignItems: 'flex-start',
    paddingHorizontal: 28,
  },
  avatarWrapper: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: 44,
  },
  avatarCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#CBD5E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#475569',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#070B11',
  },
  settingsPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    gap: 10,
    marginBottom: 20,
  },
  settingsText: {
    color: '#334155',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  themePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#CBD5E1',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 24,
    gap: 12,
  },
  switchTrack: {
    width: 58,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  switchThumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#FFFFFF',
  },
  thumbLeft: {
    alignSelf: 'flex-start',
  },
  thumbRight: {
    alignSelf: 'flex-end',
  },
  securitySection: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 12,
    marginLeft: 4,
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#0F141C',
    borderRadius: 16,
    paddingVertical: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E293B',
    marginBottom: 28,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#1E293B',
  },
  optionsMenu: {
    backgroundColor: '#0F141C',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 16,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
  },
  menuIconText: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  menuSub: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 2,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#1E293B',
    marginLeft: 48,
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
  aiIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInsideText: {
    position: 'absolute',
    fontSize: 9,
    fontWeight: 'bold',
    top: 5,
  },
});