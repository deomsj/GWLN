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
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import { ListItem } from 'react-native-elements';
import '../../global';

// import EventData from '../www_timeline_events.json';
// import contactData from '../../mock-database/crm.contacts.json';

class AttendeeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
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
          onPress={this.exportList}
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
          this.setState({
            attendees: res
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem
        id={item.id}
        title={`${item.first_name} ${item.last_name}`}
        keyExtractor={item => String(item.email)}
        subtitle={item.email}
        hideChevron={true}
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

  render() {
    // run query of events on the day that is passed then store the information in an array of objects
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            data={this.state.attendees}
            renderItem={this._renderItem}
            keyExtractor={item => String(item.username)}
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  }
});

export default AttendeeList;
