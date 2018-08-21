import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  ScrollView,
  Platform,
  TouchableOpacity
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import contactData from '../../mock-database/crm.contacts.json';
import '../../global';

//import EventData from '../www_timeline_events.json';

class AdminEventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      memInfo: contactData,
      attendees: {},
      numAttendeesLoading: true
    };
  }

  DiscardForm = value => {
    Alert.alert('Delete Event', 'Are you sure you want to delete this event?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => this.DeleteEvent() }
    ]);
  };

  DeleteEvent = () => {
    const url = 'https://cuwomen.org/functions/app.gwln.php';
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
      },
      body: JSON.stringify({
        code: 'deleteEvent',
        arguments: {
          timeline_event_id: this.props.navigation.state.params.item
            .timeline_event_id
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
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
          {navigation.state.params.item.event_name}
        </Text>
      ),
      headerRight: (
        <Icon
          containerStyle={{ marginRight: 15, marginTop: 15 }}
          iconStyle={styles.headerIcon}
          type="font-awesome"
          // color= '#002A55'
          name="trash"
          onPress={navigation.getParam('discard')}
        />
      )
    };
  };
  componentDidMount = value => {
    this.props.navigation.setParams({ discard: this.DiscardForm });
    this.mounted = true;
  };
  componentWillUnmount() {
    this.mounted = false;
  }
  retrieveEvent = () => {
    const url = 'https://cuwomen.org/functions/app.gwln.php';
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
      },
      body: JSON.stringify({
        code: 'getEventCheckins',
        arguments: {
          timeline_event_id: this.props.navigation.state.params.item
            .timeline_event_id
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          this.setState({
            attendees: res
          });
          this.GetNumberOfAttendees();
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  GoToAttendeeList = () => {
    let ID = this.props.navigation.state.params.item.timeline_event_id;
    this.props.navigation.navigate('AttendeeList', { ID });
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        id={item.id}
        title={`${item.first_name} ${item.last_name}`}
        keyExtractor={item => String(item.email)}
        subtitle={item.email}
      />
    </TouchableOpacity>
  );

  goToCheckIn = () => {
    let CheckInEventID = this.props.navigation.state.params.item
      .timeline_event_id;
    console.log('in go to check in');
    this.props.navigation.navigate('CheckIn', { CheckInEventID });
  };
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: '#CED0CE'
        }}
      />
    );
  };
  GetNumberOfAttendees = () => {
    let tmpAttendees = this.state.attendees;
    console.log(tmpAttendees);
    let tmpNumAttendees = 0;
    global.numAttendees = 0;
    for (var i = 0; i < tmpAttendees.length; i++) {
      tmpNumAttendees = tmpNumAttendees + parseInt(tmpAttendees[i].guests_rsvp);
    }
    global.numAttendees = tmpNumAttendees;
    console.log(global.numAttendees);
    this.setState({
      numAttendeesLoading: false
    });
  };

  componentWillMount() {
    this.retrieveEvent();
  }
  render() {
    var buttonColors = ['rgba(255, 255, 255, 1)'];
    if (Platform.OS === 'android') {
      buttonColors = ['rgba(0, 42, 85, 1)'];
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.heading}>
            <Text style={styles.infoText}>
              {' '}
              {this.props.navigation.state.params.item.event_month}/
              {this.props.navigation.state.params.item.event_day}/
              {this.props.navigation.state.params.item.event_year}{' '}
            </Text>
            <Text style={styles.infoText}>
              {' '}
              {this.props.navigation.state.params.item.event_location}{' '}
            </Text>
            <Text style={styles.infoText}>
              {' '}
              There are {global.numAttendees} people planning to attend.{' '}
            </Text>
          </View>
          <View style={styles.attendeeContainer}>
            <Text
              style={styles.attendeeButton}
              onPress={() => this.GoToAttendeeList()}
            >
              View Attendees
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                color={buttonColors}
                title="Begin Check In"
                onPress={() => this.goToCheckIn()}
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
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  buttonContainer: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  button: {
    alignSelf: 'center',
    elevation: 0,
    paddingHorizontal: 20,
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
    flexDirection: 'column',
    paddingVertical: 3
  },
  heading: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headingText: {
    fontSize: 24
  },
  info: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  infoText: {
    fontSize: 16,
    paddingLeft: '5%',
    paddingRight: '5%'
  },
  headerIcon: {
    color: '#002A55',
    flex: 1
  },
  attendeeContainer: {
    alignSelf: 'center',
    padding: 10
  },
  attendeeButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderColor: '#002A55',
    color: '#002A55',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 17,
    fontWeight: '400'
  }
});

export default AdminEventDetails;
