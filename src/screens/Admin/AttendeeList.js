import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import '../../config/global';

class AttendeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedIn: [],
      stillExpecting: [],
      totals: {},
      display: 'checkedIn'
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
          Attendee List
        </Text>
      ),
      headerRight: (
        <Icon
          containerStyle={{ marginRight: 15, marginTop: 15 }}
          color="#002A55"
          name="file-upload"
          onPress={navigation.getParam('Export')}
        />
      )
    };
  };

  exportList = () => {
    Alert.alert(
      'Export Attendee List',
      'Are you sure you want to email a CSV of attendees to the event creator?',
      [
        { text: 'Yes', onPress: this.ExportAttendeeList },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') }
      ]
    );
  };

  ExportAttendeeList = () => {
    const url = 'https://cuwomen.org/functions/app.gwln.php';
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
      },
      body: JSON.stringify({
        code: 'sendRSVPList',
        arguments: {
          timeline_event_id: this.props.navigation.state.params.ID
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        console.log(res ? 'Success' : 'Error');
      })
      .catch(error => {
        console.log(error);
      });
  };

  _toggleDisplay = () => {
    if (this.state.display === 'checkedIn') {
      this.setState({ display: 'expecting' });
    } else {
      this.setState({ display: 'checkedIn' });
    }
  };

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
          timeline_event_id: this.props.navigation.state.params.ID
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res) {
          const checkedIn = res.filter(
            ({ guests_checkin }) => guests_checkin > 0
          );
          const RSVP = res.filter(({ guests_rsvp }) => guests_rsvp > 0);
          const totals = res.reduce(
            (agg, person) => {
              return {
                checkedIn: agg.checkedIn + Number(person.guests_checkin),
                RSVP: agg.RSVP + Number(person.guests_rsvp)
              };
            },
            { checkedIn: 0, RSVP: 0 }
          );

          this.setState({ checkedIn, RSVP, totals });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  _renderCheckedIn = ({ item }) => this._renderItem(item, 'guests_checkin');
  _renderRSVP = ({ item }) => this._renderItem(item, 'guests_rsvp');

  _renderItem = (item, badge) => (
    <TouchableOpacity>
      <ListItem
        id={item.id}
        title={`${item.first_name} ${item.last_name}`}
        keyExtractor={item => String(item.email)}
        subtitle={item.email}
        hideChevron={true}
        badge={{
          value: item[badge],
          textStyle: styles.badgeText,
          containerStyle: styles.badgeContainer
        }}
        //guests_checkin
      />
    </TouchableOpacity>
  );

  componentDidMount() {
    this.retrieveEvent();
    this.props.navigation.setParams({ Export: this.exportList });
  }

  _keyExtractor = item => String(item.username);

  render() {
    const { totals, checkedIn, RSVP, display } = this.state;
    // run query of events on the day that is passed then store the information in an array of objects
    return (
      <View style={styles.container}>
        {getHeader(display, totals, this._toggleDisplay)}
        {display === 'checkedIn' ? (
          <FlatList
            data={checkedIn}
            renderItem={this._renderCheckedIn}
            keyExtractor={this._keyExtractor}
          />
        ) : (
          <FlatList
            data={RSVP}
            renderItem={this._renderRSVP}
            keyExtractor={this._keyExtractor}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start'
  },
  headerContainer: {
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  headerActive: {
    fontSize: 20,
    padding: 10,
    color: '#002A55',
    fontWeight: 'bold',
    flex: 1
  },
  header: {
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 5,
    color: '#CED0CE',
    fontWeight: 'bold',
    flex: 1
  },
  badgeText: {
    color: '#002A55',
    fontSize: 17,
    fontWeight: 'bold'
  },
  badgeContainer: { backgroundColor: '#CED0CE' }
});

const getHeader = (display, totals, toggle) =>
  display === 'checkedIn' ? (
    <View style={styles.headerContainer}>
      <Text onPress={toggle} style={styles.headerActive}>
        Checked In - {totals.checkedIn}
      </Text>
      <Text onPress={toggle} style={styles.header}>
        Expecting - {totals.RSVP}
      </Text>
    </View>
  ) : (
    <View style={styles.headerContainer}>
      <Text onPress={toggle} style={styles.header}>
        Checked In - {totals.checkedIn}
      </Text>
      <Text onPress={toggle} style={styles.headerActive}>
        Expecting - {totals.RSVP}
      </Text>
    </View>
  );

export default AttendeeList;
