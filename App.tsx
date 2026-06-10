import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerNavigator } from './drawer/DrawerNavigator';
import ViewNewsSection from './screens/ViewNewsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
        <Stack.Screen
          name="ViewNews"
          component={ViewNewsSection}
          options={{
            headerShown: true,
            headerStyle: { backgroundColor: '#1a3a6b' },
            headerTintColor: '#ffffff',
            headerTitle: '',
            headerBackTitle:''
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}