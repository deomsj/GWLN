import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import { SearchBar, List, ListItem } from 'react-native-elements';
import _ from 'lodash';

const contains = ({ first_name, last_name }, query) =>
  first_name.includes(query) || last_name.includes(query);

class MemberList extends React.Component {
  static navigationOptions = {
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
        Member List{' '}
      </Text>
    ),
    headerRight: <View />
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      page: 1,
      seed: 1,
      error: null,
      refreshing: false,
      query: '',
      fullData: []
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%'
        }}
      />
    );
  };
  _onPressItem = item => {
    console.log('item  --- ', item);
    this.props.navigation.navigate('MemberContactPage', { user: item });
  };

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this._onPressItem(item)}>
      <ListItem
        id={item.id}
        roundAvatar
        title={`${item.first_name} ${item.last_name}`}
        subtitle={item.email1}
        containerStyle={{ borderBottomWidth: 0 }}
      />
    </TouchableOpacity>
  );

  renderHeading = () => {
    return (
      <SearchBar
        placeholder="Search"
        lightTheme
        round
        ref={ref => (this.searchBar = ref)}
        onChangeText={this.handleSearch}
        containerStyle={styles.searchBar}
      />
    );
  };

  handleSearch = text => {
    if (!text) return;
    const formatQuery = text.replace(/(^|\s)[a-z]/g, function(f) {
      return f.toUpperCase();
    });
    const data = this.state.fullData.filter(member =>
      contains(member, formatQuery)
    );
    this.setState({ query: formatQuery, data });
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }
  makeRemoteRequest = () => {
    const url = 'https://cuwomen.org/functions/app.gwln.php';
    this.setState({ loading: true });
    fetch(url, {
      method: 'POST',
      headers: {
        'X-Token': 'hub46bubg75839jfjsbs8532hs09hurdfy47sbub'
      },
      body: JSON.stringify({
        code: 'getMembersShares'
      })
    })
      .then(res => res.json())
      .then(res => {
        this.setState({
          error: res.error || null,
          loading: false,
          refreshing: false,
          data: res,
          fullData: res
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  render() {
    console.log('render data length', this.state.data.length);
    return (
      <View style={styles.mainContainer}>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={item => item.username}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeading}
          />
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white'
  },
  searchBar: {
    zIndex: 1
  }
});
export default MemberList;
