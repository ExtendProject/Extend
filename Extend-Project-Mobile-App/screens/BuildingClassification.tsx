import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BuildingClassification = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity> */}
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.promptCard}>
          <Octicons name="dash" size={20} color="black" />
          <MaterialIcons name="keyboard-arrow-right" size={20} color="black" />

          <Text style={styles.promptTitle}>Prompt Data for AI</Text>
          <Text style={styles.promptDescription}>
            Create a versatile and sustainable architectural design for a modern
            eco-friendly community centre.
          </Text>
          <TouchableOpacity style={styles.editButton}>
            <AntDesign name="form" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.classificationTitle}>Building Classification</Text>
        {[
          'Residential Buildings',
          'Commercial Buildings',
          'Industrial Buildings',
          'Institutional Buildings',
          'Recreational Buildings',
          'Transportation Buildings',
          'Special Purpose Buildings',
        ].map((classification, index) => (
          <TouchableOpacity
            key={index}
            style={{
              ...styles.classificationButton,
              alignSelf: index % 2 === 0 ? 'flex-start' : 'flex-end',
            }}>
            <Text style={styles.classificationText}>{classification}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </ScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    // padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  content: {
    paddingBottom: 16,
  },
  promptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 30,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
    position: 'relative',
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  promptDescription: {
    fontSize: 14,
    color: '#666',
  },
  editButton: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  classificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  classificationButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  classificationText: {
    fontSize: 16,
    color: '#666',
  },
  continueButton: {
    backgroundColor: '#000000',
    borderRadius: 24,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BuildingClassification;
