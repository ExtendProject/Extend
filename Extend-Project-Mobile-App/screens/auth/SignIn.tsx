import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  FlatList,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {colors} from '../../utils/colors';

const LoginPage = () => {
  const [type, setType] = useState('Realtor');
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const realtors = ['Builder', 'Vendor', 'Individual'];

  const navigation: any = useNavigation();

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setType(item);
        setModalVisible(false);
      }}>
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/login',
        {
          email,
          password,
        },
      );

      // Handle success, e.g., navigate to another screen
      console.log('Login successful:', response.data);
      Alert.alert('Success', 'Login successful');
    } catch (error: any) {
      // Handle error, e.g., display error message
      console.error('Login error:', error.response.data);
      Alert.alert('Error', error.response.data.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled>
      <ScrollView>
        <Image
          source={require('../../assets/images/house.png')}
          style={styles.image}
        />
        <View style={styles.bottom}>
          <Text style={styles.title}>Extended</Text>
          <Text style={styles.subtitle}>Log into your account</Text>

          {/* <TouchableOpacity
          style={styles.input}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.inputText}>{type}</Text>
        </TouchableOpacity> */}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Log-in</Text>
          </TouchableOpacity>

          <View style={styles.row}>
            <TouchableOpacity>
              {/* <Text style={styles.linkText}>Remember</Text> */}
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Sign Up')}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <FlatList
                  data={realtors}
                  renderItem={renderItem}
                  keyExtractor={item => item}
                />
                <Button title="Close" onPress={() => setModalVisible(false)} />
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '100',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    justifyContent: 'center',
    color: colors.black,
    // padding: 20,
  },
  inputText: {
    color: '#999',
  },
  loginButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  linkText: {
    color: '#000',
    fontSize: 14,
  },
  registerButton: {
    marginTop: 20,
    paddingVertical: 15,
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '300',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  modalItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  bottom: {
    padding: 20,
  },
  image: {
    height: 250,
  },
});

export default LoginPage;
