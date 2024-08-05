import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const CustomLoader = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={visible}
      onRequestClose={() => { console.log('close modal') }}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
            color="blue"
           
            animating={visible}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgb(207, 201, 201)', // Blue background with some transparency
    backgroundColor:'rgb(227, 219, 219)',
    opacity: 0.5,

  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomLoader;