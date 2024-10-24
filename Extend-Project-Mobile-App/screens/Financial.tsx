import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';

const Financial = () => {
  return (
    <View style={styles.container}>
      <Text>Financial</Text>
    </View>
  );
};

export default Financial;

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.white,
  },
});
