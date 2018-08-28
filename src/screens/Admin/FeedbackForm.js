import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Platform
} from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import { Icon } from 'react-native-elements';
import _ from 'lodash';
import { url, token } from '../../config/api';

const Form = t.form.Form;

//overriding tcomb textbox
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
    this.form = React.createRef();
  }

  resetForm = () => {
    this.setState({ value: null });
  };

  DiscardForm = () => {
    Alert.alert(
      'Discard Feedback',
      'Are you sure you want to clear this form?',
      [
        {
          text: 'Cancel',
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

  componentDidMount = () => {
    this.props.navigation.setParams({ discard: this.DiscardForm });
  };

  handleSubmit = () => {
    const value = this.form.current.getValue();
    if (value) {
      Alert.alert(
        'Submit Feedback',
        'Are you sure you want to submit feedback?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          { text: 'Yes', onPress: () => this.submit(value) }
        ]
      );
    }
  };

  submit = value => {
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': token
      },
      body: JSON.stringify({
        code: 'sendFeedback',
        arguments: {
          feedback: value.Summary,
          username: (global.currUser || {}).username
        }
      })
    })
      .then(res => {
        if (res.json()) {
          this.props.navigation.navigate('Admin');
        }
      })
      .catch(() => {});
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Form
            ref={this.form}
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
            <Button
              title="Submit"
              onPress={this.handleSubmit}
              buttonStyle={styles.button}
            />
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
    height: 40,
    width: 200,
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
