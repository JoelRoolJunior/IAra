import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function LearningModules() {
  const navigation = useNavigation();

  const modules = [
    { id: '1', title: 'Módulo 1: O que são Fake News?' },
    { id: '2', title: 'Módulo 2: Como identificar Títulos Suspeitos?' },
    { id: '3', title: 'Módulo 3: Verificando Fontes e Autores' },
    { id: '4', title: 'Módulo 4: Imagens e Vídeos Manipulados?' },
    { id: '5', title: 'Módulo 5: Impacto e Combate às Fake News' },
  ];

  const renderItem = ({ item }) => (
    <Animatable.View animation="fadeInUp" delay={100 * parseInt(item.id)}>
      <TouchableOpacity
        style={styles.moduleItem}
        onPress={() => navigation.navigate('ModuleDetail', { moduleTitle: item.title })}
      >
        <Text style={styles.moduleText}>{item.title}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#87CEEB', '#120A8F']} start={{ x: 0.3, y: 0 }} style={styles.background} />

      <View style={styles.header}>
        <Animatable.Text animation="fadeInDown" style={styles.title}>Módulos de Aprendizado</Animatable.Text>
      </View>

      <FlatList
        data={modules}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() => ( 
          <View>
            <Animatable.View animation="fadeInUp" delay={700}>
              <TouchableOpacity
                style={styles.gameButton}
                onPress={() => navigation.navigate('FakeNewsGame')} 
              >
                <Text style={styles.gameButtonText}>Jogue: É Fato ou Fake?</Text>
                <Text style={styles.gameButtonSubtitle}>Teste seus conhecimentos!</Text>
              </TouchableOpacity>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" delay={800}>
              <TouchableOpacity
                style={styles.backToChatButton}
                onPress={() => navigation.navigate('ChatDrawer')} 
              >
                <Text style={styles.backToChatButtonText}>Voltar ao Chat</Text>
              </TouchableOpacity>
            </Animatable.View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  header: {
    paddingTop: 60, 
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: 'transparent', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30, 
  },
  moduleItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moduleText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  gameButton: {
    backgroundColor: '#FFD700', 
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.6)',
  },
  gameButtonText: {
    color: '#120A8F',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  gameButtonSubtitle: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  backToChatButton: {
    backgroundColor: '#87CEEB', 
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  backToChatButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
