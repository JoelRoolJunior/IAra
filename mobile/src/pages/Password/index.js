import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ForgotPassword() {
  const navigation = useNavigation();

  const [loginIdentifier, setLoginIdentifier] = useState(''); 
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleChangePassword = async () => {
    setMessage(''); 

    if (!loginIdentifier || !newPassword || !confirmNewPassword) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage('A nova senha e a confirmação não coincidem.');
      return;
    }

    try {
      const existingUsersString = await AsyncStorage.getItem('users');
      let users = [];

      if (existingUsersString) {
        users = JSON.parse(existingUsersString);
      }

      const userIndex = users.findIndex(
        (user) => user.login === loginIdentifier || user.email === loginIdentifier
      );

      if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        await AsyncStorage.setItem('users', JSON.stringify(users));
        setMessage('Senha alterada com sucesso! Você pode fazer login agora.');
        
        setTimeout(() => {
          navigation.navigate('Login');
        }, 2000); 
        
        setLoginIdentifier('');
        setNewPassword('');
        setConfirmNewPassword('');
      } else {
        setMessage('Login ou e-mail não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao mudar a senha:', error);
      setMessage('Erro ao tentar mudar a senha. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#87CEEB','#120A8F']} start={{x: 0.3, y:0}} style={styles.background} />
      
      <Animatable.View animation="fadeInDown" style={styles.header}>
        <Text style={styles.title}>Mudar Senha</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" style={styles.form}>
        <Text style={styles.label}>Login ou E-mail</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Seu login ou e-mail'
          placeholderTextColor="#cccccc"
          value={loginIdentifier}
          onChangeText={setLoginIdentifier}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Nova Senha</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Crie sua nova senha'
          placeholderTextColor="#cccccc"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={setNewPassword}
        />

        <Text style={styles.label}>Confirme a Nova Senha</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Confirme a nova senha'
          placeholderTextColor="#cccccc"
          secureTextEntry={true}
          value={confirmNewPassword}
          onChangeText={setConfirmNewPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Mudar Senha</Text>
        </TouchableOpacity>

        {message ? <Text style={styles.messageText}>{message}</Text> : null}
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
    height:'100%',
  },
  header: {
    position: 'absolute',
    top: '15%', // Ajuste para centralizar o título
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'sans-serif',
  },
  form: {
    position: 'absolute',
    top: '35%', // Ajuste para o formulário
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    color: 'white',
    fontSize: 18,
    fontFamily:'sans-serif',
    marginBottom: 5,
    marginLeft: '5%', // Alinha com o input
  },
  input: {
    color: 'white',
    fontSize: 15,
    fontFamily:'sans-serif',
    borderColor: 'black',
    borderWidth: 0.5,
    width: '90%', // Ajustado para ser mais flexível
    borderRadius: 10,
    backgroundColor: 'rgba(66, 91, 181, 0.3)',
    marginLeft: '5%',
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#007bff', // Cor azul para o botão
    width: '90%',
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
});
