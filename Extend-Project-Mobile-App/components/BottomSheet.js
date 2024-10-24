import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    View
} from 'react-native';

const BottomSheet = ({visible, onClose, children}) => {
  const [animation] = useState(new Animated.Value(0));

  const openAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [
      Dimensions.get('window').height,
      Dimensions.get('window').height / 3,
    ], // Increased height
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onShow={openAnimation}
      onRequestClose={closeAnimation}>
      <TouchableWithoutFeedback onPress={closeAnimation}>
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.bottomSheet, {transform: [{translateY}]}]}>
            {children}
            {/* <Button title="Hello" onPress={() => Alert.alert('Hello')} /> */}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    // height: Dimensions.get('window').height * 1, // Increased height
    height: 900, // Increased height
  },
});

export default BottomSheet;

// import React, { useState } from 'react';
// import { Modal, View, StyleSheet, Animated, Dimensions } from 'react-native';

// const BottomSheet = ({ visible, onClose, children }) => {
//   const [animation] = useState(new Animated.Value(0));

//   const openAnimation = () => {
//     Animated.timing(animation, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeAnimation = () => {
//     Animated.timing(animation, {
//       toValue: 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start(() => onClose());
//   };

//   const translateY = animation.interpolate({
//     inputRange: [0, 1],
//     outputRange: [Dimensions.get('window').height, 0],
//   });

//   return (
//     <Modal
//       visible={visible}
//       transparent
//       animationType="none"
//       onShow={openAnimation}
//       onRequestClose={closeAnimation}
//     >
//       <View style={styles.overlay}>
//         <Animated.View
//           style={[styles.bottomSheet, { transform: [{ translateY }] }]}
//         >
//           {children}
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   bottomSheet: {
//     backgroundColor: 'white',
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//     padding: 16,
//   },
// });

// export default BottomSheet;
