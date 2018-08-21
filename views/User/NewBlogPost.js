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
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import t from 'tcomb-form-native';
import { Icon } from 'react-native-elements';

const Form = t.form.Form;

//overriding tcomb textbox
var _ = require('lodash');
const stylesheet = _.cloneDeep(t.form.Form.stylesheet);

stylesheet.textbox.normal.height = 200;
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
  makeRemoteRequest = () => {};

  resetForm = () => {
    this.setState({ value: null });
  };

  DiscardForm = () => {
    Alert.alert('Discard Post', 'Are you sure you want to clear this form?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      },
      { text: 'Yes', onPress: () => this.resetForm() }
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
    console.log('value', value);
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
          username: global.currUser.email1
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        this.resetForm({});
        this.props.navigation.navigate('BlogPostList');
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    var buttonColors = ['rgba(255, 255, 255, 1)'];
    if (Platform.OS === 'android') {
      buttonColors = ['rgba(0, 42, 85, 1)'];
    }
    return (
      <View style={styles.mainContainer}>
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
                color={buttonColors}
                onPress={() =>
                  Alert.alert(
                    'Submit Post',
                    'Are you ready to post to the message board?',
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
              />
            </View>
          </View>
        </ScrollView>
      </View>
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
    flexDirection: 'column'
  }
});

export default NewBlogPost;
