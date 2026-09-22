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
} from 'react-native';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function ChatAIScreen({ onBack, onNavigateTab }) {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'aegis',
      text: 'Hola soy Aegis, como puedo ayudarte ?😊',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputMessage.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');

    // Respuesta simulada de Aegis
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'aegis',
          text: 'Estoy analizando los reportes e incidentes recientes en Bogotá para darte la mejor recomendación de ruta segura.',
        },
      ]);
    }, 800);
  };

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

      {/* --- ÁREA DE MENSAJES --- */}
      <ScrollView
        contentContainerStyle={styles.messagesContainer}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((item) => (
          <View
            key={item.id}
            style={[
              styles.messageRow,
              item.sender === 'user' ? styles.userRow : styles.aegisRow,
            ]}
          >
            <View
              style={[
                styles.bubble,
                item.sender === 'user' ? styles.userBubble : styles.aegisBubble,
              ]}
            >
              <Text
                style={[
                  styles.bubbleText,
                  item.sender === 'user' ? styles.userBubbleText : styles.aegisBubbleText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* --- CAJA DE ENTRADA INFERIOR (ESTILO WIREFRAME) --- */}
      <View style={styles.inputCard}>
        <TextInput
          placeholder="Que deseas preguntar a Aegis😊"
          placeholderTextColor="#CBD5E1"
          style={styles.textInput}
          value={inputMessage}
          onChangeText={setInputMessage}
        />

        <View style={styles.inputActionsRow}>
          <View style={styles.leftIconsRow}>
            <TouchableOpacity style={styles.actionIconButton}>
              <Feather name="image" size={22} color="#1E2634" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionIconButton}>
              <Feather name="mic" size={22} color="#1E2634" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.sendCircleButton} onPress={handleSend}>
            <Ionicons name="send" size={16} color="#1E2634" style={{ marginLeft: 2 }} />
          </TouchableOpacity>
        </View>
      </View>

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

          {/* Pestaña 3: IA Aegis (Activo con badge circular) */}
          <TouchableOpacity style={[styles.tabButton, styles.activeTabButton]}>
            <View style={styles.aiIconWrapper}>
              <Ionicons name="chatbubble-outline" size={24} color="#0B0F17" />
              <Text style={styles.aiInsideText}>IA</Text>
            </View>
          </TouchableOpacity>

          {/* Pestaña 4: Perfil */}
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
  messagesContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  messageRow: {
    marginBottom: 14,
    flexDirection: 'row',
  },
  aegisRow: {
    justifyContent: 'flex-start',
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  bubble: {
    borderRadius: 18,
    paddingVertical: 10,
    paddingHorizontal: 16,
    maxWidth: '85%',
  },
  aegisBubble: {
    backgroundColor: '#D1D5DB',
    borderTopLeftRadius: 6,
  },
  aegisBubbleText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '500',
  },
  userBubble: {
    backgroundColor: '#0095FF',
    borderBottomRightRadius: 6,
  },
  userBubbleText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  inputCard: {
    backgroundColor: '#7D8A99',
    borderRadius: 20,
    marginHorizontal: 14,
    marginBottom: 100,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
  },
  textInput: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 12,
    outlineStyle: 'none',
  },
  inputActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  leftIconsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  actionIconButton: {
    padding: 2,
  },
  sendCircleButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#0B0F17',
    top: 5,
  },
});