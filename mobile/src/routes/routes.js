import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


import Welcome from '../pages/Welcome/Welcome'
import Login from '../pages/Login/Login';
import Signin from '../pages/Signin/Signin';
import ForgotPassword from '../pages/Password';
import Chat from '../pages/Chat/Chat';
import LearningModules from '../pages/Learning/LearningModules';
import ModuleDetail from '../pages/Learning/ModuleDetail';
import FakeNewsGame from '../pages/Learning/FakeNewsGame';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function LearningStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="LearningModules" component={LearningModules} />
      <Stack.Screen name="ModuleDetail" component={ModuleDetail} />
      <Stack.Screen name="FakeNewsGame" component={FakeNewsGame} />
    </Stack.Navigator>
  );
}

function HomeDrawer() {
  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false, 
      drawerActiveTintColor: '#87CEEB', 
      drawerInactiveTintColor: 'white', 
      drawerStyle: {
        backgroundColor: '#120A8F', 
      },
      drawerLabelStyle: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      headerRightContainerStyle: {
        paddingRight: 15, 
      },
     }}
    >
      <Drawer.Screen
        name="ChatDrawer"
        component={Chat}
        options={{
          title: 'Chat com IAra', 
          headerShown: true, 
          headerStyle: {
            backgroundColor: '#120A8F',
          },
          headerTintColor: 'white', 
          headerLeft: ({ navigation }) => (
            <TouchableOpacity
              onPress={() => navigation.toggleDrawer()}
              style={styles.drawerIcon}
            >
              <Text style={styles.drawerIconText}>☰</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="LearningStack"
        component={LearningStack}
        options={{ title: 'Módulos de Aprendizado' }}
      />
    </Drawer.Navigator>
  );
}

export default function Routes() { 
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

        <Stack.Screen name="HomeDrawer" component={HomeDrawer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerIcon: {
    marginLeft: 15,
    padding: 5,
  },
  drawerIconText: {
    fontSize: 24,
    color: 'white',
  },
});
