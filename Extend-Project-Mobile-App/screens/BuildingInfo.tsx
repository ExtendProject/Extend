import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';

const BuildingInfo = () => {
  const navigation: any = useNavigation();

  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedBedroom, setSelectedBedroom] = useState(null);
  const [selectedMainRoom, setSelectedMainRoom] = useState(null);
  const [selectedWashroom, setSelectedWashroom] = useState(null);

  const renderOptions = (
    title: string,
    subTitle: string,
    options: number[],
    selectedOption: any,
    setSelectedOption: any,
  ) => (
    <View>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionSubTitle}>{subTitle}</Text>
      <View style={styles.optionButtons}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            selectedOption === null && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption(null)}>
          <Text
            style={[
              styles.optionText,
              selectedOption === null && styles.optionText1,
            ]}>
            Any
          </Text>
        </TouchableOpacity>
        {options.map(option => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              selectedOption === option && styles.selectedOption,
            ]}
            onPress={() => setSelectedOption(option)}>
            <Text
              style={[
                styles.optionText,
                selectedOption === option && styles.optionText1,
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.promptCard}>
          <View style={styles.promptCardHeader}>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={30}
              color="black"
            />
            <Octicons name="dash" size={24} color="black" />
          </View>

          <Text style={styles.promptTitle}>Prompt Data for AI</Text>
          <Text style={styles.promptDescription}>
            Create a versatile and sustainable architectural design for a modern
            eco-friendly community centre.
          </Text>
        </View>
        <View style={styles.promptDescriptions}>
          {renderOptions(
            'Storey Building',
            'Level stages',
            [1, 2, 3, 5, 6],
            selectedLevel,
            setSelectedLevel,
          )}
          <View style={styles.divider} />
          {renderOptions(
            'Rooms | Beds',
            'Bedrooms',
            [1, 2, 3, 5, 6],
            selectedBedroom,
            setSelectedBedroom,
          )}
          <View style={styles.divider} />

          {renderOptions(
            'Hall',
            'Main room',
            [1, 2, 3, 5, 6],
            selectedMainRoom,
            setSelectedMainRoom,
          )}
          <View style={styles.divider} />

          {renderOptions(
            'Washroom / bathrooms',
            'Washrooms',
            [1, 2, 3, 5, 6],
            selectedWashroom,
            setSelectedWashroom,
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={() => navigation.navigate('Chat')}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    // padding: 20,
    backgroundColor: '#fff',
  },
  divider: {
    height: 1,
    backgroundColor: '#CED0CE', // You can customize the color
    width: '80%',
    marginVertical: 20, // You can adjust the spacing
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  // optionContainer: {
  //   marginBottom: 20,
  // },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  optionSubTitle: {
    fontSize: 18,
    fontWeight: '300',
    marginBottom: 10,
  },
  optionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: colors.black,
    // color: colors.white,
  },
  optionText: {
    color: colors.black,
  },
  optionText1: {
    color: colors.white,
  },
  continueButton: {
    backgroundColor: colors.black,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginTop: 10,
    // position: 'absolute',
    // bottom: 20,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  promptCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 30,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 5,
    position: 'relative',
    marginTop: 60,
  },

  promptTitle: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 8,
    marginTop: 5,
  },
  promptDescription: {
    fontSize: 16,
    fontWeight: '300',
  },
  promptCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: -7,
  },
  promptDescriptions: {
    alignItems: 'center',
  },
});

export default BuildingInfo;
