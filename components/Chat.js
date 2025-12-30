import { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import {
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  const { name, background, userID } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;

  // Effect hook to set navigation title
  useEffect(() => {
    navigation.setOptions({ title: name });
    if (isConnected === true) {
      // Unregister current onSnapshot() listener to avoid registering multiple listeners when useEffect code is re-executed
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Call this function if the isConnect prop is false in useEffect()
  const loadCachedMessages = async () => {
    // The empty array is for cachedMessages in case AsyncStorage() fails when the messages item hasn't been set yet in AsyncStorage
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // // Effect hook for messages
  // useEffect(() => {
  //   if (isConnected === true){
  //     if (unsubMessages) unsubMessages();
  //     unsubMessages = null;

  //   }
  //   // Create a query to get the "messages" collection from the Firestore database
  //   const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
  //   // This function will be called whenever there are changes in the collection
  //   unsubMessages = onSnapshot(q, (documentsSnapshot) => {
  //     let newMessages = [];
  //     // Iterate through each document in the snapshot
  //     documentsSnapshot.forEach((doc) => {
  //       newMessages.push({
  //         id: doc.id,
  //         ...doc.data(),
  //         createdAt: new Date(doc.data().createdAt.toMillis()),
  //       });
  //       cacheMessages(newMessages);
  //       setMessages(newMessages);
  //     });
  //   } else loadCachedMessages();

  //   // Clean up code
  //   return () => {
  //     if (unsubMessages) unsubMessages();
  //   };
  // }, []);

  // Function to handle sending messages
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };

  // Function to handle chat bubble styling
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{ _id: userID, name: name }}
      />
      {/* Fixes a device-specific blocked keyboard problem */}
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