import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ListItem } from 'react-native-elements';
import { url, token } from '../../config/api';

class MyUpcomingEvents extends React.Component {
  static navigationOptions = {
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
        My Events{' '}
      </Text>
    ),
    headerRight: <View />
  };

  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%'
        }}
      />
    );
  };

  _onPressItem = event => {
    if (global.currUser.is_event_admin === 't') {
      this.props.navigation.navigate('AdminEventDetails', { event });
    } else {
      this.props.navigation.navigate('EventDetails', { event });
    }
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item)}>
      <ListItem
        id={item.id}
        title={item.event_name}
        subtitle={`${item.event_month}/${item.event_day}/${item.event_year}`}
        containerStyle={{ borderBottomWidth: 0 }}
      />
    </TouchableOpacity>
  );

  makeRemoteRequest = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': token
      },
      body: JSON.stringify({
        code: 'getCheckinEventsByEmail',
        arguments: {
          email: global.currUser.email1
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res
        });
        this.GetMyEvents();
      })
      .catch(() => {});
  };

  GetMyEvents = () => {
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': token
      },
      body: JSON.stringify({
        code: 'getAllEvents'
      })
    })
      .then(res => res.json())
      .then(res => {
        const userEvents = res.filter(event => {
          return event.username == global.currUser.username;
        });
        const combinedUserEvents = [...this.state.data, ...userEvents];
        const uniqueIds = {};
        const uniqueUserEvents = combinedUserEvents.filter(
          ({ timeline_event_id: id }) => {
            uniqueIds[id] = (uniqueIds[id] || 0) + 1;
            return uniqueIds[id] < 2;
          }
        );
        this.setState({ data: uniqueUserEvents });
      });
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  componentDidMount() {
    this.makeRemoteRequest();
    this.mounted = false;
  }
  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          data={this.state.data}
          renderItem={this._renderItem}
          keyExtractor={item => String(item.timeline_event_id)}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1
  }
});
export default MyUpcomingEvents;
