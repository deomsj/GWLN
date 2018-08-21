import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Alert,
  Platform
} from 'react-native';

import t from 'tcomb-form-native';
import { Icon } from 'react-native-elements';
import moment from 'moment';

const Form = t.form.Form;

//overriding tcomb textbox
var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.height = 200;
stylesheet.textbox.normal.textAlignVertical = 'top';

const Content = t.struct({
  Summary: t.String
});

stylesheet.textbox.normal.textAlignVertical = 'top';

const Options = {
  fields: {
    Summary: {
      label: 'Tell us about the event',
      error: 'Please fill out this field',
      multiline: true,
      stylesheet: stylesheet,
      placeholder: 'Comments...'
    }
  }
};

class FeedbackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  resetForm = value => {
    this.setState({ value: null });
  };

  DiscardForm = value => {
    Alert.alert(
      'Discard Feedback',
      'Are you sure you want to clear this form?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Yes', onPress: () => this.resetForm() }
      ]
    );
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
          Feedback Form
        </Text>
      ),
      headerRight: (
        <Icon
          containerStyle={{ marginRight: 15, marginTop: 15 }}
          iconStyle={styles.headerIcon}
          type="font-awesome"
          name="trash"
          onPress={navigation.getParam('discard')}
        />
      )
    };
  };

  componentDidMount = value => {
    this.props.navigation.setParams({ discard: this.DiscardForm });
  };

  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value', value);
    if (value) {
      const url = 'https://cuwomen.org/functions/app.gwln.php';
      fetch(url, {
        method: 'POST',
        headers: {
          'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
        },
        body: JSON.stringify({
          code: 'sendFeedback',
          arguments: {
            feedback: value.Summary,
            username: global.currUser.username
          }
        })
      })
        .then(res => res.json())
        .then(res => {
          if (res) {
            console.log(res);
            this.resetForm({});
            this.props.navigation.navigate('Admin');
          } else {
            console.log('error');
            this.DiscardForm();
          }
        })
        .catch(error => {
          console.log(error);
        });
      console.log('fetch');
    }
  };

  render() {
    var buttonColors = ['rgba(255, 255, 255, 1)'];
    if (Platform.OS === 'android') {
      buttonColors = ['rgba(0, 42, 85, 1)'];
    }
    return (
      <View style={styles.container}>
        <ScrollView>
          <Form
            ref={c => (this._form = c)}
            type={Content}
            style={styles.formContainer}
            options={Options}
            onChangeText={text => this.setState({ text })}
          />
          <Text style={styles.text}>
            Suggested event feedback topics:
            {'\n'} {'\u2022'} Event name and date
            {'\n'} {'\u2022'} Event Topic
            {'\n'} {'\u2022'} Number of Attendees
            {'\n'} {'\u2022'} Charity supported
            {'\n'} {'\u2022'} Dollars or resources donated{' '}
          </Text>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Submit"
                onPress={() =>
                  Alert.alert(
                    'Submit Feedback',
                    'Are you sure you want to submit feedback?',
                    [
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel'
                      },
                      { text: 'Yes', onPress: this.handleSubmit }
                    ]
                  )
                }
                color={buttonColors}
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
    flexDirection: 'column',
    flex: 1,
    padding: 30,
    justifyContent: 'space-evenly'
  },
  headerIcon: {
    flex: 1,
    color: '#002A55'
  },
  button: {
    elevation: 0,
    paddingHorizontal: 30,
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
  formContainer: {
    padding: 30
  },
  buttonContainer: {
    alignSelf: 'center',
    padding: 20
  },
  text: {
    padding: 5,
    paddingBottom: 20,
    fontSize: 14,
    fontWeight: '200',
    color: '#002a55'
  }
});

export default FeedbackForm;
