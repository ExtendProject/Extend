/* eslint-disable react-hooks/exhaustive-deps */
import { useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, View } from 'react-native';
import { useCart } from './CartContext';
import CartItem from './CartItem'; // Assuming CartItem is in the same directory

const CartPage = () => {
  const {cartItems, setCartItems} = useCart();

  const onRemove = productId => {
    setCartItems(currentItems =>
      currentItems.filter(item => item.id !== productId),
    );
  };

  const onIncrease = product => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === product.id ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const onDecrease = product => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item.id === product.id
          ? {...item, quantity: Math.max(item.quantity - 1, 1)}
          : item,
      ),
    );
  };

  const totalAmount = cartItems.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.amount * currentItem.quantity;
  }, 0); // Starting value of the accumulator is 0

  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(
      `http://172.20.10.2:5000/create-payment-intent`,
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
      }
    });
  };

  //   useEffect(() => {
  //     if (totalAmount > 0) {
  //       initializePaymentSheet();
  //       return;
  //     }
  //     setLoading(false);
  //   }, [totalAmount,cartItems]);

  return (
    <View style={styles.container}>
      {/* <Text>{totalAmount}</Text> */}
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <CartItem
            item={item}
            onRemove={onRemove}
            onDecrease={onDecrease}
            onIncrease={onIncrease}
          />
        )}
      />
      {/* <CheckoutButton /> */}

      {/* <Screen> */}
      <Button
        variant="primary"
        // disabled={!loading}
        title={`Checkout ($${totalAmount.toFixed(2)})`}
        disabled={totalAmount === 0}
        onPress={openPaymentSheet}
      />
      {/* </Screen> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default CartPage;
