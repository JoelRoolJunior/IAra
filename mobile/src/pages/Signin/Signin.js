import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react'; 
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Signin() {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState(''); 
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 

  const handleRegister = async () => {
    if (!email || !login || !password) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    const newUser = { email, login, password };

    try {
      const existingUsersString = await AsyncStorage.getItem('users');
      let users = [];

      if (existingUsersString) {
        users = JSON.parse(existingUsersString);
      }

      const userExists = users.some(u => u.email === email || u.login === login);
      if (userExists) {
        setMessage('Email ou login já cadastrado.');
        return;
      }

      users.push(newUser);

      await AsyncStorage.setItem('users', JSON.stringify(users));
      setMessage('Usuário cadastrado com sucesso!');
      
      setEmail('');
      setLogin('');
      setPassword('');

      console.log('Todos os usuários cadastrados:', users);

    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setMessage('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#87CEEB','#120A8F']} start={{x: 0.3, y:0}} style={styles.background} />
      
      <View style={styles.containerLogo}>
        <Animatable.Image 
          animation="flipInY" 
          source={require('../../../image/logo/logo.png')} 
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      <Animatable.View animation="fadeInUp" style={styles.Login}>
        
        <Text style={styles.textoLogin}>E-mail</Text>
        <TextInput 
          style={styles.textoInput} 
          placeholder='Digite seu e-mail'
          placeholderTextColor="#cccccc" 
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.textoLogin}>Login</Text>
        <TextInput 
          style={styles.textoInput} 
          placeholder='Crie um nome de usuário'
          placeholderTextColor="#cccccc"
          value={login}
          onChangeText={setLogin}
          autoCapitalize="none"
        />

        <Text style={styles.textoLogin}>Senha</Text>
        <TextInput 
          style={styles.textoInput} 
          placeholder='Crie sua senha'
          placeholderTextColor="#cccccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.messageText}>{message}</Text> : null}
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
    top: '35%', 
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
    marginBottom: 15, 
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#007bff', 
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignSelf: 'center', 
    marginTop: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  messageText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 15,
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
  }
});
