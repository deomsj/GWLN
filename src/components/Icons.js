import React from 'react';
import { Icon } from 'react-native-elements';

export const Home = ({ tintColor }) => (
  <Icon name="home" color={tintColor} size={30} />
);

export const Profile = ({ tintColor }) => (
  <Icon type="font-awesome" name="user" color={tintColor} size={30} />
);

export const Calendar = ({ tintColor }) => (
  <Icon type="font-awesome" name="calendar" color={tintColor} size={27} />
);

export const Donate = ({ tintColor }) => (
  <Icon type="font-awesome" name="dollar" color={tintColor} size={27} />
);
