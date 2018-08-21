import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Platform,
  Linking
} from 'react-native';
import donateImage from '../../img/Donate.jpg';

class Donate extends React.Component {
  render() {
    var buttonColors = ['rgba(255, 255, 255, 1)'];
    if (Platform.OS === 'android') {
      buttonColors = ['rgba(0, 42, 85, 1)'];
    }
    return (
      <View>
        <Image source={donateImage} style={styles.image} />
        <Text style={styles.text}>
          GWLN envisions a world where ALL women realize gender equality:
          politically, socially, and economically. Women leaders are the key to
          ignite progress toward this goal.{' '}
        </Text>
        <View style={styles.buttonContainer}>
          <Button
            color={buttonColors}
            title="Donate"
            onPress={() => {
              Linking.openURL('https://www.woccu.org/give?s=7');
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  imageContainer: {
    position: 'absolute',
    top: '10%',
    resizeMode: 'cover'
  },
  buttonContainer: {
    backgroundColor: '#002A55',
    alignSelf: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderColor: '#002A55',
    borderWidth: 1,
    borderRadius: 5,
    position: 'absolute',
    bottom: '20%'
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.4,
    padding: 50
  },
  text: {
    ...Platform.select({
      ios: {
        fontFamily: 'Helvetica',
        fontWeight: '600'
      },
      android: {
        fontFamily: 'sans-serif-medium',
        fontWeight: '400'
      }
    }),
    fontSize: 21,
    alignSelf: 'center',
    textAlign: 'center',
    alignItems: 'center',
    color: '#002A55',
    position: 'absolute',
    bottom: '40%',
    margin: '5%'
  }
});

export default Donate;
