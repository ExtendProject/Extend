import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../utils/colors';

const Register = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/images/buildingplan.png')}
        style={styles.image}
      />
      <View style={styles.sectionTwo}>
        <Text style={styles.title}>Extented</Text>

        <Text style={styles.infoTitle}>Select one to sign up</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Individual</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Realtor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Builders / Financial</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.already}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
  },
  image: {
    flex: 0.4,
    width: '100%',
  },
  sectionTwo: {
    flex: 0.6,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 24,
    fontWeight: '200',
    color: colors.ash,
    marginTop: 20,
  },
  button: {
    borderWidth: 0.3,
    borderRadius: 50,
    height: 48,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '300',
  },
  already: {
    fontSize: 15,
    marginTop: 40,
    color: colors.ash,
    fontWeight: '300',
  },
});
