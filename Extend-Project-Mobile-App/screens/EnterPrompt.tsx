import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';

const EnterPrompt = () => {
  const navigation: any = useNavigation();
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>
          Use AI to get your Building Information
        </Text>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptLabel}>Enter Prompt</Text>
        <TextInput
          style={styles.input}
          placeholder="Type something"
          placeholderTextColor="#B0B0B0"
        />
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.generateButton}
            onPress={() => navigation.navigate('Get Started')}>
            <Text style={styles.buttonText}>Generate</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.moreInfoButton}
            onPress={() => navigation.navigate('Building Classification')}>
            <Text style={styles.buttonText}>Add more info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: colors.black,
  },
  promptContainer: {
    flex: 1,
    // backgroundColor: '#FFFFFF',
    // backgroundColor: 'red',
    borderRadius: 16,
    padding: 16,
  },
  promptLabel: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 8,
    color: colors.black,
  },
  input: {
    // height: 150,
    height: '80%',
    borderColor: '#B0B0B0',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'left',
    // padding: 8,
    // marginBottom: 16,
    backgroundColor: '#FFFFFF',
    // backgroundColor:'red',
    color: colors.black,
    // textAlignVertical: 'top',
  },
  generateButton: {
    height: 48,
    paddingHorizontal: 40,
    backgroundColor: colors.black,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
  },
  buttonText: {
    color: '#FFFFFF',
    // fontSize: 16,
    // fontWeight: 'bold',
    fontFamily: '300',
  },
  moreInfoButton: {
    height: 48,
    paddingHorizontal: 40,
    backgroundColor: colors.black,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
});

export default EnterPrompt;
