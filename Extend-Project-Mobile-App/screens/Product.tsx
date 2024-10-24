import React from 'react';
import {View, Text, FlatList, Image, Button, StyleSheet} from 'react-native';
import {useCart} from '../components/CartContext';

const Product = () => {
  const data = [
    {
      id: 1,
      name: 'Cement',
      amount: 10.0,
      image:
        'https://images.moneycontrol.com/static-mcnews/2018/02/Budget-2018_cement-770x433.jpg?impolicy=website&width=770&height=431',
    },
    {
      id: 2,
      name: 'Treated Wood',
      amount: 12.0,
      image:
        'https://www.bmr.ca/media/catalog/product/cache/dbd4d66e0218ad08feb3e29c5f000568/0/7/074-9163_001_5.jpg',
    },
    {
      id: 3,
      name: 'Round dining table',
      amount: 50.0,
      image:
        'https://www.tacc.co.ke/wp-content/uploads/2023/05/PDINTBL74_Walnut_1.jpg',
    },
    {
      id: 4,
      name: 'LG air conditioner',
      amount: 150.0,
      image:
        'https://klivago.com/media/image/product/2197/md/lg-air-conditioner-r32-wall-unit-standard-plus-pc24sq-66-kw-i-24000-btu.jpg',
    },
    {
      id: 5,
      name: 'Bed',
      amount: 500.99,
      image: 'https://www.dogtas.com/images/thumbs/002/0021115_bedroom.jpeg',
    },
    // Add more products as needed
  ];

  const {addToCart}: any = useCart();
  return (
    <View style={styles.container}>
      {/* <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginRight: 20,
        }}>
        <Button title="Cart" />
        <Text style={{fontSize: 20}}>0</Text>
      </View> */}
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.productCard}>
            <Image source={{uri: item.image}} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productAmount}>${item.amount}</Text>
              <Button title="Add to Cart" onPress={() => addToCart(item)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  productCard: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3, // for Android shadow
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productAmount: {
    fontSize: 16,
    marginBottom: 5,
  },
});
