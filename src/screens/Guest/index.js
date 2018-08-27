import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';

import * as Icons from '../../components/Icons';
import GWLNlogo from '../../assets/img/gwln_logo.jpg';
import Donate from '../All/Donate';
import EventCalendar from '../All/EventCalendar';
import GuestHome from './Home';

const Guest = createBottomTabNavigator({
  Home: {
    screen: GuestHome,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: Icons.Home
    }
  },
  EventCalendar: {
    screen: EventCalendar,
    navigationOptions: {
      title: 'Calendar',
      tabBarIcon: Icons.Calendar
    }
  },
  GWLN: {
    screen: Donate,
    navigationOptions: {
      title: 'Donate',
      tabBarIcon: Icons.Donate
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
  } else if (routeName === 'EventCalendar') {
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
          Event Calendar
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
          Help Support Our Cause
        </Text>
      ),
      headerLeft: <View />,
      headerRight: <View />
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
