import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import moment from 'moment';

// import a from './Components/alert';

import '../../global';

import t from 'tcomb-form-native';

var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.height = 80;
stylesheet.textbox.normal.textAlignVertical = 'top';

const Form = t.form.Form;

const Event = t.struct({
  event_name: t.String,
  location: t.String,
  date: t.Date,
  event_description: t.String
});

var options = {
  //label: 'Create an Event',
  fields: {
    event_name: {
      label: 'Event Name',
      error: 'Please enter an event name'
    },
    location: {
      label: 'Event Location',
      error: 'Please enter the location'
    },
    date: {
      label: 'Date',
      error: 'Please enter a valid date',
      mode: 'date',
      config: {
        format: date => moment(date).format('dddd, MMMM Do YYYY')
      }
    },
    event_description: {
      label: 'Describe the Event',
      multiline: true,
      stylesheet: stylesheet,
      placeholder: 'Time and event description'
    }
  }
};

class CreateEvent extends React.Component {
  resetForm = () => {
    this.setState({ value: null });
  };

  DiscardForm = () => {
    Alert.alert('Discard Event', 'Are you sure you want to clear this form?', [
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
          {' '}
          Create an Event{' '}
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

    let TmpDate = value.date;
    TmpDate = moment(TmpDate).format('YYYY-M-D');
    console.log(TmpDate);
    TmpDate = String(TmpDate).split('-');
    var _year = TmpDate[0];
    var _month = TmpDate[1];
    var _day = TmpDate[2];

    if (value) {
      const url = 'https://cuwomen.org/functions/app.gwln.php';
      fetch(url, {
        method: 'POST',
        headers: {
          'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
        },
        body: JSON.stringify({
          code: 'insertEvent',
          arguments: {
            event_day: _day,
            event_month: _month,
            event_year: _year,
            event_name: value.event_name,
            event_description: value.event_description,
            event_picture: null,
            pic_caption: null,
            link: null,
            username: global.currUser.username,
            location: value.location
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            this.props.navigation.navigate('Admin');
          } else {
            console.log('error');
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
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.container}>
            <Form ref="form" type={Event} options={options} />
            <View style={styles.buttonContainer}>
              <Button
                title="Create Event"
                onPress={() =>
                  Alert.alert(
                    'Create Event',
                    'Are you sure you want to create this event?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                      },
                      { text: 'Yes', onPress: this.handleSubmit }
                    ]
                  )
                }
                color={buttonColors}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default CreateEvent;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 30
  },
  paragraph: {
    margin: 30,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#002a55'
  },
  buttons: {
    padding: 40,
    margin: 10
  },
  to: {
    margin: 24,
    padding: 40,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#ff6666'
  },
  headerIcon: {
    flex: 1,
    color: '#002A55'
  },
  buttonContainer: {
    elevation: 0,
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
    flexDirection: 'column'
  }
});
