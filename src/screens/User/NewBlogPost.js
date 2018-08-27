import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Platform,
  KeyboardAvoidingView
} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import t from 'tcomb-form-native';

const Form = t.form.Form;

//overriding tcomb textbox
var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.height = 200;
stylesheet.textbox.error.height = 200;
stylesheet.textbox.normal.textAlignVertical = 'top';

const Content = t.struct({
  PostTitle: t.String,
  Post: t.String
});

const Options = {
  fields: {
    PostTitle: {
      label: 'Post Title',
      error: 'Please enter a title for this post'
    },
    Post: {
      label: 'Details',
      error: 'Please enter your post',
      multiline: true,
      numberoflines: 2,
      config: {
        size: 'lg'
      },
      stylesheet: stylesheet
    }
  }
};

class NewBlogPost extends React.Component {
  DiscardForm = () => {
    Alert.alert('Discard Post', 'Are you sure you want to clear this form?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => this.props.navigation.navigate('Blog') }
    ]);
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
          {' '}
          Create Post{' '}
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
    if (value && value.PostTitle && value.Post) {
      Alert.alert(
        'Submit Post',
        'Are you ready to post to the message board?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'Yes', onPress: () => this.submit(value) }
        ]
      );
    }
  };

  submit = value => {
    const url = 'https://cuwomen.org/functions/app.gwln.php';
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
      },
      body: JSON.stringify({
        code: 'insertBlogPost',
        arguments: {
          title: value.PostTitle,
          story: value.Post,
          username: global.currUser.username
        }
      })
    })
      .then(res => res.json())
      .then(() => {
        this.props.navigation.navigate('Blog');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <KeyboardAvoidingView
        enabled
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.mainContainer}
      >
        <ScrollView>
          <View style={styles.container}>
            <Form
              ref={c => (this._form = c)}
              type={Content}
              options={Options}
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Submit"
                buttonStyle={styles.button}
                onPress={this.handleSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 30
  },
  title: {
    justifyContent: 'center',
    marginTop: 10,
    alignItems: 'center',
    fontSize: 24
  },
  DiscardFeedback: {
    fontSize: 10
  },
  headerIcon: {
    flex: 1,
    color: '#002A55'
  },
  buttonContainer: {
    alignSelf: 'center',
    flexDirection: 'column'
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
  }
});

export default NewBlogPost;
