import { createStackNavigator } from 'react-navigation';
import routes from './src/screens/routes';

const NavigationFlow = createStackNavigator(routes, {
  initialRouteName: 'SignIn'
});

export default NavigationFlow;

// During Testing: hide warnings from expo client app and simulator
console.disableYellowBox = true;
