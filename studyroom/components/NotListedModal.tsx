import React, { useState } from "react";
import { Modal, View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
interface NotListedModalProps {
    isVisible: boolean; // Example property
    onClose: () => void; // Example property
  }
  
const NotListedModal: React.FC<NotListedModalProps> = ({
    isVisible, onClose
}) => {
  return (
    <>
      <Modal animationType="slide" transparent visible={isVisible}>
        <LinearGradient
          colors={["transparent", "rgb(71, 178, 225)"]}
          style={styles.modalContainer}
        >
          <View style={styles.imagePlaceholder}>
            {/* <Image source={require('./placeholder.png')} // Replace with your placeholder image
                                     style={styles.image} /> */}
          </View>
          <Text style={styles.text}>Not Listed, Will Be Soon Available!</Text>
          <TouchableOpacity onPress={onClose}>
            <Text
              style={{
                color: "red",
                fontSize: 18,
                fontWeight: "bold",
                marginBottom: 15,
              }}
            >
              Close
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: "#DDD", // Adjust background color for better visibility
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
export default NotListedModal;
