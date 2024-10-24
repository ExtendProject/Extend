import {useNavigation, useRoute} from '@react-navigation/native';
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
import Feather from 'react-native-vector-icons/Feather';
import {useCart} from '../components/CartContext';
import {colors} from '../utils/colors';

const products = [
  {
    id: '1',
    name: 'Agitator Truck',
    type: '00001',
    price: 3000.0,
    // hirePrice: '$13,000',
    image: require('../assets/images/truck.png'),
  },
  {
    id: '2',
    name: 'Shovels',
    type: '00001',
    price: 5000.99,
    // hirePrice: '$13,000',
    image: require('../assets/images/shovel.jpg'),
  },
  {
    id: '3',
    name: 'Slit fences',
    type: '00001',
    price: 7800.99,
    // hirePrice: '$13,000',
    image: require('../assets/images/fence.jpg'),
  },
  {
    id: '4',
    name: 'Bulldozers',
    type: '00002',
    price: 300.0,
    // hirePrice: '$13,000',
    image: require('../assets/images/bull.webp'),
  },
  {
    id: '5',
    name: 'Pickaxes',
    type: '00001',
    price: 40.0,
    // hirePrice: '$13,000',
    image: require('../assets/images/pickase.webp'),
  },
  {
    id: '6',
    name: 'Cement',
    type: '00001',
    price: 20.0,
    // hirePrice: '$13,000',
    image: require('../assets/images/cement.jpg'),
  },
];

const Shop = () => {
  const {addToCart, totalItems}: any = useCart();
  const navigation: any = useNavigation();
  const data: any = useRoute().params;

  function formatNumberWithCommas(value: any) {
    // Check if value is undefined or null
    if (value === undefined || value === null) {
      return '0.00'; // or handle as needed
    }

    // Split the value into whole and decimal parts
    let [whole, decimal] = value.toString().split('.');

    // Add commas to the whole part
    whole = whole.replace(/\B(?=(\d{3})+(?!))/g, ',');

    // Combine whole and decimal parts, ensuring two decimal places
    return decimal ? `${whole}.${decimal.padEnd(2, '0')}` : `${whole}.00`;
  }

  const renderProductItem = ({item}: any) => (
    <View style={styles.productCard}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productType}>Types {item.type}</Text>
      <View style={styles.productRow}>
        <View style={styles.productColumn}>
          <Text style={styles.productPrice}>
            ${formatNumberWithCommas(item.price)}
          </Text>
          <Text style={styles.productName}>Buy</Text>
        </View>
        <View style={styles.productColumn}>
          <Text style={styles.productPrice}>$13,000</Text>
          <Text style={styles.productName}>Rent</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart(item)}>
        <Text style={styles.addToCartText}>Add to cart</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.head}>
        <Text style={styles.heading}>{data?.name}</Text>
        <TouchableOpacity
          style={styles.cartBackground}
          onPress={() => navigation.navigate('Cart')}>
          <Feather name="shopping-cart" size={22} color={colors.white} />
          <Text style={styles.cartText}>{totalItems}</Text>
        </TouchableOpacity>
      </View>
      {/* Products List */}
      <Text style={styles.title}>Tools</Text>
      <FlatList
        data={products}
        renderItem={renderProductItem}
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
