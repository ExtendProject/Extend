import {StripeProvider, useStripe} from '@stripe/stripe-react-native';
import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {useCart} from '../components/CartContext';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';

const CartScreen = () => {
  const {cartItems, onRemove, onIncrease, onDecrease, totalAmount}: any =
    useCart();
  const navigation: any = useNavigation();

  //   const getTotalPrice = () => {
  //     return cartItems.reduce(
  //       (total, item) =>
  //         total + parseFloat(item.price.replace('$', '')) * item.quantity,
  //       0,
  //     );
  //   };
  function formatNumberWithCommas(value: any) {
    // Check if the value is undefined or null
    if (value === undefined || value === null) {
      return '0.00'; // or handle as needed
    }

    // Convert the value to a string and trim any whitespace
    let strValue = value.toString().trim();

    // Check if the string is a valid number
    if (isNaN(strValue)) {
      return '0.00'; // or handle invalid input as needed
    }

    // Split the value into whole and decimal parts
    let [whole, decimal] = strValue.split('.');

    // Add commas to the whole part
    whole = whole.replace(/\B(?=(\d{3})+(?!))/g, ',');

    // Combine whole and decimal parts, ensuring two decimal places
    return decimal ? `${whole}.${decimal.padEnd(2, '0')}` : `${whole}.00`;
  }

  const renderCartItem = ({item}: any) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemType}>Type {item.type}</Text>

        <View style={styles.cartPriceRow}>
          <Text style={styles.cartItemPrice}>${item.price}</Text>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => onDecrease(item)}>
              <Feather name="minus" size={22} color={colors.gray} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => onIncrease(item)}>
              <Feather name="plus" size={22} color={colors.gray} />
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.cartItemSubtotal}>
          Subtotal: $
          {formatNumberWithCommas(
            (parseFloat(item.price) * item.quantity).toFixed(2),
          )}
        </Text>

        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          style={styles.removeButton}>
          <Text style={styles.removeButtonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `http://192.168.1.179:6000/create-payment-intent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalAmount.toFixed(2), // Amount should be in cents (e.g., $10.00 = 1000 cents)
        }),
      },
    );
    const {paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} =
      await fetchPaymentSheetParams();

    console.log({paymentIntent, ephemeralKey, customer});
    const {error} = await initPaymentSheet({
      merchantDisplayName: 'Example, Inc.',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jane Doe',
      },
      returnURL: 'stripe-example://stripe-redirect',
    });

    console.log('hiiiii', error);

    if (!error) {
      setLoading(true);
    }
  };

  const openPaymentSheet = async () => {
    initializePaymentSheet().then(async () => {
      const {error} = await presentPaymentSheet();

      if (error) {
        Alert.alert(`Error code: ${error.code}`, error.message);
      } else {
        Alert.alert('Success', 'Your order is confirmed!');
        navigation.navigate('Blue Print');
      }
    });
  };

  return (
    <StripeProvider
      publishableKey="pk_test_51HxFijD844BjnaxyOxdQIMYMpNObyRhASjHLre8t5qZWMplBlJF7e29THoFD0ZjIeRE1tadOynKLSj2xZq0pYEWx004jgXygol"
      // merchantIdentifier="merchant.com.your.identifier" // Optional, for Apple Pay
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.pageTitle}>Shopping Cart</Text>

        {cartItems.length === 0 ? (
          <View style={styles.emptyCartContainer}>
            <Feather name="shopping-cart" size={64} color={colors.gray} />
            <Text style={styles.emptyCartText}>Your cart is empty</Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            <FlatList
              data={cartItems}
              renderItem={renderCartItem}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.cartList}
            />

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>
                Total: ${formatNumberWithCommas(totalAmount)}
              </Text>
              {/* <Text style={styles.totalValue}>${getTotalPrice().toFixed(2)}</Text> */}
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              disabled={totalAmount === 0}
              onPress={openPaymentSheet}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </SafeAreaView>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    fontSize: 18,
    color: colors.gray,
    marginTop: 10,
  },
  cartList: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  cartItemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  cartItemType: {
    fontSize: 14,
    color: '#777',
    marginBottom: 5,
  },
  cartPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartItemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    marginHorizontal: 10,
    fontSize: 16,
  },
  cartItemSubtotal: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
  removeButton: {
    marginTop: 10,
  },
  removeButtonText: {
    fontSize: 14,
    color: '#ff4d4d',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
