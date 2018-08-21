import React from 'react';
import { StyleSheet, Text, View, Button, Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import RNPickerSelect from 'react-native-picker-select';
import Gallery from 'react-native-image-gallery';

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.inputRefs = {};
    this.state = {
      Function: undefined,
      items: [
        { label: 'My Events', value: 'MyUpcomingEvents' },
        { label: 'Provide Feedback', value: 'FeedbackForm' },
        { label: 'Create an Event', value: 'CreateEvent' }
      ]
    };
  }

  pickerNavigate = () => {
    var nextPage = this.state.PickerValue;
    this.props.navigation.navigate(nextPage);
  };

  render() {
    var buttonColors = ['rgba(255, 255, 255, 1)'];
    if (Platform.OS === 'android') {
      buttonColors = ['rgba(0, 42, 85, 1)'];
    }
    return (
      <View style={styles.container}>
        <View style={styles.galleryContainer}>
          <Gallery
            style={styles.gallery}
            images={[
              {
                source: require('../../img/Scroll/Scroll4.jpg'),
                dimensions: { width: undefined, height: undefined }
              },
              {
                source: require('../../img/Scroll/Scroll2.jpg'),
                dimensions: { width: undefined, height: undefined }
              },
              {
                source: require('../../img/Scroll/Scroll3.jpg'),
                dimensions: { width: undefined, height: undefined }
              },
              {
                source: require('../../img/Scroll/Scroll1.jpg'),
                dimensions: { width: undefined, height: undefined }
              }
            ]}
          />
          <Text style={styles.textStyle}>
            Our vision is to provide women with the opportunity and resources to
            make a measurable difference in the lives of each other, in the
            lives of credit union members and in their communities.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.pickerBorder}>
            <RNPickerSelect
              placeholder={{ label: 'Manage Events...', color: 'gray' }}
              items={this.state.items}
              hideIcon={true}
              onValueChange={value => {
                this.setState({ Function: value });
                if (value) {
                  this.props.navigation.navigate(value);
                }
              }}
              style={{ ...pickerStyle }}
            />
          </View>
          <View style={styles.menuContainer}>
            <View style={styles.button}>
              <Button
                color={buttonColors}
                title="Find an Event"
                onPress={() => this.props.navigation.navigate('UserCalendar')}
              />
            </View>
          </View>
          <View style={styles.menuContainer}>
            <View style={styles.button}>
              <Button
                color={buttonColors}
                title="Member List"
                onPress={() => this.props.navigation.navigate('MemberList')}
              />
            </View>
          </View>
          <View style={styles.menuContainer}>
            <Text
              style={styles.memberText}
              onPress={() => this.props.navigation.navigate('BlogPostList')}
            >
              Blog
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  memberText: {
    color: 'blue',
    fontSize: 17,
    alignSelf: 'center'
  },
  menuContainer: {
    backgroundColor: 'white',
    paddingTop: 10
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 1,
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
    elevation: 0
  },
  buttonContainer: {
    position: 'absolute',
    bottom: '3%',
    alignSelf: 'center'
  },
  galleryContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    position: 'absolute',
    top: '0%',
    height: '70%'
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 17,
    paddingHorizontal: 10,
    color: '#002a55',
    flex: 1,
    ...Platform.select({
      ios: {
        fontFamily: 'Helvetica',
        fontWeight: '300'
      },
      android: {
        fontFamily: 'sans-serif-light',
        fontWeight: '400'
      }
    })
  },
  pickerBorder: {
    ...Platform.select({
      android: {
        borderColor: '#002a55',
        borderWidth: 2,
        borderRadius: 5,
        elevation: 0
      }
    })
  }
});

const pickerStyle = StyleSheet.create({
  inputIOS: {
    fontSize: 18,
    paddingVertical: 15,
    paddingHorizontal: 80,
    borderWidth: 2,
    borderColor: '#002a55',
    borderRadius: 5,
    color: '#002A55'
  },
  inputAndroid: {
    paddingHorizontal: 125
  }
});
export default HomeScreen;
