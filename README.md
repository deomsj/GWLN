# GWLN Mobile Application

## Table of Contents

- [File Structure](#file-structure)
- [Development Workflow](#development-workflow)
- [Testing Workflow](#testing-workflow)
- [Build for Distribution](#build-for-distribution)
- [Project History](#project-history)
- [Create React Native App](./ReactNativeApp.md)

## File Structure

### Folder Structure

- `./src/screens` - React components used to render screens, organized by role
- `./src/components` - React components reused across multiple screens
- `./src/assets` - images, mock-data, and other static assets
- `./src/config` - configure app to behave differently
- `./node_modules` - third-party code (managed exclusively via npm commands)

### Important Files

- [`./App.js`](./App.js) - entry point for JavaScript Source Code
- [`./src/screens/routes.js`](./src/screens/routes.js) - routes for navigating between views
- [`./src/screens/All/SignIn.js`](./src/screens/All/SignIn.js) - first screen rendered when app loads
- [`./src/config/loginCredentials.js`](./src/config/loginCredentials.js) - in development, pre-fill the SignIn form with credentials to build out views for a guest, member, or admin
- [`./app.json`](./app.json) - configuration for expo builds
- [`./package.json`](./package.json) - npm scripts and dependencies
- [`./.eslintrc`](./.eslintrc) - configuration for [JavaScript Linting](https://eslint.org/docs/about/)
- [`./ReactNativeApp.md`](./ReactNativeApp.md) - Create React Native App default ReadMe.md

## Development Workflow

1. migrate this repository to whatever version control system your team intents to use (or fork the repo on github)
2. clone the project to your machine
3. navigate to the root of the project that you cloned to your machine
4. `npm run ios` - bundle project and serve locally to an iOs simulator
5. `npm run android` - bundle project and serve locally to an android simulator

note: configuring android and ios simulators on your machine to display the result of your expo project will vary across different machines, b ut expo provides very helpful documentation on this: [https://docs.expo.io/versions/v29.0.0/workflow/debugging](https://docs.expo.io/versions/v29.0.0/workflow/debugging)

## Testing Workflow

### Current Expo Credentials used for testing:

- Username: Brooke.thomas@elevationscu.com
- Password: Password01!

### Publish the App for Testing

1. `npm install expo-cli --global` - install expo in your terminal
2. `exp login` - Login to the expo account with the expo credentials above
3. `exp start` then `exp publish` (in separate terminals) - this will build and deploy code to be consumed by the Expo Client App on testers' devices (must use the same expo account credentials)

### Tester (no coding required)

1. download the Expo Client App onto your device from the App Store (android or iOS)
2. go to https://expo.io/@brookethomas/glwn-event-app
3. Login to the expo account with the expo credentials above
4. Enter your cell or email in the ‘Request a Link’ Section of the GWLN project page
5. From your device, click the link that you just sent yourself from the expo project website. This will open the Expo Client App on your device and you will will be able to test the most recently 'published' version of the app.

### Want More Information?

Please refer to the Expo Docs

- [Expo Cli Set Up](https://docs.expo.io/versions/v29.0.0/workflow/exp-cli)
- [Publishing to Expo](https://docs.expo.io/versions/latest/workflow/publishing)

## Build for Distribution

Short version:

- Android - `exp build:android`
- iOs - `exp build:ios`

Long Version:
[https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md#sharing-and-deployment](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md#sharing-and-deployment)

## Project History

### Contributors

- Elevations Credit Union

  - Brooke Thomas
  - Wes Saunders
  - Angie McCurdy
  - Abbi Nicholson
  - Sofia Mehrotra
  - Richard Morley

- CapTech Ventures

  - Matt Penny
  - Jesse DeOms
  - Mark Broski

### Earlier versions of this Application

- Elevations Credit Union: Summer Internship 2018
  - [https://github.com/rjmorley/GWLN-App/blob/master/App.js](https://github.com/rjmorley/GWLN-App/blob/master/App.js)
