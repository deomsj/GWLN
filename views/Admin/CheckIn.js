import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  Alert,
  Platform
} from 'react-native';
import { Icon } from 'react-native-elements';
import t from 'tcomb-form-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import '../../global';
const Form = t.form.Form;

let form;
let button;

const LikeRadio = t.enums.of('Yes No');

const AttendeeGuest = t.struct({
  name: t.String,
  surname: t.String,
  email: t.String,
  like_radio: LikeRadio
});

const OptionsGuest = {
  fields: {
    name: {
      label: 'First Name',
      error: 'Please enter attendee first name'
    },
    surname: {
      label: 'Last Name',
      error: 'Please enter attendee last name'
    },
    like_radio: {
      label: 'Would you like to hear from GWLN?',
      options: [{ value: 't', text: 'Yes' }, { value: 'f', text: 'No' }]
    }
  }
};

const AttendeeMember = t.struct({
  email: t.String
});

const OptionsMember = {
  fields: {
    email: {
      label: 'Email'
    }
  }
};

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
    this.state = {
      value: null,
      selectedIndex1: null,
      selectedIndex2: null,
      val1: null,
      val2: null,
      meminfo: null
    };
  }

  initialState = () => {
    this.setState({
      value: null,
      selectedIndex1: -1,
      selectedIndex2: -1,
      val1: null,
      val2: null
    });
  };

  DiscardForm = value => {
    Alert.alert(
      'Discard Check-in',
      'Are you sure you want to clear attendee information?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => this.initialState() }
      ]
    );
  };

  static navigationOptions = ({ navigation }) => {
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
          Event Check In{' '}
        </Text>
      ),
      headerRight: (
        <Icon
          containerStyle={{ marginRight: 15, marginTop: 15 }}
          iconStyle={styles.headerIcon}
          type="font-awesome"
          name="trash"
          onPress={navigation.getParam('discard')}
        />
      )
    };
  };

  componentDidMount = value => {
    this.props.navigation.setParams({ discard: this.DiscardForm });
  };

  onChange(value) {
    this.setState({ value: value });
  }

  onSelect_1(index, value) {
    this.setState({
      selectedIndex1: index,
      val1: value
    });
  }

  determineForm = selected => {
    var buttonColors = ['rgba(255, 255, 255, 1)'];
    if (Platform.OS === 'android') {
      buttonColors = ['rgba(0, 42, 85, 1)'];
    }
    const guestform = (
      <View style={styles.formContainer}>
        <Form
          ref={c => (this._form = c)}
          type={AttendeeGuest}
          options={OptionsGuest}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Check In!"
            onPress={this.onSubmitGuest}
            color={buttonColors}
          />
        </View>
      </View>
    );

    const memform = (
      <View style={styles.formContainer}>
        <Form
          ref={c => (this._form = c)}
          type={AttendeeMember}
          options={OptionsMember}
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Check In!"
            onPress={this.getMemberInfo}
            color={buttonColors}
          />
        </View>
      </View>
    );

    if (selected == 0) {
      form = memform;
    } else if (selected == 1) {
      form = guestform;
    } else {
      return (
        <Text style={styles.textBox}>
          Photo Disclaimer:
          {'\n'}
          As representatives of World Council, Sister Society Leaders may take
          photos at this event and reproduce them in World Council educational,
          news or promotional materials, whether in print, electronic, or other
          media, including the World Council or Global Women website. By
          participation in the Sister Society meeting, you grant World Council
          the right to use your photograph, name, and biography for such
          purposes. All pictures become the property of World council and may be
          displayed distributed or used by World Council for any purpose.
        </Text>
      );
    }

    return form;
  };

  onSubmitGuest = () => {
    console.log('on submit value', this.state.value);

    if (this.state.value) {
      const url = 'https://cuwomen.org/functions/app.gwln.php';
      fetch(url, {
        method: 'POST',
        headers: {
          'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
        },
        body: JSON.stringify({
          code: 'eventCheckin',
          arguments: {
            timeline_event_id: this.props.navigation.state.params
              .CheckInEventID,
            first_name: this.state.value.name,
            last_name: this.state.value.surname,
            email: this.state.value.email,
            guests: 1,
            like_to_be: this.state.value.like_radio
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            console.log(res);
            Alert.alert('Thank you!', 'Attendee has been checked in', [
              { text: 'Dismiss', onPress: this.initialState }
            ]);
          } else {
            console.log('wrong info');
          }
        })
        .catch(error => {
          console.log(error);
        });
      console.log('fetch');
    }
  };

  //really messy. API call inside API call
  getMemberInfo = () => {
    console.log('on submit value', this.state.value);
    if (this.state.value) {
      const url = 'https://cuwomen.org/functions/app.gwln.php';
      fetch(url, {
        method: 'POST',
        headers: {
          'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
        },
        body: JSON.stringify({
          code: 'getMemberInformationByUsername',
          arguments: {
            timeline_event_id: this.props.navigation.state.params
              .CheckInEventID,
            username: this.state.value.email
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            this.setState({
              meminfo: res
            });

            //Nested API call
            if (this.state.value) {
              console.log('in sumit', this.state.meminfo);
              const url = 'https://cuwomen.org/functions/app.gwln.php';
              fetch(url, {
                method: 'POST',
                headers: {
                  'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
                },
                body: JSON.stringify({
                  code: 'eventCheckin',
                  arguments: {
                    timeline_event_id: this.props.navigation.state.params
                      .CheckInEventID,
                    member_id: this.state.meminfo.member_id,
                    first_name: this.state.meminfo.first_name,
                    last_name: this.state.meminfo.last_name,
                    email: this.state.meminfo.email1,
                    guests: 1,
                    like_to_be: false
                  }
                })
              })
                .then(res => res.json())
                .then(res => {
                  if (res) {
                    console.log(res);
                    Alert.alert('Thank you!', 'Attendee has been checked in', [
                      { text: 'Dismiss', onPress: () => this.initialState() }
                    ]);
                  } else {
                    console.log('wrong info');
                  }
                })
                .catch(error => {
                  console.log(error);
                  Alert.alert('Error', 'Email does not exist', [
                    { text: 'Dismiss', onPress: () => this.initialState() }
                  ]);
                });
              console.log('fetch');
            }
          } else {
            console.log('wrong info');
          }
        })
        .catch(error => {
          console.log(error);
        });
      console.log('fetch');
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.radiocontainer}>
          <Text style={styles.questionText}>Are you a member of GWLN? </Text>
          <RadioGroup
            size={18}
            thickness={2}
            style={styles.rg}
            color={'#200a55'}
            selectedIndex={this.state.selectedIndex1}
            onSelect={(index, value) => this.onSelect_1(index, value)}
          >
            <RadioButton value={'member_yes'} style={styles.rb}>
              <Text>Yes</Text>
            </RadioButton>
            <RadioButton value={'member_no'} style={styles.rb}>
              <Text>No</Text>
            </RadioButton>
          </RadioGroup>
        </View>
        <ScrollView>{this.determineForm(this.state.selectedIndex1)}</ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column'
  },
  buttonContainer: {
    alignSelf: 'center',
    paddingHorizontal: 30,
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
    paddingVertical: 1
  },
  formContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  textBox: {
    alignSelf: 'center',
    fontSize: 14,
    color: 'gray',
    paddingHorizontal: 30
  },
  item: {
    flexDirection: 'row',
    padding: 10
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray'
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center'
  },
  //================radioadd=====================
  radiocontainer: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 30
  },
  rb: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  rg: {
    flexDirection: 'row'
  },
  //================radioadd=====================
  headerIcon: {
    color: '#002A55'
  }
});

export default CheckIn;
