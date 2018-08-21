import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Linking,
  Platform,
  Alert
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import t from 'tcomb-form-native';
import GWLNlogo from '../../img/gwln_logo.jpg';
import WorldCouncilLogo from '../../img/WorldCouncil_logo.png';
import memberData from '../../mock-database/gwln.members.json';

//Dev Only
const defaultValue = {
  email: 'Brooke.thomas@elevationscu.com',
  password: 'abc123'
};
const Form = t.form.Form;
// overriding the text color for every textbox in every form of your app
Form.stylesheet.textbox.normal.fontSize = 16;

const SigninForm = t.struct({
  email: t.String, //change to EmailField for email format validation
  password: t.String
});

var options = {
  fields: {
    email: {
      label: 'Email',
      error: 'Please enter a valid email'
    },
    password: {
      label: 'Password',
      error: 'Please enter a valid password',
      password: true,
      secureTextEntry: true
    }
  }
};

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: memberData
    };
  }

  resetForm = value => {
    this.setState({ value: null });
  };

  static navigationOptions = {
    header: null
  };

  // dbeck@wuccu admin
  //STILL NEED TO ADD DIFFERENTIATION FLAG TO SIGN IN BUTTON

  DiscardForm = value => {
    Alert.alert(
      'Invalid Username or Password',
      'Please try again or forgot password',
      [{ text: 'Dismiss', onPress: this.resetForm }]
    );
  };

  handleSubmit = () => {
    //STILL NEED TO ADD DIFFERENTIATION FLAG TO SIGN IN BUTTON
    const value = this._form.getValue();
    console.log('value', value);
    if (value) {
      const url = 'https://cuwomen.org/functions/app.gwln.php';
      fetch(url, {
        method: 'POST',
        headers: {
          'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
        },
        body: JSON.stringify({
          code: 'login',
          arguments: {
            username: value.email,
            password: value.password
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res != false) {
            global.currUser = res;
            if (global.currUser.is_event_admin) {
              this.props.navigation.navigate('Admin');
            } else {
              this.props.navigation.navigate('Member');
            }

            this.resetForm;
          } else {
            console.log('wrong creds');
            this.DiscardForm();
          }
        })
        .catch(error => {
          console.log(error);
        });
      console.log('fetch');
    }
  };

  render() {
    var buttonColors = ['rgba(255, 255, 255, 1)'];
    if (Platform.OS === 'android') {
      buttonColors = ['rgba(0, 42, 85, 1)'];
    }
    var guestColor = ['rgba(0, 42, 85, 1)'];
    if (Platform.OS === 'android') {
      guestColors = ['rgba(255, 255, 255, 1)'];
    }
    return (
      <View style={styles.mainContainer}>
        <View style={styles.logoContainer}>
          <Image source={GWLNlogo} style={styles.GWLNlogo} />
        </View>
        <View style={styles.formContainer}>
          <Form
            ref={c => (this._form = c)}
            type={SigninForm}
            options={options}
            value={defaultValue}
          />
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttons}>
            <Button
              title="Sign In"
              onPress={this.handleSubmit}
              color={buttonColors}
            />
          </View>
          <Text
            style={styles.memberText}
            onPress={() => {
              Linking.openURL(
                'https://www.cuwomen.org/gwln_connect/gwln_forgot_password'
              );
            }}
          >
            Forgot Password?
          </Text>
        </View>
        <View style={styles.separatorContainer} />
        <Text style={styles.separatorText}>OR</Text>
        <View style={styles.guestContainer}>
          <Text
            style={styles.guestButton}
            onPress={() => this.props.navigation.navigate('Guest')}
          >
            Continue as Guest
          </Text>
        </View>
        <Image source={WorldCouncilLogo} style={styles.WorldCouncil} />
      </View>
    );
  }
}

export default Signin;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column'
  },
  formContainer: {
    paddingHorizontal: 50,
    backgroundColor: 'white'
  },
  buttonContainer: {
    alignSelf: 'center',
    paddingVertical: 15
  },
  buttons: {
    paddingVertical: 1,
    paddingHorizontal: 40,
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
    borderRadius: 10,
    elevation: 0
  },
  memberText: {
    color: 'blue',
    fontSize: 17,
    padding: 15,
    paddingBottom: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  logoContainer: {
    position: 'absolute',
    top: '5%',
    alignSelf: 'center'
  },
  GWLNlogo: {
    resizeMode: 'contain',
    width: undefined,
    height: undefined,
    paddingHorizontal: 150,
    paddingVertical: 40
  },
  WorldCouncil: {
    resizeMode: 'contain',
    width: undefined,
    height: undefined,
    paddingTop: 100,
    paddingHorizontal: 75,
    position: 'absolute',
    bottom: '0%',
    right: '5%'
  },
  guestContainer: {
    alignSelf: 'center'
  },
  guestButton: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderColor: '#002A55',
    color: '#002A55',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
    fontWeight: '400'
  },
  separatorText: {
    fontSize: 20,
    fontWeight: '300',
    color: 'gray',
    backgroundColor: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    bottom: '2%'
  },
  separatorContainer: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'lightgray',
    height: StyleSheet.hairlineWidth,
    padding: 1
  }
});
