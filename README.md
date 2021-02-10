# mobile-app-applaudo

# MS Kitsu App - Developed with React Native

This is a mobile application for a technical challenge from the company Applaudo Studios, with connection to the Kitsu api: https://kitsu.docs.apiary.io/ to obtain information about Anime and Manga.

The app presents a principal screen with my personal and professional information, and other screens that show a list of differents Anime Series, Manga Series, view all its information in detail, and view a list of favorites.

## Project Versions

| Requeriment  | Version |
| ------------ | ------- |
| Node         | 12.18.3 |
| npm          | 6.14.6  |
| React        | 16.13.1 |
| React Native | 0.63.4  |

## Third Party Libraries Versions

| Dependency                | Version |
| ------------------------- | ------- |
| AsyncStorage              | 1.13.4  |
| NetInfo                   | 5.9.10  |
| React Navigation          | 5.x.x   |
| Axios                     | 0.21.1  |
| React Native Bootsplash   | 3.1.3   |
| React Native Offline      | 5.7.0   |
| React Native Share        | 5.1.1   |
| React Native Vector Icons | 8.0.0   |
| React Redux               | 7.2.2   |
| Redux                     | 4.0.5   |

## Instructions to run the project

### Note:

- Need to have installed Android Studio and Xcode
- Xcode version used for this project: 11.3.1
- Android Studio version used for this project: 3.6.3

#### Run instructions for iOS:

Requeriment: A Mac is required in order to build your app for iOs devices.

- Option 1 - Using a simulator in Xcode: Enter in the project folder && run the command `npx react-native run-ios`
- Option 2 - Plug in your device via USB: Open mobile-app-applaudo/ios/mobileAppApplaudo.xcworkspace in Xcode && Select your device from the list && Hit the Run button

#### Run instructions for Android:

- Option 1 - Using an emulator in Android Studio: Have an Android emulator running && Enter in the project folder && run the command `npx react-native run-android`
- Option 2 - Plug in your device via USB: Connect an android device && Enter in the project folder && run the command `npx react-native run-android`

#### Note:

To fix issues (if there are errors after installing libraries / or doing npm install) or during the first run, try these steps:

- Option 1: Run `npx pod-install ios` in the project folder and then rebuild and re-run the app.

- Option 2: Rebuild and restart the app.

- Option 3: Run the packager with `--reset-cache` flag. The full command is: `npx react-native start --reset-cache`

- Option 4: Run `npx react-native link` in the project root.

- Option 5: (Problems only with Android [app opens and closes immediately in emulator]) Run the command inside the project folder `cd android && ./gradlew clean`
