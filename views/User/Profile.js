import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  Button,
  Alert
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import GWLNicon from '../../img/Gwln_Icon.jpg';
import contactData from '../../mock-database/crm.contacts.json';
import '../../global';

import call from 'react-native-phone-call';

/*====Notes======
*created a hyperlink for url but put http:// in front of it
  because assuming it isn't in that form in database
*need to figure out how not to show info from no_etc
=================*/
// <Text
//   style={styles.linkText}
//   onPress={() => {Linking.openURL('http://'+global.currUser.web_url)}}>
//   {global.currUser.web_url}
// </Text>
// <Text style={styles.InfoText}> {global.currUser.phone_business_main} </Text>

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      memInfo: contactData
    };
  }

  filterdata = crm => {
    //need to catch error and no_contact stuff
    //will need to format phone number?
    // parameter being passed in will be a global variable that we get at login
    let memData = this.state.memInfo;
    var filteredMemData = memData.contacts.filter(e => {
      return e.contact_id == crm;
    });
    if (filteredMemData != null) {
      this.setState({
        memInfo: filteredMemData
      });
    }
  };

  _signOut = () => {};

  componentDidMount() {
    this.filterdata(global.crm);
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    var buttonColors = ['rgba(255, 255, 255, 1)'];
    if (Platform.OS === 'android') {
      buttonColors = ['rgba(0, 42, 85, 1)'];
    }
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
              call(phoneArgs).catch(console.error);
            }}
          >
            {global.currUser.phone_business_main}
          </Text>
          <Text style={styles.InfoText}> {global.currUser.email1} </Text>
          <Text style={styles.InfoText}>
            {' '}
            {global.currUser.mailing_address_city},{' '}
            {global.currUser.mailing_address_country_name}{' '}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <View style={styles.buttonContainer}>
            <View style={styles.buttons}>
              <Button
                color={buttonColors}
                title="My Events"
                onPress={() =>
                  this.props.navigation.navigate('MyUpcomingEvents')
                }
              />
            </View>
          </View>
          <View style={styles.buttContainer}>
            <View style={styles.buttons}>
              <Button
                color={buttonColors}
                title="Sign Out"
                onPress={() =>
                  Alert.alert(
                    'Sign Out',
                    'Are you sure you want to sign out of your account?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                      },
                      {
                        text: 'Yes',
                        onPress: () => this.props.navigation.navigate('Launch')
                      }
                    ]
                  )
                }
              />
            </View>
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
    paddingVertical: 2,
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
    flexDirection: 'column',
    paddingHorizontal: 40,
    elevation: 0
  }
});
