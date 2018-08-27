import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import * as Icons from '../../components/Icons';
import GWLNlogo from '../../assets/img/gwln_logo.jpg';
import Donate from '../All/Donate';
import Profile from '../User/Profile';
import EventCalendar from '../All/EventCalendar';
import AdminHome from './Home';

const Admin = createBottomTabNavigator({
  Home: {
    screen: AdminHome,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: Icons.Home
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: 'Profile',
      tabBarIcon: Icons.Profile
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

Admin.navigationOptions = ({ navigation }) => {
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
      headerStyle: {
        backgroundColor: '#002a55',
        borderColor: '#002A55',
        elevation: 0
      },
      headerTitle: (
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            alignSelf: 'center',
            fontWeight: '400',
            fontSize: 20,
            color: 'white'
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
      headerLeft: <View />,
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
      headerRight: (
        <Icon
          containerStyle={{ paddingRight: 30, paddingTop: 15 }}
          iconStyle={styles.headerIcon}
          type="font-awesome"
          name="plus"
          onPress={() => navigation.navigate('CreateEvent')}
        />
      )
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

export default Admin;

const styles = StyleSheet.create({
  headerIcon: {
    flex: 1,
    color: '#002A55'
  },
  GWLNlogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '100%',
    height: '100%'
  }
});
