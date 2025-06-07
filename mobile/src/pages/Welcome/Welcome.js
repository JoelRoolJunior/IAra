import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native'
import React from 'react'

import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient';

export default function Welcome() {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#87CEEB','#120A8F']} start={{x: 0.3, y:0}} style={styles.background} />
      <View style={styles.form}>
        
        <Text style={styles.title}>Olá, </Text>
        <Text style={styles.title}>Bem Vindo a </Text>
        <Text style={styles.title}>IAra</Text>
        <View style={styles.containerLogo}>
          <Animatable.Image animation="flipInY" source={require('../../../image/logo/logo.png')} style={styles.logo} resizeMode="contain"/>
        </View>

      </View>
      <Animatable.View delay={600} animation="fadeInUp"style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={ ()=> navigation.navigate('Login')}>
          <Text  style={{ color: 'white' }}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2}  onPress={ ()=> navigation.navigate('Signin')}>
          <Text  style={{ color: 'white' }}>Cadastro</Text>
        </TouchableOpacity>
      </Animatable.View>
      
    </View>
   
  )
}

const styles = StyleSheet.create({
  container :{
    flex: 1,
    backgroundColor:"#87CEEB"
  },  
  background :{
      position: 'absolute',
      width: '100%',        
      height:'100%',
      flex: 1
    
  },
  button :{
    backgroundColor: 'rgba(8, 144, 199, 0.4)',
    borderRadius: 10,
    paddingVertical: 8,
    width: '60%',
    alignSelf: 'center' ,
    bottom: '-20%',
    alignItems: 'center',
    color: "white",
    borderColor: 'white',
    borderWidth: 1,
  },
  button2 :{
    backgroundColor: 'rgba(8, 144, 199, 0.4)',
    borderRadius: 10,
    paddingVertical: 8,
    width: '60%',
    bottom: '-30%',
    alignSelf: 'center' ,
    alignItems: 'center',
    color: "white",
    borderColor: 'white',
    borderWidth: 1,
  },
  buttons:{
    top: "50%",
    position: 'absolute',
    borderRadius: 10,
    width: '100%',
    alignSelf: 'center' ,
    bottom: '0%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopLeftRadius: "10%",
    borderTopRightRadius: "10%"
    
  },
  title:{
    fontSize: 40,
    color: "white"
  },
  form:{
    marginTop: 38,
    marginBottom: 12,
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 20
  },
  logo:{
    width: '50%',
    height: '50%',
    alignSelf: 'center', 
  }
})