import React from 'react';
import { StyleSheet, Text, View, ScrollView, Platform } from 'react-native';
import { Button } from 'react-native-elements';
import HTML from 'react-native-render-html';

class EventDetails extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: {}
    // };
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
        Event Details
      </Text>
    ),
    headerRight: <View />
  });

  _GoToRSVP = () => {
    const { event } = this.props.navigation.state.params;
    let ID = event.timeline_event_id;
    this.props.navigation.navigate('RSVP', { ID });
  };
  render() {
    const {
      event_name,
      event_month,
      event_day,
      event_year,
      location,
      event_description
    } = this.props.navigation.state.params.event;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <View style={styles.heading}>
              <Text style={styles.headingText}> {event_name} </Text>
              <Text style={styles.infoText}>
                {event_month}/{event_day}/{event_year}
              </Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.fieldText}>Location:</Text>
              <Text style={styles.infoText}>{location}</Text>
            </View>
            <View style={styles.info}>
              <Text style={styles.fieldText}>Details:</Text>
              <HTML html={event_description} />
              <View style={styles.buttonContainer}>
                <Button
                  title="RSVP"
                  onPress={this._GoToRSVP}
                  buttonStyle={styles.button}
                />
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
    height: 40,
    width: 150,
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
