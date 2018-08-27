import React from 'react';
import { StyleSheet, Text, View, Image, Platform, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import GWLNicon from '../../assets/img/Gwln_Icon.jpg';
import '../../config/global';

import call from 'react-native-phone-call';

class Profile extends React.Component {
  render() {
    const phoneArgs = {
      number: global.currUser.phone_business_main,
      prompt: true
    };
    return (
      <View style={styles.mainContainer}>
        <View style={styles.InfoContainer}>
          <Image source={GWLNicon} style={styles.profilePic} />
          <Text style={styles.InfoText}>{global.currUser.title} </Text>
          <Text
            style={styles.InfoText}
            onPress={() => {
              call(phoneArgs).catch(() => {});
            }}
          >
            {global.currUser.phone_business_main}
          </Text>
          <Text style={styles.InfoText}> {global.currUser.email1} </Text>
          <Text style={styles.InfoText}>
            {global.currUser.mailing_address_city},{' '}
            {global.currUser.mailing_address_country_name}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.buttonContainer}>
            <Button
              title="My Events"
              onPress={() => this.props.navigation.navigate('MyUpcomingEvents')}
              buttonStyle={styles.buttons}
            />
          </View>
          <View style={styles.buttContainer}>
            <Button
              buttonStyle={styles.buttons}
              title="Sign Out"
              onPress={() =>
                Alert.alert(
                  'Sign Out',
                  'Are you sure you want to sign out of your account?',
                  [
                    {
                      text: 'Cancel',
                      style: 'cancel'
                    },
                    {
                      text: 'Yes',
                      onPress: () => this.props.navigation.navigate('SignIn')
                    }
                  ]
                )
              }
            />
          </View>
        </View>
      </View>
    );
  }
}
export default Profile;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  InfoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#002a55',
    paddingBottom: 30,
    paddingTop: 20
  },
  InfoText: {
    fontSize: 17,
    color: 'white',
    paddingBottom: 20,
    paddingTop: 10
  },
  profilePic: {
    padding: 35,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    ...Platform.select({
      ios: {
        borderRadius: 20
      },
      android: {
        borderRadius: 50
      }
    })
  },
  optionsContainer: {
    marginTop: '5%',
    alignSelf: 'center',
    marginBottom: '10%'
  },
  buttonContainer: {
    backgroundColor: 'white',
    paddingBottom: 10,
    justifyContent: 'center'
  },
  buttons: {
    height: 40,
    width: 200,
    backgroundColor: '#002A55',
    ...Platform.select({
      ios: {
        borderColor: '#002A55'
      },
      android: {
        borderColor: 'white'
      }
    }),
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 1
  }
});
