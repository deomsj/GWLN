import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Platform
} from 'react-native';
import { Icon } from 'react-native-elements';
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
    this.state = { value: null };
  }

  resetForm = value => {
    this.setState({ value: null });
  };

  DiscardForm = value => {
    Alert.alert('Discard RSVP', 'Are you sure you want to clear this form?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => this.resetForm() }
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
          Guest RSVP
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

  handleSubmit = () => {
    const value = this.refs.form.getValue();
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
            console.log(res);
            Alert.alert('Success', 'You are now registered for this event', [
              { text: 'Dismiss', onPress: this.resetForm }
            ]);
          }
        })
        .catch(error => {
          console.log(error);
          Alert.alert('Error', 'Invalid information, please try again', [
            { text: 'Dismiss', onPress: this.resetForm }
          ]);
        });
    }
  };

  render() {
    var buttonColors = ['rgba(255, 255, 255, 1)'];
    if (Platform.OS === 'android') {
      buttonColors = ['rgba(0, 42, 85, 1)'];
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <Form
            ref="form"
            style={styles.formContainer}
            type={guest}
            options={options}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="RSVP"
                onPress={this.handleSubmit}
                color={buttonColors}
              />
            </View>
          </View>
        </ScrollView>
      </View>
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
    elevation: 0,
    paddingHorizontal: 50,
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
    padding: 30
  },
  buttonContainer: {
    alignSelf: 'center',
    padding: 20
  }
});
