import { StyleSheet, Text, View } from 'react-native';
// Import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

// The app's main Chat component that renders the chat UI
const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBnOcbLwO-fTmEVtDdh2dV-qS-HIqoYNgc",
    authDomain: "chat-app-93611.firebaseapp.com",
    projectId: "chat-app-93611",
    storageBucket: "chat-app-93611.firebasestorage.app",
    messagingSenderId: "57990901026",
    appId: "1:57990901026:web:8098e237eed28cf547897b"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;