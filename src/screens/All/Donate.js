import React from 'react';
import { StyleSheet, Text, View, Image, Platform, Linking } from 'react-native';
import { Button } from 'react-native-elements';
import donateImage from '../../assets/img/Donate.jpg';

const Donate = () => (
  <View>
    <Image source={donateImage} style={styles.image} />
    <Text style={styles.text}>
      GWLN envisions a world where ALL women realize gender equality:
      politically, socially, and economically. Women leaders are the key to
      ignite progress toward this goal.{' '}
    </Text>
    <View style={styles.buttonContainer}>
      <Button
        title="Donate"
        onPress={() => Linking.openURL('https://www.woccu.org/give?s=7')}
        buttonStyle={styles.button}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  imageContainer: {
    position: 'absolute',
    top: '10%',
    resizeMode: 'cover'
  },
  button: {
    height: 40,
    width: 150,
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
  buttonContainer: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: '20%'
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.2,
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
