import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import t from 'tcomb-form-native';

const Form = t.form.Form;

const guest = t.struct({
  first_name: t.String,
  last_name: t.String,
  email: t.String,
  numGuests: t.Number
});

var options = {
  fields: {
    first_name: {
      label: 'First Name',
      error: 'Please enter your first name'
    },
    last_name: {
      label: 'Last Name',
      error: 'Please enter your last name'
    },
    email: {
      label: 'Email',
      error: 'Please enter your email'
    },
    numGuests: {
      label: 'Number of Attendees',
      error: 'Please enter the number of attendees'
    }
  }
};

class GuestRSVP extends React.Component {
  constructor(props) {
    super(props);
    const user = global.currUser || {};
    const value = {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      email: user.email1 || '',
      numGuests: 1
    };
    this.state = { value };
    this.form = React.createRef();
  }

  resetForm = () => {
    this.setState({ value: null });
  };

  DiscardForm = () => {
    Alert.alert('Discard RSVP', 'Are you sure you want to clear this form?', [
      {
        text: 'Cancel',
        style: 'cancel'
      },
      {
        text: 'Yes',
        onPress: () => this.props.navigation.navigate('EventCalendar')
      }
    ]);
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
          Event RSVP
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

  componentDidMount = () => {
    this.props.navigation.setParams({ discard: this.DiscardForm });
  };

  handleSubmit = () => {
    const value = this.form.current.getValue();
    if (value) {
      const url = 'https://cuwomen.org/functions/app.gwln.php';
      fetch(url, {
        method: 'POST',
        headers: {
          'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
        },
        body: JSON.stringify({
          code: 'eventRSVP',
          arguments: {
            timeline_event_id: this.props.navigation.state.params.ID,
            first_name: value.first_name,
            last_name: value.last_name,
            email: value.email,
            guests: value.numGuests
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            Alert.alert('Success', 'You are now registered for this event', [
              {
                text: 'Return to Calendar',
                onPress: () => this.props.navigation.navigate('EventCalendar')
              }
            ]);
          }
        })
        .catch(() => {
          Alert.alert('Error', 'Invalid information, please try again', [
            { text: 'Dismiss', onPress: this.resetForm }
          ]);
        });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
        <ScrollView>
          <Form
            ref={this.form}
            style={styles.formContainer}
            type={guest}
            options={options}
            value={this.state.value}
          />
          <View style={styles.buttonContainer}>
            <Button
              title="RSVP"
              onPress={this.handleSubmit}
              buttonStyle={styles.button}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default GuestRSVP;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'column',
    flex: 1,
    padding: 30
  },
  headerIcon: {
    flex: 1,
    color: '#002A55'
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
    paddingVertical: 1,
    marginBottom: 10
  },
  formContainer: {
    padding: 30
  },
  buttonContainer: {
    alignSelf: 'center',
    padding: 20
  }
});
