import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Platform
} from 'react-native';
import HTML from 'react-native-render-html';
import contactData from '../../mock-database/crm.contacts.json';
import '../../global';

//import EventData from './www_timeline_events.json';

const tmp = {};

const DEFAULT_PROPS = {
  tagsStyles: {
    ' ': {
      fontSize: 16,
      color: 'gray',
      paddingHorizontal: 10
    },
    p: {
      fontSize: 16,
      color: 'gray',
      paddingHorizontal: 10
    }
  }
};

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      memInfo: contactData
    };
  }

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
          Event Details
        </Text>
      ),
      headerRight: <View />
    };
  };

  retrieveEvent = () => {
    const url = 'https://cuwomen.org/functions/app.gwln.php';
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
      },
      body: JSON.stringify({
        code: 'getEventByID',
        arguments: {
          timeline_event_id: this.props.navigation.state.params.filteredID
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          this.setState({
            data: res
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    console.log(tmp);
  };

  _test = () => {
    let tmp = this.state.detailEvent;
    console.log('in test');

    if (this.state.detailEvent.length > 0) {
      console.log(tmp[0].event_name);
    }
  };
  _onPress = () => {
    console.log('rsvp pressed');
    this._Post_RSVP();
  };

  _Post_RSVP = () => {
    let currUser = this.state.memInfo;
    if (global.currUser != null) {
      const attendee = {
        event: this.state.data.timeline_event_id,
        cmr_id: global.currUser.contact_id
      };
      console.log(attendee);
    } else {
      const guestAttendee = {
        event: this.state.data.timeline_event_id,
        cmr_id: Math.floor(Math.random() * 10000) + 1
      };
      console.log(guestAttendee);
    }
  };
  _GoToRSVP = () => {
    let ID = this.state.data.timeline_event_id;
  };

  componentDidMount() {
    this.retrieveEvent();
  }
  render() {
    //this._test();
    console.log(this.state.data);

    var buttonColors = ['rgba(255, 255, 255, 1)'];
    if (Platform.OS === 'android') {
      buttonColors = ['rgba(0, 42, 85, 1)'];
    }

    // run query of events on the day that is passed then store the information in an array of objects
    //() => this._onPress()
    //<Text style={styles.infoText}> {this.state.data.event_description} </Text>
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.heading}>
              <Text style={styles.headingText}>
                {' '}
                {this.state.data.event_name}{' '}
              </Text>
              <Text style={styles.infoText}>
                {' '}
                {this.state.data.event_month}/{this.state.data.event_day}/
                {this.state.data.event_year}{' '}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.fieldText}>Location:</Text>
              <Text style={styles.infoText}>
                {' '}
                {this.state.data.event_location}{' '}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.fieldText}>Details:</Text>
              <HTML html={this.state.data.event_description} />
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button
                    title="RSVP"
                    onPress={() => this._GoToRSVP()}
                    color={buttonColors}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  heading: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 15
  },
  headingText: {
    fontSize: 24
  },
  fieldText: {
    color: 'black',
    fontSize: 18
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'center',
    borderTopWidth: 1,
    marginLeft: '5%',
    borderColor: 'lightgray',
    paddingBottom: 10
  },
  infoText: {
    fontSize: 16,
    color: 'gray',
    paddingHorizontal: 10
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
  buttonContainer: {
    alignSelf: 'center',
    padding: 20
  }
});

export default EventDetails;
