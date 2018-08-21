import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import GWLNlogo from '../../img/gwln_logo.jpg';
import Donate from '../All/Donate';
import GuestCalendar from './Calendar';
import GuestHome from './Home';
import '../../global';
//import contactData from './../mock-database/crm.contacts.json';

const Guest = createBottomTabNavigator({
  Home: {
    screen: GuestHome,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color={tintColor} size={30} />
      )
    }
  },
  GuestCalendar: {
    screen: GuestCalendar,
    navigationOptions: {
      title: 'Calendar',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="font-awesome" name="calendar" color={tintColor} size={27} />
      )
    }
  },
  GWLN: {
    screen: Donate,
    navigationOptions: {
      title: 'Donate',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="font-awesome" name="dollar" color={tintColor} size={27} />
      )
    }
  }
});

Guest.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let title;
  if (routeName === 'Home') {
    return {
      headerTitle: <Image source={GWLNlogo} style={styles.GWLNlogo} />,
      headerRight: <View />
    };
  } else if (routeName === 'GuestCalendar') {
    return {
      headerTitle: (
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: '#002A55'
          }}
        >
          {' '}
          Calendar{' '}
        </Text>
      ),
      headerLeft: null
    };
  } else if (routeName === 'GWLN') {
    return {
      headerTitle: (
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: '#002A55'
          }}
        >
          {' '}
          Help Support Our Cause{' '}
        </Text>
      ),
      headerLeft: null
    };
  }
  return {
    title
  };
};

export default Guest;

const styles = StyleSheet.create({
  GWLNlogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  }
});
