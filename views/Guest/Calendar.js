import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
//import EventData from '../www_timeline_events.json';
//const calendarEvents = require('./../mock-database/wwww.timeline_events.json');

const _format = 'YYYY-MM-DD';
const _today = moment().format(_format);
const _maxDate = moment()
  .add(120, 'days')
  .format(_format);

const tmp = {};

class GuestCalendar extends React.Component {
  initialState = {
    [_today]: { disabled: true }
  };

  constructor() {
    super();
    this.state = {
      data: {},
      MarkedEvents: {},
      _markedDates: {}
    };
    global.EventArray = [];
    this.PostEvent = this.PostEvent.bind(this);
  }

  retrieveEvents = () => {
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
      .then(res => {
        if (res) {
          console.log(res.length);
          this.state.data = res;
          this.sortEvents();
        }
      })
      .catch(error => {
        console.log(error);
      });
    console.log('fetching events');
  };

  sortEvents = () => {
    let tmpDates = this.state.data;
    for (var i = 0; i < tmpDates.length; i++) {
      tmp = tmpDates[i];
      var day = tmp.event_day;
      var month = tmp.event_month;
      var zero = '0';
      if (month.length == 1) {
        month = `${zero}${month}`;
      }
      if (day.length == 1) {
        day = `${zero}${day}`;
      }
      const year = tmp.event_year;
      const date = `${year}-${month}-${day}`;
      const _date = moment(date).format(_format);
      this.PostEvent(date);
    }
  };

  PostEvent = day => {
    let marked = true;
    let newMarkedDay = this.state._markedDates;
    newMarkedDay[day] = { marked };
    const updatedMarkedDates = {
      ...this.state._markedDates,
      ...{ [day]: { marked } }
    };
    this.setState({ _markedDates: updatedMarkedDates });
  };

  OnDaySelect = date => {
    const _selectedDay = moment(date.dateString).format(_format);
    console.log(_selectedDay);

    if (this.state._markedDates[_selectedDay]) {
      console.log('in if statement');
      this.parseSelectedDate(_selectedDay);
      // navigate to event detail and pass the event id so that the post information can be retrieved
      //this.props.navigation.navigate('EventDetails', {date, _selectedDay})
      // marked = !this.state._markedDates[_selectedDay].marked;
      // markedDates = this.state._markedDates[_selectedDay];
    }
    //this.PostEvent(_selectedDay);
  };

  parseSelectedDate = date => {
    date = String(date).split('-');
    var _year = date[0];
    var _month = date[1];
    var _day = date[2];
    console.log(_day[1]);
    if (_day[0] == 0) {
      _day = _day[1];
    }
    if (_month[0] == 0) {
      _month = _month[1];
    }
    console.log(_year);
    console.log(_month);
    console.log(_day);
    let TmpSelected = this.state.data;
    var filteredDate = TmpSelected.filter(event => {
      return (
        event.event_day == _day &&
        event.event_month == _month &&
        event.event_year == _year
      );
    });
    console.log(filteredDate);
    let filteredID = filteredDate[0].timeline_event_id;
    console.log(filteredID);
    this.props.navigation.navigate('GuestCalendarDetail', {
      date,
      filteredID
    });
  };

  componentWillMount() {
    this.retrieveEvents();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Calendar
          style={styles.Calendar}
          theme={{
            dotColor: 'pink'
          }}
          minDate={_today}
          maxDate={_maxDate}
          onDayPress={this.OnDaySelect}
          markedDates={this.state._markedDates}
          markingType={'interactive'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Calendar: {
    flex: 10,
    height: '90%',
    width: '100%'
  }
});

export default GuestCalendar;
