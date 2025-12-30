import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useState } from 'react';

const CustomActions = ({ onSend }) => {
  const actionSheet = useActionSheet();

  const onActionPress = () => {
    const options = [
      'Select an image from library',
      'Take a photo',
      'Share location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
            return;
          default:
            return;
        }
      }
    );
  };

  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        onSend({
          _id: Date.now(),
          createdAt: new Date(),
          user: { _id: 1 },
          image: result.assets[0].uri,
        });
      }
    } else {
      Alert.alert("Permissions haven't been granted");
    }
  };

  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) {
        onSend({
          _id: Date.now(),
          createdAt: new Date(),
          user: { _id: 1 },
          image: result.assets[0].uri,
        });
      }
    } else {
      Alert.alert("Permissions haven't been granted");
    }
  };

  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        onSend({
          _id: Date.now(),
          createdAt: new Date(),
          user: { _id: 1 },
          location: {
            longitude: location.coords.longitude,
            latitude: location.coords.latitude,
          },
        });
      } else Alert.alert('Error occurred while fetching location');
    } else Alert.alert("Permissions haven't been granted");
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="More chat options"
      accessibilityHint="Lets you choose to send an image from your device's library, capture a new photo, or share your location"
    >
      <Text style={styles.iconText}>+</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 15,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;
