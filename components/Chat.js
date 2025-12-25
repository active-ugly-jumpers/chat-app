
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Platform, KeyboardAvoidingView } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";


// Chat component receives navigation and route props
const Chat = ({ route, navigation }) => {
  const { name, bgColor } = route.params;
  // State to hold chat messages
  const [messages, setMessages] = React.useState([]);


  // useEffect to set initial messages when component mounts
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: `Welcome to the chat, ${name || "Guest"}!`, // Personalized welcome message
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "Chat Bot",
          avatar: "https://placeimg.com/140/140/any", // Bot avatar image
        },
      },
      {
        _id: 2,
        text: "This is a system message.", // Example system message
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);


  // useEffect to set the navigation bar title to the user's name or 'Chat'
  useEffect(() => {
    navigation.setOptions({ title: name || "Chat" });
  }, [navigation, name]);


  // Render the GiftedChat component with messages and send handler
  return (
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(newMessages) =>
          setMessages((prev) => GiftedChat.append(prev, newMessages))
        }
        user={{ _id: 1 }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : (
        <KeyboardAvoidingView behavior="padding" />
      )}
    </View>
  );
};


// Styles for potential container and text
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
  },
});


// Export the Chat component as default
export default Chat;