import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';

let Radio = ({ onSelect }) => (
  <RadioGroup
    size={18}
    thickness={2}
    style={styles.rg}
    color="#200a55"
    onSelect={(_, value) => onSelect(value)}
  >
    <RadioButton value="yes" style={styles.rb}>
      <Text>Yes</Text>
    </RadioButton>
    <RadioButton value="no" style={styles.rb}>
      <Text>No</Text>
    </RadioButton>
  </RadioGroup>
);

const styles = StyleSheet.create({
  rg: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  rb: {
    alignItems: 'center',
    flexDirection: 'row'
  }
});

export default Radio;
