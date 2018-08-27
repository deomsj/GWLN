import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import GWLNlogo from '../../img/gwln_logo.jpg';
import Donate from '../All/Donate';
import Profile from '../User/Profile';
import EventCalendar from '../All/EventCalendar';
import MemberHome from './Home';
import '../../global';
//import contactData from './../mock-database/crm.contacts.json';

const Member = createBottomTabNavigator({
  Home: {
    screen: MemberHome,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" color={tintColor} size={30} />
      )
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: ({ tintColor }) => (
        <Icon type="font-awesome" name="user" color={tintColor} size={30} />
      )
    }
  },
  EventCalendar: {
    screen: EventCalendar,
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

Member.navigationOptions = ({ navigation }) => {
  let { routeName } = navigation.state.routes[navigation.state.index];
  let title;
  if (routeName === 'Home') {
    return {
      headerTitle: <Image source={GWLNlogo} style={styles.GWLNlogo} />,
      headerLeft: <View />,
      headerRight: <View />
    };
  } else if (routeName === 'Profile') {
    return {
      headerTitle: (
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            fontWeight: '300',
            fontSize: 20,
            color: '#002A55'
          }}
        >
          {global.currUser.first_name} {global.currUser.last_name}
        </Text>
      ),
      headerLeft: <View />,
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
      headerLeft: <View />,
      headerRight: <View />
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

export default Member;

const styles = StyleSheet.create({
  GWLNlogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  }
});
