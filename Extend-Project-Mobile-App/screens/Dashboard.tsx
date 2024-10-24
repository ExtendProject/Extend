import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import BottomSheet from '../components/BottomSheet';
import {colors} from '../utils/colors';

const Dashboard = () => {
  const navigation: any = useNavigation();

  const [showBottomSheet, setShowBottomSheet] = useState(false);

  const toggleBottomSheet = () => {
    setShowBottomSheet(!showBottomSheet);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <View>
            <Octicons name="three-bars" size={30} color={colors.black} />
          </View>
          <View>
            <Text style={styles.title}>Extended</Text>
          </View>
          <TouchableOpacity
            style={styles.signin}
            onPress={() => navigation.navigate('Sign In')}>
            <Text style={styles.signinText}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require('../assets/images/Group156.png')}
            style={styles.image1}
          />
          <Image
            source={require('../assets/images/Group157.png')}
            style={styles.image2}
          />
          <Image
            source={require('../assets/images/Group158.png')}
            style={styles.image3}
          />
        </View>
        <View>
          <Text style={styles.assistanceText}>AI Assistance </Text>
          <View style={styles.assistance}>
            <TouchableOpacity onPress={toggleBottomSheet}>
              <Image
                source={require('../assets/images/buildwithai.png')}
                style={styles.image12}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleBottomSheet}>
              <Image
                source={require('../assets/images/askai.png')}
                style={styles.image12}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleBottomSheet}>
              <Image
                source={require('../assets/images/interior.png')}
                style={styles.image12}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.createAccount}>
            <Text style={styles.createAccountText}>Create an account</Text>
          </TouchableOpacity>
        </View>
        {/* <Button title="Toggle Bottom Sheet" onPress={toggleBottomSheet} /> */}
        <BottomSheet visible={showBottomSheet} onClose={toggleBottomSheet}>
          <View style={styles.sheetWrapper}>
            <Text style={styles.titleB}>
              Use AI to get your Building Information
            </Text>
            <View style={styles.sheetRow}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chat');
                  toggleBottomSheet();
                }}>
                <Image
                  source={require('../assets/images/generatebuild.png')}
                  style={styles.image13}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chat');
                  toggleBottomSheet();
                }}>
                <Image
                  source={require('../assets/images/gettheplan.png')}
                  style={styles.image13}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.sheetRow}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chat');
                  toggleBottomSheet();
                }}>
                <Image
                  source={require('../assets/images/sustainablematerials.png')}
                  style={styles.image13}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Chat');
                  toggleBottomSheet();
                }}>
                <Image
                  source={require('../assets/images/surpriseme.png')}
                  style={styles.image13}
                />
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheet>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    borderBottomColor: 'rgba(0, 0, 0, 0.25)', // Border color with alpha (opacity)
    borderBottomWidth: 0.2, // Border width in points (not pixels)
    // borderBottomStyle: 'solid',
    paddingVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '300',
    color: colors.black,
  },
  signin: {
    height: 35,
    width: 82,
    backgroundColor: colors.black,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signinText: {
    color: colors.white,
    fontSize: 16,
  },
  createAccount: {
    height: 48,
    width: 256,
    backgroundColor: colors.black,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 30,
    // marginBottom: 20,
  },
  createAccountText: {
    color: colors.white,
    fontSize: 16,
  },
  image12: {
    height: 117,
    width: 114,
  },
  image1: {
    alignSelf: 'center',
    height: 180,
    width: 180,
  },
  image2: {
    alignSelf: 'flex-end',
    marginTop: -60,
    height: 180,
    width: 180,
  },
  image3: {
    alignSelf: 'flex-start',
    marginTop: -60,
    height: 180,
    width: 180,
  },
  assistance: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  assistanceText: {
    color: colors.black,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '400',
    marginBottom: 20,
  },
  titleB: {
    fontSize: 32,
    fontWeight: '300',
    color: colors.black,
  },
  sheetWrapper: {
    paddingHorizontal: 10,
  },
  sheetRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
  },
  image13: {
    height: 165,
    width: 174,
  },
});
