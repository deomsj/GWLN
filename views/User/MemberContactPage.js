import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import call from 'react-native-phone-call';
import HTML from 'react-native-render-html';
import GWLNicon from '../../img/Gwln_Icon.jpg';

const DEFAULT_PROPS = {
  tagsStyles: {
    p: {
      color: 'white',
      fontSize: 17,
      paddingBottom: 30,
      paddingHorizontal: 30
    }
  }
};
class MemberContactPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#002a55',
        elevation: 0
      },
      headerTintColor: 'white',
      shadowColor: 'transparent'
    };
  };

  determineAbout = info => {
    if (info != null) {
      if (/<[a-z][\s\S]*>/i.test(info)) {
        return <HTML {...DEFAULT_PROPS} html={info} />;
      } else {
        return <Text style={styles.contactText}>{info}</Text>;
      }
    } else {
      return <Text style={styles.contactText}>No additional information</Text>;
    }
  };

  ComponentDidMount() {}
  render() {
    console.log(this.props.navigation.state.params.user);
    const phoneArgs = {
      number: this.props.navigation.state.params.user.phone_business_main,
      prompt: true
    };
    return (
      <View style={styles.mainContainer}>
        <Image source={GWLNicon} style={styles.profilePic} />

        <Text style={styles.NameText}>
          {' '}
          {this.props.navigation.state.params.user.first_name}{' '}
          {this.props.navigation.state.params.user.last_name}
        </Text>
        <Text style={styles.locationText}>
          {' '}
          {this.props.navigation.state.params.user.mailing_address_city},{' '}
          {this.props.navigation.state.params.user.mailing_address_country_name}{' '}
        </Text>
        <ScrollView>
          <View style={styles.ContactContainer}>
            <Text style={styles.titleText}>Phone:</Text>
            <Text
              style={styles.contactText}
              onPress={() => {
                call(phoneArgs).catch(console.error);
              }}
            >
              {this.props.navigation.state.params.user.phone_business_main}
            </Text>
            <Text style={styles.titleText}>Email:</Text>
            <Text style={styles.contactText}>
              {this.props.navigation.state.params.user.email1}{' '}
            </Text>
            <Text style={styles.titleText}>About:</Text>
            {this.determineAbout(
              this.props.navigation.state.params.user.additional_info
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#002a55'
  },
  profilePic: {
    padding: 35,
    alignItems: 'center',
    alignSelf: 'center',
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
    ...Platform.select({
      ios: {
        width: '20%',
        borderWidth: 5,
        borderColor: 'white',
        borderRadius: 20
      },
      android: {
        borderRadius: 50
      }
    }),
    marginTop: '5%'
  },
  ContactContainer: {
    flexDirection: 'column',
    padding: 10,
    paddingTop: 20
  },
  NameText: {
    paddingTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white'
  },
  locationText: {
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  },
  contactText: {
    color: 'white',
    fontSize: 17,
    paddingBottom: 30,
    paddingHorizontal: 30
  },
  titleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 30
  }
});

export default MemberContactPage;
