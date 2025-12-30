import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";
import CustomActions from "./CustomActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { database } from "../config/firebaseConfig";
import MapView from "react-native-maps";

const Chat = ({ route, navigation, isConnected, storage }) => {
  const { name = "Guest", bgColor = "#FFFFFF" } = route.params || {};
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);



  const STORAGE_KEY = "chat_messages";

  const saveMessages = async (messagesToSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(messagesToSave));
    } catch (error) {
      console.log("Error saving messages:", error);
    }
  };

  const loadCachedMessages = async () => {
    try {
      const cachedMessages = await AsyncStorage.getItem(STORAGE_KEY);
      if (cachedMessages) {
        setMessages(JSON.parse(cachedMessages));
        console.log("Loaded cached messages");
      }
    } catch (error) {
      console.log("Error loading cached messages:", error);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
    const messagesRef = database.ref("messages");

    const handleValue = (snapshot) => {
      const data = snapshot.val() || {};
      const messagesArray = Object.keys(data)
        .map((key) => ({
          _id: key,
          text: data[key].text || "",
          image: data[key].image || null,
          location: data[key].location || null,
          createdAt: new Date(data[key].createdAt),
          user: {
            _id: data[key].userId,
            name: data[key].userId === 1 ? name : "Guest",
          },
        }))
        .sort((a, b) => b.createdAt - a.createdAt);

      setMessages(messagesArray);
      saveMessages(messagesArray);
    };

    if (isConnected) {
      messagesRef.on("value", handleValue);
    } else {
      loadCachedMessages();
      Alert.alert("You're offline. Messages are loaded from cache.");
    }

    return () => messagesRef.off("value", handleValue);
  }, [isConnected]);

  const onSend = (newMessages = []) => {
    if (!isConnected) {
      Alert.alert("You're offline — messages cannot be sent");
      return;
    }

    setMessages((prev) => GiftedChat.append(prev, newMessages));

    newMessages.forEach((msg) => {
      const messageData = {
        userId: 1,
        createdAt: msg.createdAt.getTime(),
      };

      if (msg.text && msg.text.trim() !== "") messageData.text = msg.text;
      if (msg.image) messageData.image = msg.image;
      if (msg.location) {
        messageData.location = {
          latitude: msg.location.latitude,
          longitude: msg.location.longitude,
        };
      }

      database.ref("messages").push(messageData);
    });
  };

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: '#000' },
        left: { backgroundColor: '#FFF' },
      }}
    />
  );

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage?.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}> 
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: 1, name }}
        renderBubble={renderBubble}
        renderActions={(props) => (
          <CustomActions {...props} onSend={onSend} storage={storage} />
        )}
        renderCustomView={renderCustomView}
        renderInputToolbar={renderInputToolbar}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
