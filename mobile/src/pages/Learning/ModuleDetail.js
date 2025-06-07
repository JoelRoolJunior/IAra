import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

export default function ModuleDetail() {
  const navigation = useNavigation();
  const route = useRoute(); 
  const { moduleTitle } = route.params; 

  const moduleContents = {
    'Módulo 1: O que são Fake News?': `Fake news são notícias falsas ou distorcidas que se espalham rapidamente, especialmente nas redes sociais. Elas são criadas intencionalmente para enganar, manipular opiniões ou causar confusão, e podem ter consequências sérias para a sociedade.`,
    'Módulo 2: Como identificar Títulos Suspeitos?': `Títulos que usam letras maiúsculas em excesso, muitos pontos de exclamação, ou que prometem revelações bombásticas, são frequentemente um sinal de fake news. Desconfie de manchetes que parecem boas demais para ser verdade.`,
    'Módulo 3: Verificando Fontes e Autores': `Sempre questione a origem da notícia. Quem escreveu? É um veículo de comunicação conhecido e confiável? Há fontes citadas no texto? Busque por informações sobre o autor e a publicação.`,
    'Módulo 4: Imagens e Vídeos Manipulados': `Muitas fake news usam imagens ou vídeos fora de contexto, antigos ou que foram alterados digitalmente. Use ferramentas de busca reversa de imagem para verificar a originalidade e o contexto.`,
    'Módulo 5: Impacto e Combate às Fake News': `As fake news podem minar a confiança na imprensa, influenciar eleições, gerar pânico e até incitar a violência. Compartilhar apenas informações verificadas e educar outras pessoas são formas importantes de combatê-las.`,
  };

  const content = moduleContents[moduleTitle] || 'Conteúdo do módulo não disponível.';

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#87CEEB', '#120A8F']} start={{ x: 0.3, y: 0 }} style={styles.background} />

      <Animatable.View  style={styles.header}>
        <Animatable.Text animation="fadeInDown" style={styles.title}>{moduleTitle}</Animatable.Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.contentBox}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.contentText}>{content}</Text>
        </ScrollView>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  contentBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', 
    borderRadius: 15,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    fontSize: 16,
    color: 'white',
    lineHeight: 24,
    textAlign: 'justify',
  },
});
