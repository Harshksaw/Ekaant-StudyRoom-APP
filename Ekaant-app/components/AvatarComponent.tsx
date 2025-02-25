import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Avatar = ({ name }) => {
  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <View style={styles.avatarContainer}>
      <Text style={styles.avatarText}>{firstLetter}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Avatar;