import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, FlatList, KeyboardAvoidingView, Platform, Alert, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function Chat() {
  const navigation = useNavigation();

  // texto e Resposta da API
  const [texto, setTexto] = useState('');
  const [resposta, setResposta] = useState('');

  const [mensagem, setMensagem] = useState('');
  const [mensagens, setMensagens] = useState([
    { id: '1', texto: 'Olá! Sou IAra, uma IA para análise de notícias fake, como posso ajudar?', tipo: 'recebida' }
  ]);


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
      const response = await fetch(`http://192.168.1.7:5000/responder?texto=${encodeURIComponent(mensagem)}`);
              
      if (!response.ok) {
        throw new Error('Erro ao fazer requisição');        
      }
      const data = await response.json();
      receberMensagem(data.resposta);  // <<< Passa diretamente a resposta!

    } catch (error) {
      console.error('Erro:', error);
      receberMensagem('Erro ao obter resposta');  // <<< pode passar erro também
    }
  };


  const enviarMensagem = () => {
    if (mensagem.trim() === '') return;

  const novaMensagem = {
    id: Date.now().toString(),
    texto: mensagem,
    tipo: 'enviada'
  };

  setMensagens([...mensagens, novaMensagem]);
  setMensagem('');

  // Chama a função enviarTexto para enviar para API
  enviarTexto();
    
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.balao,
        item.tipo === 'enviada' ? styles.enviada : styles.recebida
      ]}
    >
      <Text style={styles.texto}>{item.texto}</Text>
    </View>
  );

  return (
    <SafeAreaView >
    <View style={styles.container}>
      <LinearGradient colors={['#87CEEB', '#120A8F']} start={{ x: 0.3, y: 0 }} style={styles.background} />

      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../../image/logo/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
      </View>
      

      <Animatable.View animation="fadeInUp" style={styles.Login}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={100}
        >
          <FlatList
            data={mensagens}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.lista}
          />

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
      </Animatable.View>
    </View>
    </SafeAreaView>
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
    flex: 1
  },
  logo: {
    width: '40%',
    alignSelf: 'center',
    position: 'absolute',
    top: '0%'
  },
  containerLogo: {
    backgroundColor: 'black',
  },
  Login: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
  },
  lista: {
    paddingBottom: 10,
    
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
  texto: {
    fontSize: 16,
    color: '#000',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 80,
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
  }
});
