import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../utils/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const GetStarted = () => {
  // background: linear-gradient(180deg, #283593 0%, #FFFFFF 100%);
  const navigation: any = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient
        colors={['#283593', '#FFFFFF']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.innerContainer}>
            <View style={styles.top}>
              <Image source={require('../assets/images/buildhomes.png')} />
              <Image source={require('../assets/images/cloud.png')} />
            </View>
            <Text style={styles.header}>Build homes with AI</Text>
            <View style={styles.infoContainer}>
              <View style={styles.info}>
                <Text style={styles.infoText}>
                  Generate a description of a futuristic building with
                  innovative design
                </Text>
              </View>
            </View>
            <Image
              source={require('../assets/images/architecture.png')}
              style={styles.image}
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type something"
                placeholderTextColor={colors.black}
              />
              <View style={styles.circle}>
                <FontAwesome name="send" size={24} color={colors.black} />
              </View>
              {/* <Text>sdhgfhgfhfgf</Text> */}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Dashboard Provider')}>
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  top: {
    flexDirection: 'row',
    marginTop: 50,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '300',
    color: colors.white,
  },
  info: {
    width: 354,
    height: 77,
    borderColor: colors.white,
    borderRadius: 20,
    borderTopWidth: 0.3,
    borderRightWidth: 0.3,
    borderLeftWidth: 0.3,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: Platform.OS === 'ios' ? 8 : 0,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.white,
    fontWeight: '300',
  },
  infoContainer: {
    marginLeft: 10,
    marginTop: 80,
  },
  image: {
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 50,
  },
  input: {
    width: 300,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 50,
    paddingLeft: 20,
    color: colors.black,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 70,
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25, // Half of the width/height to create a circle
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  button: {
    alignSelf: 'center',
    height: 48,
    backgroundColor: colors.black,
    width: 197,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 40,
  },
  buttonText: {
    color: colors.white,
    fontWeight: '400',
    fontSize: 18,
  },
});
