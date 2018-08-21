import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { Icon } from 'react-native-elements';
import { ListItem } from 'react-native-elements';

class BlogPostList extends React.Component {
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
          backgroundColor: '#CED0CE',
          marginLeft: '5%'
        }}
      />
    );
  };

  _onPressItem = item => {
    this.props.navigation.navigate('BlogPost', { post: item });
  };

  makeRemoteRequest = () => {
    const url = 'https://cuwomen.org/functions/app.gwln.php';
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
      },
      body: JSON.stringify({
        code: 'getBlogPosts',
        arguments: {
          limit: 25,
          offset: 0
        }
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item)}>
      <ListItem
        id={item.id}
        onPressItem={console.log('press')}
        roundAvatar
        title={item.title}
        subtitle={item.description}
        //avatar={{ uri: item.picture.thumbnail }}
        containerStyle={{ borderBottomWidth: 0 }}
      />
    </TouchableOpacity>
  );

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
          Blog{' '}
        </Text>
      ),
      headerRight: (
        <Icon
          containerStyle={{ marginRight: 15, marginTop: 15 }}
          iconStyle={styles.headerIcon}
          type="font-awesome"
          name="edit"
          onPress={navigation.getParam('goToAdd')}
        />
      )
    };
  };

  componentDidMount = () => {
    this.props.navigation.setParams({ goToAdd: this.goToNewBlogPost });
    this.makeRemoteRequest();
    this.mounted = true;
  };

  componentWillUnmount() {
    this.mounted = false;
  }
  goToNewBlogPost = () => {
    this.props.navigation.navigate('NewBlogPost');
  };
  render() {
    console.log(this.state.data);
    return (
      <View style={styles.mainContainer}>
        <ScrollView>
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={item => String(item.postID)}
            ItemSeparatorComponent={this.renderSeparator}
          />

          <View style={styles.BottomBorder} />
        </ScrollView>
      </View>
    );
  }
}

export default BlogPostList;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  BottomBorder: {
    width: '95%',
    marginLeft: '5%',
    backgroundColor: 'black',
    height: StyleSheet.hairlineWidth
  },
  headerIcon: {
    flex: 1,
    color: '#002A55'
  }
});
