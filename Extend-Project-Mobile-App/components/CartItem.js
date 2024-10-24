import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';

const CartItem = ({item, onRemove, onDecrease, onIncrease}) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemAmount}>${item.amount.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={() => onDecrease(item)} />
        <Text style={styles.quantity}>{item.quantity}</Text>
        <Button title="+" onPress={() => onIncrease(item)} />
      </View>
      <Button
        title="Remove"
        onPress={() => onRemove(item.id)}
        color="#ff4444"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 18,
  },
  itemAmount: {
    fontSize: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 18,
  },
});

export default CartItem;
