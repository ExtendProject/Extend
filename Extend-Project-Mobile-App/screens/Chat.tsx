import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Dimensions,
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
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../utils/colors';
import {useDataRepo} from '../components/DataRepoContext';

const Chat = () => {
  // background: linear-gradient(180deg, #283593 0%, #FFFFFF 100%);
  const navigation: any = useNavigation();
  // const [buildingData, setBuildingData] = useState<any>([]);
  // const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const {buildingData, loading, fetchBuildingData}: any =
    useDataRepo();

 

  if (loading) return <Text style={styles.loading}>Loading.....</Text>;
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <LinearGradient
        // colors={['#283593', '#FFFFFF']}
        colors={['#283593', '#FFFFFF']}
        // colors={['#FFFFFF', '#FFFFFF']}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.container}>
        <View style={{flex: 1}}>
          <View style={styles.innerContainer}>
            <ScrollView
              style={styles.imagesContainer}
              contentContainerStyle={styles.scrollViewContent}>
              {/* {loading && (
                  <View style={styles.loading}>
                    <Text>Loading...</Text>
                  </View>
                )} */}
              {/* data[0]?.results */}
              {buildingData[0]?.results?.map((item: any, i: number) => (
                <View key={i}>
                  <Image
                    // source={require('../assets/images/architecture.png')}
                    source={{uri: item.image_base64}}
                    style={styles.image}
                  />
                  {/* <Text>{item.id}</Text>  */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Blue Print')}>
                    <Text style={styles.full}>Generate blue print</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>

            <View style={styles.bottom}>
              {/* <Text>dsf {prompt}</Text> */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type something"
                  placeholderTextColor={colors.black}
                  onChangeText={text => setPrompt(text)}
                />
                <TouchableOpacity style={styles.circle} onPress={() =>fetchBuildingData(prompt)}>
                  <FontAwesome name="send" size={24} color={colors.black} />
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Dashboard Provider')}>
                <Text style={styles.buttonText}>Get Started</Text>
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  innerContainer: {
    flex: 1,
    // justifyContent:'space-between'
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
    alignSelf: 'center',
    // marginRight: 10,
    marginTop: 50,
    width: '90%',
    height: 200,
    // resizeMode: 'contain',
    // marginBottom: 8,
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
    // marginTop: 70,
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
  bottom: {
    bottom: 0,
    position: 'absolute',
    alignSelf: 'center',
    marginBottom: 40,
    // backgroundColor: 'white',
    // width: '100%',
  },
  full: {
    textAlign: 'right',
    marginRight: 20,
    textDecorationLine: 'underline',
    color: colors.white,
    fontSize: 16,
    fontWeight: '300',
    padding: 5,
  },
  imagesContainer: {
    marginBottom: 120,
  },
  loading: {
    marginTop: Dimensions.get('window').height / 2,
    alignSelf: 'center',
    fontSize: 32,
  },
});
