import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import HTML from 'react-native-render-html';

class BlogPost extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text
          style={{
            flex: 1,
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: '#002A55'
          }}
        >
          Post Details
        </Text>
      ),
      headerRight: (global.currUser || {}).is_event_admin ? (
        <Icon
          containerStyle={{ marginRight: 15, marginTop: 15 }}
          iconStyle={styles.headerIcon}
          type="font-awesome"
          name="trash"
          onPress={navigation.getParam('deletePost')}
        />
      ) : null
    };
  };

  componentDidMount = value => {
    this.props.navigation.setParams({ deletePost: this.deletePost });
  };

  deletePost = () => {
    Alert.alert(
      'Delete Blog Post',
      'Are you sure you want to delete this blog post?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'Yes', onPress: this.DeleteBlogPost }
      ]
    );
  };

  DeleteBlogPost = () => {
    const url = 'https://cuwomen.org/functions/app.gwln.php';
    const args = {
      post_id: this.props.navigation.state.params.post.post_id,
      username: (global.currUser || {}).username
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
      },
      body: JSON.stringify({
        code: 'deleteBlogPost',
        arguments: args
      })
    })
      .then(res => res.json())
      .then(() => {
        this.props.navigation.navigate('Blog', {
          postsUpdated: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.postContainer}>
            <ScrollView>
              <Text style={styles.title}>
                {this.props.navigation.state.params.post.title}
              </Text>
              <HTML
                html={this.props.navigation.state.params.post.story}
                imagesMaxWidth={Dimensions.get('window').width}
              />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#002a55',
    flex: 1,
    padding: 20,
    alignItems: 'center'
  },
  postText: {
    color: '#002a55',
    fontSize: 16,
    fontWeight: '400'
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: 17,
    color: '#002A55',
    paddingVertical: 10
  },
  postContainer: {
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cardContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    top: '5%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    width: '90%',
    borderRadius: 10
  }
});
export default BlogPost;
