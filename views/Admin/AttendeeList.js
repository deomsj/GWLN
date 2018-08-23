import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import '../../global';

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
          iconStyle={styles.headerIcon}
          name="file-upload"
          onPress={navigation.getParam('Export')}
        />
      )
    };
  };

  exportList = () => {
    Alert.alert(
      'Export Attendee List',
      'Are you sure you want to export this form?',
      [
        { text: 'Yes', onPress: () => this.ExportAttendeeList },
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed') }
      ]
    );
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
          const stillExpecting = res
            .map(person => ({
              ...person,
              expecting: person.guests_rsvp - person.guests_checkin
            }))
            .filter(({ expecting }) => expecting > 0);
          const totals = res.reduce(
            (agg, person) => {
              const surprises = person.guests_checkin - person.guests_rsvp;
              const stillExpecting = person.guests_rsvp - person.guests_checkin;
              return {
                checkedIn: agg.checkedIn + Number(person.guests_checkin),
                RSVPd: agg.RSVPd + Number(person.guests_rsvp),
                surprises: agg.surprises + Math.max(surprises, 0),
                stillExpecting: agg.stillExpecting + Math.max(stillExpecting, 0)
              };
            },
            { checkedIn: 0, RSVPd: 0, surprises: 0, stillExpecting: 0 }
          );

          this.setState({
            checkedIn,
            stillExpecting,
            totals
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  _renderCheckedIn = ({ item }) => this._renderItem(item, 'guests_checkin');
  _renderExpecting = ({ item }) => this._renderItem(item, 'expecting');

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
        if (res) {
          console.log(res);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.retrieveEvent();
    this.props.navigation.setParams({ Export: this.exportList });
  }

  _keyExtractor = item => String(item.username);

  render() {
    const { totals, checkedIn, stillExpecting, display } = this.state;
    // run query of events on the day that is passed then store the information in an array of objects
    return (
      <View style={styles.container}>
        {getHeader(display, totals, this._toggleDisplay)}
        {display === 'checkedIn' ? (
          <ScrollView>
            <FlatList
              data={checkedIn}
              renderItem={this._renderCheckedIn}
              keyExtractor={this._keyExtractor}
            />
          </ScrollView>
        ) : (
          <ScrollView>
            <FlatList
              data={stillExpecting}
              renderItem={this._renderExpecting}
              keyExtractor={this._keyExtractor}
            />
          </ScrollView>
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
        Expecting - {totals.stillExpecting}
      </Text>
    </View>
  ) : (
    <View style={styles.headerContainer}>
      <Text onPress={toggle} style={styles.header}>
        Checked In - {totals.checkedIn}
      </Text>
      <Text onPress={toggle} style={styles.headerActive}>
        Expecting - {totals.stillExpecting}
      </Text>
    </View>
  );

export default AttendeeList;
