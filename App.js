import React, { useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";
import { getDatabase, goOffline, goOnline } from "firebase/database";
import { storage } from "./config/firebaseConfig";

// Import main screen components
import Start from "./components/Start";
import Chat from "./components/Chat";
import { app } from "./config/firebaseConfig";


// Create a stack navigator for screen transitions
const Stack = createNativeStackNavigator();

const App = () => {
  // Monitor the current network connection status
  const connectionStatus = useNetInfo();
  // Initialize Firebase Realtime Database instance
  const db = getDatabase(app);

  // React to changes in network connectivity:
  // - If offline, alert the user and set Firebase to offline mode
  // - If online, set Firebase to online mode
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("You are offline. Chat functionality is limited.");
      goOffline(db);
    } else if (connectionStatus.isConnected === true) {
      goOnline(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      {/* Configure navigation stack with Start and Chat screens */}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              {...props}
              isConnected={connectionStatus.isConnected} // Pass network status to Chat
              storage={storage} // Pass Firebase storage instance to Chat
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Export the main App component
export default App;
