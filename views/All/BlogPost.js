import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
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
      headerRight: <View />
    };
  };

  makeRemoteRequest = () => {};
  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.postContainer}>
            <ScrollView>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontWeight: '400',
                  fontSize: 17,
                  color: '#002A55',
                  paddingVertical: 10
                }}
              >
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
