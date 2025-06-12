import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Chat() {
  const navigation = useNavigation();

  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([
    { id: '1', texto: 'Olá! Sou IAra, uma IA para análise de notícias fake, como posso ajudar?', tipo: 'recebida' }
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()} style={{ marginLeft: 15, padding: 5 }}>
          <Text style={{ fontSize: 24, color: 'white' }}>☰</Text>
        </TouchableOpacity>
      ),
      headerTitle: 'Chat com IAra',
      headerStyle: {
        backgroundColor: '#120A8F',
      },
      headerTintColor: 'white',
    });
  }, [navigation]);

  const receberMensagem = (respostaDaApi) => {
    const novaMensagem = {
      id: Date.now().toString(),
      texto: respostaDaApi,
      tipo: 'recebida'
    };

    setMensagens(prevMensagens => [...prevMensagens, novaMensagem]);
  };

  const enviarTexto = async () => {
    try {
      const response = await fetch(`http://192.168.1.8:5000/responder?texto=${encodeURIComponent(mensagem)}`);

      if (!response.ok) {
        throw new Error('Erro ao fazer requisição');
      }
      const data = await response.json();
      receberMensagem(data.resposta);
    } catch (error) {
      console.error('Erro:', error);
      receberMensagem('Erro ao obter resposta');
    }
  };

  const enviarMensagem = () => {
    if (mensagem.trim() === '') return;

    const novaMensagem = {
      id: Date.now().toString(),
      texto: mensagem,
      tipo: 'enviada'
    };

    setMensagens(prevMensagens => [...prevMensagens, novaMensagem]);
    setMensagem('');

    enviarTexto();
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.balao,
        item.tipo === 'enviada' ? styles.enviada : styles.recebida
      ]}
    >
      <Text style={styles.textoMensagem}>{item.texto}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#87CEEB', '#120A8F']} start={{ x: 0.3, y: 0 }} style={styles.background} />

      <View style={styles.containerLogo}>
        <Image
          source={require('../../../image/logo/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingContainer}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0} // Ajustado para Android: 0
      >
        <Animatable.View animation="fadeInUp" style={styles.chatContent}>
          <FlatList
            data={mensagens}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.lista}
            inverted={false}
          />
        </Animatable.View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Digite sua mensagem..."
            value={mensagem}
            onChangeText={setMensagem}
            style={styles.input}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={enviarMensagem} style={styles.botao}>
            <Text style={styles.textoBotao}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Este é o container principal que preenche a tela
    backgroundColor: '#000', // Cor de fundo caso o gradiente não cubra tudo
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: '40%',
    alignSelf: 'center',
    // 'position' e 'top' não são mais necessários aqui, pois 'containerLogo' já os gerencia
  },
  containerLogo: {
    position: 'absolute', // Posiciona o logo de forma absoluta no topo
    top: 0,
    left: 0,
    right: 0,
    height: '25%', // Altura da área do logo no topo da tela
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardAvoidingContainer: {
    flex: 1, // É essencial que a KeyboardAvoidingView ocupe todo o espaço restante
    justifyContent: 'flex-end', // Alinha o conteúdo (FlatList e input) na parte inferior
    // NOVO: Empurra a KeyboardAvoidingView para começar abaixo da área do logo
    //marginTop: '25%', // Deve ser igual ao 'height' do containerLogo
    paddingBottom: Platform.OS === 'android' ? 20 : 0,
  },
  chatContent: {
    flex: 1, // Permite que o conteúdo do chat ocupe o espaço restante dentro do KAV
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
    // 'marginTop' removido daqui, pois já é tratado pelo 'keyboardAvoidingContainer'
  },
  lista: {
    paddingBottom: 10,
    flexGrow: 1, // Permite que a lista cresça e o scroll funcione
  },
  balao: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 4,
    maxWidth: '75%',
  },
  enviada: {
    alignSelf: 'flex-end',
    borderTopRightRadius: 0,
    backgroundColor: 'rgba(18, 10, 143, 0.5)',
  },
  recebida: {
    backgroundColor: 'rgba(47, 155, 161, 0.5)',
    alignSelf: 'flex-start',
    borderTopLeftRadius: 0,
  },
  textoMensagem: {
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'transparent',
    paddingBottom: Platform.OS === 'android' ? 20 : 0, // Evita sobreposição no Android
  },
  input: {
    flex: 1,
    backgroundColor: '#87CEEB',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    color: '#000'
  },
  botao: {
    backgroundColor: '#120A8F',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
