import { createStackNavigator } from 'react-navigation';
import routes from './src/screens/routes';

const NavigationFlow = createStackNavigator(routes, {
  initialRouteName: 'SignIn'
});

export default NavigationFlow;

// During a session, the user's information is stored here
global.currUser = null;

// During Testing: hide warnings from expo client app and simulator
console.disableYellowBox = true;
