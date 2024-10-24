import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';

const StructuralPhase = () => {
  const navigation: any = useNavigation();
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.container1}>
      <Text style={styles.title}>Structural Phase</Text>
      <Image
        source={require('../assets/images/structural.png')}
        style={styles.image}
      />
      {/* blueprint.png */}
      <Text style={styles.subtitle}>Tools needed</Text>

      <View style={styles.listContainer}>
        <View>
          {['Hammer', 'Nails'].map((item, index) => (
            <View key={index} style={styles.listItem}>
              <MaterialCommunityIcons
                name="moon-full"
                size={12}
                color={colors.black}
              />
              <Text style={styles.toolName}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.viewMore}>
        <Text style={styles.viewMoreText}>View more</Text>
      </TouchableOpacity>
      <Text style={styles.subtitle}>Materials needed</Text>

      <View style={styles.listContainer}>
        <View>
          {['Wood', 'Oil'].map((item, index) => (
            <View key={index} style={styles.listItem}>
              <MaterialCommunityIcons
                name="moon-full"
                size={12}
                color={colors.black}
              />
              <Text style={styles.toolName}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      <TouchableOpacity style={styles.viewMore}>
        <Text style={styles.viewMoreText}>View more</Text>
      </TouchableOpacity>

      <View style={styles.bottom}>
        <View style={styles.estimatedCostContainer}>
          <Text style={styles.estimatedCostText}>Estimated cost:</Text>
          <Text style={styles.costValue}>GHC 5,000.00</Text>
        </View>
        <Text style={styles.estimatedCostInfo}>
          This is the estimated cost of the materials and tools needed for the
          project
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.vendorButton}
            onPress={() => navigation.navigate('Stores')}>
            <Text style={styles.buttonText}>vendor near you</Text>
            <Ionicons name="location-sharp" size={20} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.phasesButton}
            onPress={() => navigation.navigate('Enclosure Phase')}>
            <Text style={styles.buttonText1}>Next Phase</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  container1: {
    flex: 1,
    // backgroundColor: '#fff',
    // padding: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 18,
  },
  title: {
    fontSize: 30,
    fontWeight: '400',
    // textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
  blueprintImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 10,
    marginTop: 30,
  },
  listContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  listItem: {
    fontSize: 16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  estimatedCostContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  estimatedCostText: {
    fontSize: 16,
  },
  costValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  estimatedCostInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  vendorButton: {
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  phasesButton: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  viewMore: {
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: 150,
    alignSelf: 'flex-end',
  },
  viewMoreText: {
    textAlign: 'center',
    color: colors.white,
  },
  buttonText: {
    color: colors.black,
  },
  buttonText1: {
    color: colors.white,
  },
  phasesButtonText: {
    color: '#fff',
  },
  image: {
    height: 214,
    width: '95%',
    alignSelf: 'center',
  },
  toolName: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '300',
  },
  bottom: {
    bottom: 10,
    position: 'absolute',
  },
});

export default StructuralPhase;
