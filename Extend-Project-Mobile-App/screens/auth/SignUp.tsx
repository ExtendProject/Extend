import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  Button,
  // Image,
} from 'react-native';
import {colors} from '../../utils/colors';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [entityType, setEntityType] = useState('Realtor');
  const [modalVisible, setModalVisible] = useState(false);

  const navigation: any = useNavigation();
  const realtors = ['Vendor', 'Realtor', 'Individual'];

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.modalItem}
      onPress={() => {
        setEntityType(item);
        setModalVisible(false);
      }}>
      <Text style={styles.modalItemText}>{item}</Text>
    </TouchableOpacity>
  );

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/users/signup',
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phoneNumber,
          password,
          entity_type: entityType,
        },
      );

      // Handle success, e.g., navigate to another screen
      console.log('Registration successful:', response.data);
      Alert.alert('Success', 'Registration successful');
    } catch (error: any) {
      // Handle error, e.g., display error message
      console.error('Registration error:', error.response.data);
      Alert.alert('Error', error.response.data.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Are you ready for new experience</Text>

      {/* <Text>
        {JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          confirmPassword,
        })}
      </Text> */}

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

      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.inputText}>{entityType}</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="First name"
        placeholderTextColor="#999"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        placeholderTextColor="#999"
        value={lastName}
        onChangeText={setLastName}
      />
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
        placeholder="Phone number"
        placeholderTextColor="#999"
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#999"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.continueButton} onPress={handleRegister}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Sign In')}>
        <Text style={styles.linkText}>Already have an account?</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    textAlign: 'left',
    color: colors.black,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 24,
    textAlign: 'left',
    marginVertical: 20,
    fontWeight: '200',
    color: colors.black,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  step: {
    alignItems: 'center',
  },
  stepIconContainer: {
    backgroundColor: '#000',
    borderRadius: 50,
    padding: 10,
  },
  stepIconContainerInactive: {
    backgroundColor: '#ccc',
    borderRadius: 50,
    padding: 10,
  },
  stepIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  stepIconInactive: {
    width: 24,
    height: 24,
    tintColor: '#666',
  },
  stepText: {
    marginTop: 5,
    color: '#000',
  },
  stepTextInactive: {
    marginTop: 5,
    color: '#ccc',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  continueButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 20,
  },
  continueButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 14,
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
    color: colors.black,
  },
  inputText: {
    // color: '#999',
    marginTop: 15,
  },
});

export default SignUp;
