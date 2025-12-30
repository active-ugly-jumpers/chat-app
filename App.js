// Main entry point for the chat application
import React, { useEffect } from "react";
import { Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNetInfo } from "@react-native-community/netinfo";
import { getDatabase, goOffline, goOnline } from "firebase/database";
import { getStorage } from "firebase/storage";
import { storage } from "./config/firebaseConfig";

// Import screen components
import Start from "./components/Start";
import Chat from "./components/Chat";
import { app } from "./config/firebaseConfig";

const Stack = createNativeStackNavigator();
/* const storage = getStorage(app);
 */
const App = () => {
  // Get the current network connection status
  const connectionStatus = useNetInfo();
  const db = getDatabase(app);

  // Listen for changes in network connectivity and update Firebase connection accordingly
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
      {/* Set up navigation stack with Start and Chat screens */}
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
              isConnected={connectionStatus.isConnected}
              storage={storage}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
