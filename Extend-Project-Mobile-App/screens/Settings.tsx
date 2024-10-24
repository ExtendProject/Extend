import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation: any = useNavigation();

  return (
    <View>
      <Text>Settings</Text>
      <Button
        title="To settings page"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({});
