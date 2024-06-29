// import React, { useState } from 'react';
// import { Modal, View, Text, Image, StyleSheet, Button } from 'react-native';
// import LinearGradient from 'expo-linear-gradient';
// interface NotListedModalProps {
//     isVisible: boolean;
//     toggleModal: () => void;
// }

// const NotListedModal: React.FC<NotListedModalProps> = ({ isVisible, toggleModal }) => {
//     return (
//         <>
//             <Modal animationType="slide" transparent visible={isVisible}>
//                 <LinearGradient
//                     colors={['#F0F0F0', '#EEEEEE']}
//                     style={styles.modalContainer}
//                 >
//                     <View style={styles.imagePlaceholder}>
//                         {/* <Image source={require('./placeholder.png')} // Replace with your placeholder image
//                                      style={styles.image} /> */}
//                     </View>
//                     <Text style={styles.text}>Not Listed, Will Be Soon!</Text>
//                     <Button title="Close" onPress={toggleModal} />
//                 </LinearGradient>
//             </Modal>
//         </>
//     );
// };

// const styles = StyleSheet.create({
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   imagePlaceholder: {
//     width: 100,
//     height: 100,
//     borderRadius: 50,
//     marginBottom: 20,
//     backgroundColor: '#DDD', // Adjust background color for better visibility
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   image: {
//     width: '100%',
//     height: '100%',
//   },
//   text: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 15,
//   },
// });

// export default NotListedModal;
