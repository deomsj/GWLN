import React from 'react';
import { StyleSheet, View } from 'react-native';
import { List, ListItem, Text } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const _format = 'YYYY-MM-DD';
const _today = moment().format(_format);
const _maxDate = moment()
  .add(120, 'days')
  .format(_format);

class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _eventsByDate: {},
      _selectedDate: moment().format('dddd, MMMM Do'),
      _selectedEvents: []
    };
  }

  retrieveEvents = () => {
    if (this.props.navigation.getParam('haveCurrentEvents')) {
      return;
    }
    const url = 'https://cuwomen.org/functions/app.gwln.php';
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
      },
      body: JSON.stringify({
        code: 'getAllEvents'
      })
    })
      .then(res => res.json())
      .then(events => {
        this.props.navigation.setParams({ haveCurrentEvents: true });
        if (events) {
          this.sortEvents(events);
        }
      })
      .catch(() => {});
  };

  sortEvents = events => {
    let _markedDates = {};
    let _eventsByDate = {};
    events.forEach(event => {
      const { event_day, event_month, event_year } = event;
      if (event_day && event_month && event_year) {
        const shortHandDate = `${event_year}-${event_month}-${event_day}`;
        const date = moment(shortHandDate, 'YYYY-M-D').format('YYYY-MM-DD');
        _markedDates[date] = { marked: true };
        _eventsByDate[date] = (_eventsByDate[date] || []).concat(event);
      }
    });
    const today = moment().format(_format);
    const _selectedEvents = _eventsByDate[today] || [];
    this.setState({ _markedDates, _eventsByDate, _selectedEvents });
  };

  onDaySelect = ({ dateString }) => {
    const _selectedDate = moment(dateString).format('dddd, MMMM Do');
    const _selectedEvents = this.state._eventsByDate[dateString] || [];
    this.setState({ _selectedDate, _selectedEvents });
  };

  goToEventDetails = event => {
    this.props.navigation.navigate('EventDetails', { event });
  };

  componentDidMount() {
    this._focusListener = this.props.navigation.addListener(
      'didFocus',
      this.retrieveEvents
    );
  }

  componentWillUnmount() {
    this._focusListener.remove();
  }

  render() {
    const { _markedDates, _selectedDate, _selectedEvents } = this.state;
    return (
      <View style={styles.Container}>
        <Calendar
          style={styles.Calendar}
          theme={{ dotColor: 'red' }}
          minDate={_today}
          maxDate={_maxDate}
          onDayPress={this.onDaySelect}
          markedDates={_markedDates}
        />
        <Text style={styles.Date}>{_selectedDate}</Text>
        <List style={styles.List}>
          {_selectedEvents.length ? (
            _selectedEvents.map(event => (
              <ListItem
                key={event.timeline_event_id}
                title={event.event_name}
                rightIcon={{ name: 'chevron-right' }}
                onPress={() => this.goToEventDetails(event)}
                topDivider
              />
            ))
          ) : (
            <Text style={styles.NoEvents} key="none">
              No Events
            </Text>
          )}
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'flex-start'
  },
  Calendar: {
    margin: 0
  },
  Date: {
    fontSize: 18,
    color: '#002A55',
    marginTop: 18,
    textAlign: 'center',
    width: '100%'
  },
  List: {
    margin: 0,
    padding: 0
  },
  NoEvents: {
    fontSize: 16,
    color: '#002A55',
    padding: 10,
    textAlign: 'center'
  }
});

export default EventCalendar;
