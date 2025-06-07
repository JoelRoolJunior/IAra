import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react'; 
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation();

  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    setMessage(''); 

    if (!loginInput || !passwordInput) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const existingUsersString = await AsyncStorage.getItem('users');
      let users = [];

      if (existingUsersString) {
        users = JSON.parse(existingUsersString);
      }

      const foundUser = users.find(
        (user) => 
          (user.login === loginInput || user.email === loginInput) && 
          user.password === passwordInput
      );

      if (foundUser) {
        setMessage('Login bem-sucedido!');

        navigation.navigate('HomeDrawer', { screen: 'ChatDrawer' });
        
        setLoginInput('');
        setPasswordInput('');
      } else {
        
        setMessage('Login ou senha inválidos. Usuário não cadastrado.');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      setMessage('Erro ao tentar fazer login. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#87CEEB','#120A8F']} start={{x: 0.3, y:0}} style={styles.background} />
      
      <View style={styles.containerLogo}>
        <Animatable.Image animation="flipInY" source={require('../../../image/logo/logo.png')} style={styles.logo} resizeMode="contain"/>
      </View>

      <Animatable.View animation="fadeInUp" style={styles.Login}>
        <Text style={styles.textoLogin}>Login</Text>
        <TextInput 
          style={styles.textoInput} 
          placeholder='LOGIN'
          placeholderTextColor="#cccccc"
          value={loginInput} 
          onChangeText={setLoginInput} 
          autoCapitalize="none" 
        />
        <Text style={styles.textoLogin}>Senha</Text>
        <TextInput 
          style={styles.textoInput} 
          placeholder='SENHA'
          placeholderTextColor="#cccccc"
          secureTextEntry={true}
          value={passwordInput} 
          onChangeText={setPasswordInput}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={{ color: 'white' }}>Entrar</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.messageText}>{message}</Text> : null}

        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text style={styles.textoAviso}>Novo por aqui? Cadastre-se</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.textoAviso}>Esqueceu a Senha?</Text>
        </TouchableOpacity>
      </Animatable.View> 
    </View>
  );
}

const styles = StyleSheet.create({
  container :{
    flex: 1
  },
  background :{
    position: 'absolute',
    width: '100%',         
    height:'100%',
    flex: 1
  },
  Login :{
    position: 'absolute',
    top: '40%',
    width: '100%',
  },
  textoLogin:{
    color: 'white',
    fontSize: 20,
    fontFamily:'sans-serif',
    marginLeft: "10%",
    marginBottom: 5,
  },
  textoInput:{
    color: 'white',
    fontSize: 15,
    fontFamily:'sans-serif',
    borderColor: 'black',
    borderWidth: 0.5,
    width: '80%',
    borderRadius: 10,
    backgroundColor: 'rgba(66, 91, 181, 0.3)',
    marginLeft: "10%",
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  textoAviso:{
    color: 'white',
    alignSelf: 'center', 
    textDecorationLine: 'underline',
    marginTop: 25,
  },
  messageText: { // Novo estilo para a mensagem
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10, // Ajuste para espaçamento
    fontWeight: 'bold',
  },
  logo:{
    width: '40%',
    alignSelf: 'center', 
    position: 'absolute',
    top: '0%'
  },
  containerLogo:{
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button :{
    backgroundColor: 'rgba(8, 144, 199, 0.4)',
    borderRadius: 10,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center' ,
    bottom: '-5%',
    alignItems: 'center',
    color: "white",
    borderColor: 'white',
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 15,
  }
});
