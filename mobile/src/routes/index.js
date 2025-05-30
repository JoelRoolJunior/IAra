import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../pages/Welcome';
import Signin from '../pages/Signin';
import Login from '../pages/Login';
import Chat from '../pages/Chat/Index';

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
      <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}}/>
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
      <Stack.Screen name="Chat" component={Chat} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
