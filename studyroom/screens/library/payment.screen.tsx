
import Header from "@/components/Header";
import React, { useEffect, useState } from "react";
import {
  View,
  Text, 
  SafeAreaView,

  StyleSheet,
  Touchable,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { set } from "react-native-reanimated";
import { router } from "expo-router";
const PaymentScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [available, setAvailable] = useState(false);
  
  const route = useRoute();
  let PaymentData;
  
  useEffect(() => {
    let PaymentData;
    try {
      // Attempt to parse the item parameter if it exists
      PaymentData = route.params?.item ? JSON.parse(route.params.item) : null;
  
      console.log("PaymentData in line 31 ", PaymentData);
      if (
        PaymentData &&
        typeof PaymentData.date === 'string' &&
        typeof PaymentData.months === 'number' &&
        Array.isArray(PaymentData.seat) &&
        PaymentData.seat.every(seat => typeof seat.id === 'string' && typeof seat.label === 'string') &&
        PaymentData.seat.length > 0 &&
        typeof PaymentData.slot === 'object' &&
        PaymentData.slot !== null &&
        typeof PaymentData.slot._id === 'string' &&
        typeof PaymentData.slot.from === 'string' &&
        typeof PaymentData.slot.to === 'string'
      ) {
        console.log("PaymentData", PaymentData);
        // If all conditions are met, you might not want to change the state here
        // setAvailable(true);
        // setModalVisible(false);
      } else {
        console.log("PaymentData is missing required fields or has incorrect types", PaymentData);
        setModalVisible(true); // Show modal when PaymentData is missing required fields or has incorrect types
      }
    } catch (error) {
      console.error("Failed to parse PaymentData:", error);
      setModalVisible(true); // Show modal on parsing error
      // Handle the error or set a default value for PaymentData
    }
  }, [route.params.item]);


  console.log("_________",PaymentData, "_________");



  return (
    <SafeAreaView>
      {/* Header */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>You cannot proceed further. Please refill your details.</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => router.back()}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
      style={{
        marginTop:20,
        marginBottom: 10,
      }}
      >

      <Header color="black" />
      </View>

      <View>
      <View>

      
      <Text>Payment Screen</Text>
      </View>

      

      </View>
     



 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

});
export default PaymentScreen;
