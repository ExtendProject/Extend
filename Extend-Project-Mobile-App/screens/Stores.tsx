// import {useNavigation} from '@react-navigation/native';
// import React from 'react';
// import {
//   SafeAreaView,
//   FlatList,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
// } from 'react-native';

// const stores = [
//   {id: '1', name: 'Construction Supplies Store'},
//   {id: '2', name: 'Hardware Depot'},
//   {id: '3', name: 'Building Materials Warehouse'},
//   {id: '4', name: 'Tool World'},
//   {id: '5', name: 'Home Improvement Center'},
//   {id: '6', name: 'Eco-Friendly Supplies'},
//   {id: '7', name: 'Lumber and More'},
// ];

// const StoreList = () => {
//   const navigation: any = useNavigation(); // Assuming useNavigation hook is used for navigation

//   // Function to render each store item as a card
//   const renderStoreItem = ({item}: any) => (
//     <TouchableOpacity
//       style={styles.storeCard}
// onPress={() =>
//   navigation.navigate('Shop', {
//     name: item.name,
//   })
// }>
//       <Text style={styles.storeName}>{item.name}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.heading}>Vendors near you</Text>
//       <FlatList
//         data={stores}
//         renderItem={renderStoreItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f7f7f7', // Light background color for contrast
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333', // Darker color for heading
//     marginBottom: 20,
//     textAlign: 'center', // Center align the heading
//   },
//   listContainer: {
//     paddingBottom: 20,
//   },
//   storeCard: {
//     backgroundColor: '#fff', // White background for store items
//     borderRadius: 10,
//     padding: 15,
//     marginVertical: 10,
//     shadowColor: '#000', // Shadow for depth effect
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2, // For Android shadow effect
//   },
//   storeName: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#333',
//   },
// });

// export default StoreList;

import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../utils/colors';

const stores = [
  {
    id: '1',
    name: 'Construction Supplies Store',
    location: '0.4 Km',
    image: require('../assets/images/store1.jpg'),
  },
  {
    id: '2',
    name: 'Hardware Depot',
    location: '0.8 Km',
    image: require('../assets/images/store2.jpeg'),
  },
  {
    id: '3',
    name: 'Tool World',
    location: '2.8 Km',
    image: require('../assets/images/store3.webp'),
  },
  {
    id: '4',
    name: 'Home Improvement Center',
    location: '3.5 Km',
    image: require('../assets/images/store4.jpeg'),
  },
  {
    id: '5',
    name: 'Eco-Friendly Supplies',
    location: '3.9 Km',
    image: require('../assets/images/store5.jpeg'),
  },
  {
    id: '6',
    name: 'Lumber and More',
    location: '8.9 Km',
    image: require('../assets/images/store6.webp'),
  },
];

const Shop = () => {
  const navigation: any = useNavigation();

  const renderStoresItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() =>
        navigation.navigate('Shop', {
          name: item.name,
        })
      }>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <View style={styles.productRow}>
        <Text style={styles.productName}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Products List */}
      <Text style={styles.title}>Vendors near you</Text>
      <FlatList
        data={stores}
        renderItem={renderStoresItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        style={{paddingHorizontal: 10}}
      />
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
export default Shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 15,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  searchButton: {
    padding: 10,
  },
  categoriesList: {
    // marginVertical: 20,
  },
  categoryContainer: {
    // alignItems: 'center',
    // marginHorizontal: 10,
  },
  categoryImage: {
    width: 82,
    height: 82,
    borderRadius: 5,
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    width: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '200',
    marginVertical: 10,
    paddingLeft: 20,
  },
  row: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productCard: {
    flex: 0.48,
    backgroundColor: '#f9f9f9',
    borderRadius: 7,
    padding: 10,
    marginVertical: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '300',
    color: '#5E5E5E',
    marginTop: 5,
  },
  productType: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
    fontWeight: '600',
  },
  hirePrice: {
    fontSize: 14,
    color: '#333',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    width: 121,
    alignSelf: 'center',
    marginBottom: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    // paddingHorizontal: 10,
  },
  productColumn: {
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  cartBackground: {
    backgroundColor: '#000',
    padding: 10,
    // borderRadius: 25,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    alignItems: 'center',
    // alignSelf: 'flex-end',
    width: 80,
    height: 41,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    flexDirection: 'row',
    gap: 10,
  },
  cartText: {
    color: colors.white,
    fontSize: 18,
  },
  head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 16,
  },
});
