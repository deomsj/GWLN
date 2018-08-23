import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import Radio from './Radio';
import { fetchMemberInfo, fetchEventCheckIn } from './Services';
import '../../../global';
import {
  guestForm,
  GuestOptions,
  memberForm,
  MemberOptions
} from './formHelpers';

const Form = t.form.Form;

class CheckIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMember: null, value: null };
  }
  static navigationOptions = () => ({
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
        Event Check In
      </Text>
    )
  });
  onFormChange = value => this.setState({ value });
  goBack = () => this.props.navigation.goBack();
  selectAttendeeType = isMember => this.setState({ isMember });
  wantsToBeContacted = like_to_be => this.setState({ like_to_be });
  onSubmitGuest = () => {
    const memInfo = this.refs.guestForm.getValue();

    if (memInfo) {
      const eventId = this.props.navigation.state.params.CheckInEventID;
      const like_to_be = this.state.like_to_be === 'yes';
      fetchEventCheckIn(eventId, memInfo, like_to_be)
        .then(res => res.json())
        .then(res => {
          if (res && res.checkin_id) {
            const { first_name, last_name } = res;
            this.CheckInSuccess(first_name, last_name);
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          Alert.alert(
            `There was an error checking ${
              memInfo.email
            } in to this event. Please check your email, or try checking in as a guest.`
          );
        });
    }
  };
  getMemberInfo = () => {
    const value = this.refs.memberForm.getValue();
    if (value) {
      const email = value.email.toLowerCase();
      fetchMemberInfo(email)
        .then(res => res.json())
        .then(memInfo => {
          if (memInfo && memInfo.member_id) {
            const eventId = this.props.navigation.state.params.CheckInEventID;
            fetchEventCheckIn(eventId, memInfo)
              .then(res => res.json())
              .then(res => {
                if (res && res.checkin_id) {
                  const { first_name, last_name } = res;
                  this.CheckInSuccess(first_name, last_name);
                } else {
                  throw new Error();
                }
              });
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          Alert.alert(
            `There was an error checking ${email} in to this event. Please check your email, or try checking in as a guest.`
          );
        });
    }
  };
  CheckInSuccess = (first_name, last_name) => {
    Alert.alert(
      'Thank you!',
      `${first_name} ${last_name} has been checked in`,
      [
        {
          text: 'Dismiss',
          onPress: this.goBack
        }
      ]
    );
  };

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        style={styles.mainContainer}
      >
        <View style={styles.radioContainer}>
          <Text style={styles.questionText}>Are you a member of GWLN? </Text>
          <Radio onSelect={this.selectAttendeeType} />
        </View>
        <ScrollView>{this.renderForm(this.state.isMember)}</ScrollView>
      </KeyboardAvoidingView>
    );
  }

  renderForm = isMember => {
    const { value } = this.state;
    if (isMember == 'yes') {
      return (
        <View style={styles.formContainer}>
          <Form
            ref="memberForm"
            type={memberForm}
            options={MemberOptions}
            value={value}
            onChange={this.onFormChange}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="Check In"
              onPress={this.getMemberInfo}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      );
    } else if (isMember == 'no') {
      return (
        <View style={styles.formContainer}>
          <Form
            ref="guestForm"
            type={guestForm}
            options={GuestOptions}
            value={value}
            onChange={this.onFormChange}
          />
          <Text style={styles.contactPref}>Want to hear from GWLN?</Text>
          <Radio onSelect={this.wantsToBeContacted} />
          <View style={styles.buttonContainer}>
            <Button
              title="Check In"
              onPress={this.onSubmitGuest}
              buttonStyle={styles.button}
            />
          </View>
        </View>
      );
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
  };
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    flexDirection: 'column'
  },
  buttonContainer: {
    alignSelf: 'center',
    padding: 20
  },
  button: {
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
  },
  formContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingBottom: 50
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
  contactPref: {
    fontSize: 17,
    fontWeight: '500'
  },
  //================radioadd=====================
  radioContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 30
  },
  //================radioadd=====================
  headerIcon: {
    color: '#002A55'
  }
});

export default CheckIn;
