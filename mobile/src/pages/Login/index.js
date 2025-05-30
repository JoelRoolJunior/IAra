import { View, Text, TextInput, StyleSheet,TouchableOpacity, Image} from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'


export default function Login() {
  const navigation = useNavigation()
  return (
    
    <View style={styles.container}>
      
      
      <LinearGradient colors={['#87CEEB','#120A8F']} start={{x: 0.3, y:0}} style={styles.background} />
      <View style={styles.containerLogo}>
        <Animatable.Image animation="flipInY"  source={require('../../../image/logo/logo.png')} style={styles.logo} resizeMode="contain"/>
      </View>

      <Animatable.View animation="fadeInUp"  style={styles.Login}>
      
        <Text style={styles.textoLogin}>Login</Text>
          <TextInput style={styles.textoInput} placeholder='LOGIN'/>
        <Text style={styles.textoLogin}>Senha</Text>
          <TextInput style={styles.textoInput} placeholder=''/>

          <TouchableOpacity style={styles.button} onPress={ ()=> navigation.navigate('Chat')}>
              <Text  style={{ color: 'white' }}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.textoAviso}>Novo por aqui? Cadastre-se</Text>
          <Text style={styles.textoAviso}>Esqueceu a Senha?</Text>
      </Animatable.View>  
    </View>
  )
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
      marginTop: 10
    },
    textoAviso:{
      color: 'white',
      alignSelf: 'center', 
      textDecorationLine: 'underline',
      marginTop: 25
    },
    logo:{
      width: '40%',
      alignSelf: 'center', 
      position: 'absolute',
      top: '0%'

    },
    containerLogo:{
        backgroundColor: 'black'
        
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
    }
  })