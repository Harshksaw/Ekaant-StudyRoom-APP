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
  ScrollView,
  Dimensions,
  TouchableHighlight,
  Button,
} from "react-native";

import { useRoute } from "@react-navigation/native";

import { router } from "expo-router";

import { useAssets } from "expo-asset";
import { Card1, Credit1, Credit2, Credit3 } from "@/assets";
import { Ionicons } from "@expo/vector-icons";

import { BACKEND } from "@/utils/config";
import axios from "axios";
import { Toast } from "react-native-toast-notifications";
import RazorpayCheckout from "react-native-razorpay";

const PaymentScreen: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardWidth = Dimensions.get("window").width; // Assuming full width for simplicity, adjust as needed
  const [bookingId, setBookingId] = useState(null);
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / cardWidth);
    setActiveIndex(index);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [available, setAvailable] = useState(false);

  const [assets] = useAssets([require("../../assets/images/Credit.png")]);

  const route = useRoute();
  const PaymentData = route.params.item ? JSON.parse(route.params.item) : {};

  const bookingid = route.params.id ? JSON.parse(route.params.id) : {};
  console.log("Booking ID", bookingid);
  let PaymentPrice = route?.params.price
    ? JSON.parse(route.params.price)
    : null;

  useEffect(() => {
    const getBookingDetails = async () => {
      if (bookingid !== null) {
        try {
          const res = await axios.post(
            `${BACKEND}/api/v1/booking/getBookingById`,
            {
              id: bookingid,
            }
          );
          console.log(res.data.bookings[0]._id, "[[[[[[[]]]]]]");

          setBookingId(res.data.bookings[0]._id);
          return res.data.bookings[0]._id;
        } catch (error) {
          console.log(error);
          Toast.show("Error in fetching booking details");
        }
      } else {
        console.log("Booking ID is missing");
        setModalVisible(true);
      }
    };
    getBookingDetails();
  }, []);

  console.log("_________>>>>", PaymentData, "<<<<<_________");

  const InvoiceScreen = async () => {
    await handlePayment();

    // router.push({
    //   pathname:'library/invoice.screen',
    //   params: {item: JSON.stringify(PaymentData), price: JSON.stringify(PaymentPrice)}
    // })
  };

  const handlePayment = async () => {
    var options = {
      description: "Room Booking",
      image: "https://i.imgur.com/3g7nmJC.jpg", //logo

      currency: "INR",
      key: "rzp_test_lmy83ka5bsXLz8",
      amount: "5000",
      name: "Acme Corp",
      order_id: "",
      prefill: {
        email: "gaurav.kumar@example.com",
        contact: "9191919191",
        name: "Gaurav Kumar",
      },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error) => {
        // handle failure

        console.log(
          "Error in payment",
          error.code,
          error.description,
          error.source,
          error.metadata
        );
        alert(
          `Error: ${error.code} | ${error.description} | ${error.source} | ${error.metadata}`
        );
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      {/* Header */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              You cannot proceed further. Please refill your details.
            </Text>
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
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Header color="black" />
      </View>

      <View style={{}}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            margin: 1,
            gap: 20,
            marginHorizontal: 0,
          }}
        >
          <Text
            style={{
              fontStyle: "normal",
              fontSize: 24,
              fontWeight: "500",
              lineHeight: 48,
              marginHorizontal: 20,
            }}
          >
            Payment Screen
          </Text>
          <View
            style={{
              flexDirection: "row",
              // justifyContent: "flex-end",
              // marginHorizontal: 20,
              // marginTop: 20,
            }}
          >
            {bookingId !== null ? (
              <Text
                style={{
                  fontSize: 16,
                  lineHeight: 20,
                  fontWeight: "400",
                  marginHorizontal: 20,
                }}
              >
                Booking ID : {bookingId}
              </Text>
            ) : null}
          </View>

          <Text
            style={{
              fontStyle: "normal",
              fontSize: 20,
              fontWeight: "600",
              lineHeight: 30,
              marginHorizontal: 20,
            }}
          >
            Select Payment method
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              // alignItems:'center',
              marginHorizontal: 20,
              gap: 10,
            }}
          >
            <View
              style={{
                backgroundColor: "white",
                width: 90,
                height: 70,
                borderRadius: 10,
                flexDirection: "row",
                // justifyContent: "center",
                // alignItems: "center",
                paddingLeft: 30,
                paddingTop: 20,
              }}
            >
              <Credit1 />
            </View>

            <Credit2 />
            <Credit3 />
          </View>

          <View
            style={{
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                lineHeight: 30,
                fontWeight: "600",
                marginHorizontal: 20,
              }}
            >
              Select your card
            </Text>

            <View
              style={{
                maxHeight: 220,
                marginLeft: 20,
                marginRight: 5,
              }}
            >
              <ScrollView
                horizontal={true}
                onScroll={handleScroll}
                scrollEventThrottle={16} // Adjust based on your needs for performance
                showsHorizontalScrollIndicator={false} // Optionally hide the default scroll bar
              >
                <Card1 />
                <Card1 />
                <Card1 />
              </ScrollView>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                {[...Array(3)].map((_, index) => (
                  <View
                    key={index}
                    style={{
                      height: 10,
                      width: activeIndex === index ? 30 : 20,
                      borderRadius: 5,
                      backgroundColor:
                        activeIndex === index ? "#0077B6" : "gray",
                      marginHorizontal: 5,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>

          {bookingId && (
            <TouchableOpacity onPress={() => InvoiceScreen()}>
              <View
                style={{
                  flexDirection: "row",
                  position: "relative",
                  width: "95%",
                  justifyContent: "space-between",
                  marginHorizontal: 10,
                  alignItems: "center",
                  padding: 15,
                  backgroundColor: "#0077B6",
                  borderRadius: 10,
                  marginTop: 20,
                  bottom: 0,
                }}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontSize: 16,
                    fontWeight: "700",
                    letterSpacing: 2,
                  }}
                >
                  Total Amount : ₹{PaymentPrice}
                </Text>

                <Ionicons name="arrow-forward" size={25} color="white" />
              </View>
            </TouchableOpacity>
          )}
       

      
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Transparent background
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
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
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default PaymentScreen;
