import 'react-native-gesture-handler';
import {
  NavigationContainer,
  useNavigation,
  DrawerActions,
} from '@react-navigation/native';
import Homepage from './src/screens/Homepage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Entypo';
import DrawerContent from './DrawerContent';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import ForgotPassword from './src/screens/ForgotPass';
import ResetPassword from './src/screens/ResetPass'
import AddNewNote from './src/screens/AddNewNote';
import ViewNotes from './src/screens/ViewNotes';
import React from 'react';
import Notes from './src/screens/Notes';
import UploadNotes from './src/screens/UploadNotes';
import ViewUploadNotes from './src/screens/ViewUploadNotes';

const StackNav = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: '#0163d2',
        headerStyle: {
          backgroundColor: '#0163d2',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
        headerShown: false
      }}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="Home"
        component={Homepage}
        options={{
          headerLeft: () => {
            return (
              <Icon
                name="menu"
                onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                size={30}
                color="#fff"
              />
            );
          },
        }}
      />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="AddNewNote" component={AddNewNote} />
      <Stack.Screen name="ViewNotes" component={ViewNotes} />
      <Stack.Screen name="Notes" component={Notes} />
      <Stack.Screen name="UploadNotes" component={UploadNotes} />
      <Stack.Screen name="ViewUploadNotes" component={ViewUploadNotes} />
    </Stack.Navigator>
  );
};

const DrawerNav = () => {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen name="Homepage" component={StackNav} />
      <Drawer.Screen name="Login/Signup" component={Login} />
      <Drawer.Screen name="Add Notes" component={AddNewNote} />
      <Drawer.Screen name="Upload Notes" component={UploadNotes} />
    </Drawer.Navigator>
  );
};
function App() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
}
export default App;