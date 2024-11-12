import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useSelector } from "react-redux";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RazorpayCheckout from "react-native-razorpay";
import { Toast } from "react-native-toast-notifications";

import { BACKEND } from "@/utils/config";
import getLocationName from "@/utils/location";
import { getDateAfterMonths } from "@/utils/date";
import { AC, Cash, CheckoutScreenLoc, Note, SeatsCheckout } from "@/assets";
import { router } from "expo-router";

const CheckoutScreen: React.FC = () => {
  const route = useRoute();
  const userDetails = useSelector((state: any) => state.user);

  const [bookingId, setBookingId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [libraryData, setLibraryData] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [initialPrice, setInitialPrice] = useState(0);
  const [registrationFees, setRegistrationFees] = useState(1000);
  const [finalAmount, setFinalAmount] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isInvoiceComplete, setIsInvoiceComplete] = useState(false);

  // Booking data from route
  const params = route.params;
  const BookedData = JSON.parse(params?.item || "{}");
  const bookingid = BookedData?._id;

  useEffect(() => {
    if (BookedData) {
      setBookingId(bookingid);
      fetchLibraryData();
    }
  }, [BookedData]);

  const fetchLibraryData = async () => {
    try {
      const loc = await getLocationName(
        BookedData?.libraryId?.location[0],
        BookedData?.libraryId?.location[1]
      );
      setLocation(loc);

      const userDataId = await AsyncStorage.getItem("userData");
      const userid = JSON.parse(userDataId);
      setUserData(userid);

      const res = await axios.post(`${BACKEND}/api/v1/library/getLibraryById`, {
        id: BookedData?.libraryId?._id,
      });
      setLibraryData(res.data);

      setFinalAmount(initialPrice + registrationFees);
    } catch (error) {
      console.error(error);
      Toast.show("Error fetching library details. Try again.", {
        dangerColor: "red",
        duration: 2000,
      });
    }
  };

  const endDate = getDateAfterMonths(BookedData?.bookingDate, BookedData?.bookingPeriod);

  const handlePayment = async () => {
    setLoading(true);
    const options = {
      description: "Room Booking",
      image: "https://res.cloudinary.com/dgheyg3iv/image/upload/v1720931194/dmym7wh5u0vvhp2i1tki.png",
      currency: "INR",
      key: "rzp_test_hi1B6uwenBy9Ir",
      amount: `${finalAmount * 100}`,
      name: "Ekaant",
      prefill: {
        email: userData?.data?.user_id?.email,
        contact: userData?.data?.user_id?.phoneNumber,
        name: userData?.data?.user_id?.username,
      },
    };

    try {
      const data = await RazorpayCheckout.open(options);
      setPaymentStatus(true);
      setPaymentData(data);
      setPaymentId(data.razorpay_payment_id);
      setIsPaymentComplete(true);

      Toast.show("Payment Success", {
        successColor: "green",
        duration: 4000,
      });

      router.push('/(tabs)/bookings')
    } catch (error) {
      Toast.show("Payment Failed", {
        dangerColor: "red",
        duration: 4000,
      });
      setPaymentStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const confirmPayment = async () => {
    if (!bookingId) {
      Toast.show("Booking ID is missing");
      return;
    }
    try {
      await axios.post(`${BACKEND}/api/v1/booking/confirm/${bookingId}`, {
        bookingId,
        paymentId,
        paymentData,
        paymentStatus,
      });
      setIsInvoiceComplete(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isPaymentComplete) {
      confirmPayment();
    }
  }, [isPaymentComplete]);

  if (!BookedData || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Library and Booking Details */}
      <View>
        <View style={styles.libraryInfoContainer}>
          <Image source={{ uri: BookedData?.libraryId?.images[0] }} style={styles.libraryImage} />
          <View style={styles.libraryDetails}>
            <Text>{userDetails.bookingsForFriend ? "Booking for Friend" : "Booking for Self"}</Text>
            <Text style={styles.libraryName}>{BookedData?.libraryId?.name || "Library Name"}</Text>
            <Text>Period - {BookedData.bookingPeriod} Month(s)</Text>
            <Text>A/C Rooms - {BookedData?.libraryId[0]?.Ac ? "Yes" : "No"}</Text>
          </View>
        </View>

        <View style={styles.dateContainer}>
          <Ionicons name="calendar-outline" size={50} color="black" />
          <Text>{BookedData?.bookingDate.slice(0, 10)} - {endDate.toISOString().split("T")[0]}</Text>
          <SeatsCheckout />
          <Text>{BookedData?.bookedSeat?.seatLabel}</Text>
        </View>

        <View style={styles.paymentSummaryContainer}>
          <Text>Registration Fee - ₹{registrationFees}</Text>
          <Text>Sub Total - ₹{initialPrice}</Text>
          <Text>Total Amount: ₹{finalAmount}</Text>
        </View>

        <View style={styles.locationContainer}>
          <CheckoutScreenLoc />
          <Text>{location}</Text>
        </View>

        <TouchableOpacity onPress={handlePayment} style={styles.paymentButton}>
          <Text style={styles.paymentButtonText}>Pay ₹{finalAmount}</Text>
          <Ionicons name="arrow-forward" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  libraryInfoContainer: {
    flexDirection: "row",
    marginHorizontal: 20,
  },
  libraryImage: { width: 140, height: 200, borderRadius: 10 },
  libraryDetails: { marginLeft: 10 },
  libraryName: { fontSize: 20, fontWeight: "bold" },
  dateContainer: { flexDirection: "row", marginHorizontal: 20 },
  paymentSummaryContainer: { marginHorizontal: 20 },
  locationContainer: { flexDirection: "row", marginHorizontal: 20 },
  paymentButton: {
    flexDirection: "row",
    backgroundColor: "#0077B6",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  paymentButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
});

export default CheckoutScreen;
