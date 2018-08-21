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
import '../../global';

const Form = t.form.Form;

const NumAttendees = t.struct({
  numGuests: t.Number
});

var options = {
  fields: {
    numGuests: {
      label: 'Number of attendees',
      error: 'Please enter the number of attendees'
    }
  }
};

class memberRSVP extends React.Component {
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
          Member RSVP
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
            member_id: global.crm,
            first_name: global.currUser.first_name,
            last_name: global.currUser.last_name,
            email: global.currUser.email1,
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
          Alert.alert('Error Occured', 'Please try again', [
            { text: 'Dismiss', onPress: this.initialState }
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
          <Form ref="form" type={NumAttendees} options={options} />
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
    // padding: 30,
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
export default memberRSVP;
