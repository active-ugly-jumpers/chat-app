
# Chat App

A cross-platform mobile chat app built with React Native, Expo, and Firebase.

## Features

- Join a chat with a custom username and background color
- Real-time messaging with Google Firestore
- Offline support with local message caching (AsyncStorage)
- Send images (from camera or photo library)
- Share your live location (with map preview)
- Anonymous authentication via Firebase Auth
- Media uploads to Firebase Cloud Storage
- Network-aware: alerts and disables features when offline
- Accessible and screen reader friendly

## Tech Stack & Libraries

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Firebase (Firestore, Auth, Storage)](https://firebase.google.com/)
- [react-native-gifted-chat](https://github.com/FaridSafi/react-native-gifted-chat)
- [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
- [react-native-maps](https://github.com/react-native-maps/react-native-maps)
- [@react-native-community/netinfo](https://github.com/react-native-netinfo/react-native-netinfo)
- [@expo/react-native-action-sheet](https://github.com/expo/react-native-action-sheet)

## Setup & Usage

1. **Clone the repository:**
	```sh
	git clone <repo-url>
	cd chat-app
	```
2. **Install dependencies:**
	```sh
	npm install
	```
3. **Start the Expo development server:**
	```sh
	npm start
	# or
	npx expo start
	```
4. **Run on your device:**
	- Use the Expo Go app (iOS/Android) to scan the QR code, or run on an emulator/simulator.

## Firebase Configuration

This app requires a Firebase project. The Firebase config is set in `App.js`. To use your own Firebase project:

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. Enable Firestore, Authentication (Anonymous), and Storage.
3. Replace the `firebaseConfig` object in `App.js` with your own credentials.

## Accessibility

- All screens and actions are accessible and support screen readers.
- Color contrast and touch targets are designed for usability.

## Folder Structure

- `components/` – Main UI components (Chat, Start, CustomActions)
- `assets/` – Images and static assets

## License

MIT