import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { getAuth, signInAnonymously } from 'firebase/auth';

const Start = ({ navigation }) => {
  const auth = getAuth();
  const [name, setName] = useState('');
  const [background, setBackground] = useState('');
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

  const signInUser = () => {
    signInAnonymously(auth)
      .then((result) => {
        navigation.navigate('Chat', {
          userID: result.user.uid,
          name: name,
          background: background,
        });
        Alert.alert('Signed in Successfully!');
      })
      .catch((error) => {
        Alert.alert('Unable to sign in, try again later.');
      });
  };

  return (
    <View style={styles.container}>
      {/* Background Wallpaper */}
      <ImageBackground
        source={require('../assets/Background Image.png')}
        style={styles.imageBackground}
      >
        {/* Title of page */}
        <Text style={styles.title}>Welcome!</Text>
        {/* Container for username and color background selection */}
        <View style={styles.box}>
          {/* User Types Name */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
          {/* User Selects Background Color */}
          <Text style={styles.chooseBgColor}>Choose Background Color</Text>
          <View style={styles.colorButtonContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  background === color && styles.selectedColor,
                ]}
                onPress={() => setBackground(color)}
              />
            ))}
          </View>
          {/* User Navigates to Chat */}
          <TouchableOpacity style={styles.button} onPress={signInUser}>
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
        {/* Fixes a device-specific blocked keyboard problem */}
        {Platform.OS === 'ios' ? (
          <KeyboardAvoidingView behavior="padding" />
        ) : null}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  title: {
    fontSize: 45,
    fontWeight: '600',
    color: '#fff',
    margin: 25,
  },
  box: {
    backgroundColor: '#fff',
    width: '88%',
    height: '44%',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
  },
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 15,
    marginBottom: 15,
    fontSize: 16,
    fontWeight: '300',
    opacity: 100,
  },
  chooseBgColor: {
    color: '#757083',
    fontSize: 16,
    fontWeight: '300',
    opacity: 100,
  },
  colorButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 5,
  },
  selectedColor: {
    borderColor: '#c0c0c0',
    borderWidth: 5,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#757083',
    borderRadius: 4,
    height: '20%',
    justifyContent: 'center',
    padding: 10,
    width: '88%',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Start;