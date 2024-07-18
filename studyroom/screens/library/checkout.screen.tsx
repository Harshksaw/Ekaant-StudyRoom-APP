import { AC, Cash, CheckoutScreenLoc, Note, SeatsCheckout } from "@/assets";
import Header from "@/components/Header";
import Seats from "@/components/Seats";
import { getDateAfterMonths } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { BACKEND } from "@/utils/config";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import RazorpayCheckout from "react-native-razorpay";

const CheckoutScreen: React.FC = () => {
  const route = useRoute();

  const userDetails = useSelector((state: any) => state.user);
  const [bookingId, setBookingId] = useState(null);
  const [userData, setUserData] = useState(null);
  // console.log(userDetails, "-----------------")
  //getting data  from booking screen

  const params = useRoute();
  let BookedData;
if (params?.params?.item) {
  BookedData = JSON.parse(params.params.item);
} else if (params?.params?.bookitem) {
  BookedData = JSON.parse(params.params.bookitem);
}

console.log(BookedData, "_________-----")



  // const BookedData = JSON.parse(params?.params?.item);
  // const BookAgain = JSON.parse(params.params?.bookitem);
  // console.log(BookedData, "_________-----")
  // const BookingDate = BookedData?.date || BookedData?.bookingDate.slice(0, 10);
  // console.log(BookingDate, "Booking Date");
  // return(
  // <View>
  //   <Text>
  //   ddd
  //   </Text>
  // </View>
  // )
  // console.log(BookedData, "_________")
  
  // console.log("Booked Data:", data );
  const BookingDate = BookedData?.date || BookedData.bookingDate.slice(0, 10);
  const BookingMonths = BookedData?.months || BookedData?.bookingPeriod;
  const BookingSeat = BookedData?.seat || BookedData?.bookedSeat;
  const BookingSlot = BookedData?.slot || BookedData?.timeSlot;
  const RoomNo = BookedData?.room || BookedData?.roomNo;

console.log(  
  BookingDate,"---", BookingMonths,
  
  BookingSeat, 
  "----",
  BookingSlot, 
  "----",
  RoomNo, "Booking Date"
)

  return (
    <>
  
    </>)

  const data = useSelector((state: any) => state.booking);
  const [modalVisible, setModalVisible] = useState(false);
  // console.log("ddd------->>>>>>>>>>>>>>>>>>>", data);
  const location = data?.details?.location;
  // console.log(data.details.images[0]);
  const price = data.details.price || 6000;
  const RegistrationFees = 1000;
  // Assuming price and RegistrationFees are numbers and already calculated correctly
  const subtotal = Number((price + RegistrationFees).toFixed(2));

  const endDate = getDateAfterMonths(BookedData?.date, BookedData?.months);
  const totalAmount = subtotal;


  //payment
  const [paymentStatus, setPaymentStatus] = useState(false); // Payment status
  const [paymentData, setPaymentData] = useState(null); // Payment data
  const [paymentId, setPaymentId] = useState(null); // Payment data
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isinvoiceComplete, setinvoiceComplete] = useState(false);

  // const PaymentData = route.params.item ? JSON.parse(route.params.item) : {};

  const bookingid = route.params?.id ? JSON.parse(route.params.id) : {};
  console.log("Booking ID-->", bookingid, "Booking ID", BookedData);
  let PaymentPrice = totalAmount;

  useEffect(() => {
    const getBookingDetails = async () => {
      const userData = await AsyncStorage.getItem("userData");
      const userid = JSON.parse(userData);
      setUserData(userid);

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
        Toast.show("Booking ID is missing");
        setModalVisible(true);
        return;
      }
    };
    getBookingDetails();
  }, []);

  const handlePayment = async () => {
    var options = {
      description: "Room Booking",
      image:
        "https://res.cloudinary.com/dgheyg3iv/image/upload/v1720931194/dmym7wh5u0vvhp2i1tki.png", //logo

      currency: "INR",
      key: "rzp_test_lmy83ka5bsXLz8",
      amount: `${PaymentPrice * 100}`,
      name: "Ekaant",
      order_id: "",
      prefill: {
        email: `${userData?.user.email}`,
        contact: `${userData?.user.phoneNumber}`,
        name: `${userData?.user.username}`,
      },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        setPaymentStatus(true);
        setPaymentData(data);
        setPaymentId(data.razorpay_payment_id);
        console.log(data, "Payment Success");

        // alert(`Success: ${data.razorpay_payment_id}`);
        setIsPaymentComplete(true);
      })
      .catch((error) => {
        // handle failure
        setPaymentStatus(false);

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

  const confirmPayment = async () => {
    if (!bookingId) {
      Toast.show("Booking ID is missing");
    }
    try {
      const res = await axios.post(
        `${BACKEND}/api/v1/booking//confirm/${bookingId}`,
        {
          bookingId: bookingId,
          paymentId: paymentId,
          paymentData: paymentData,
          paymentStatus: paymentStatus,
        }
      );
      console.log(res.data, "Payment Confirmed");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const PaymentScreen = async () => {
    await handlePayment();

    if (isPaymentComplete) {
      console.log("Payment Status", paymentStatus);
      console.log("Payment Data", paymentData);
      console.log("PaymentId", paymentId);
      console.log("Payment is complete");

      const res = await confirmPayment();
      console.log("Payment Confirmation", res);
      if (res) {
        setinvoiceComplete(true);
        console.log("Payment Confirmed");
      } else {
        console.log("Payment Failed");
      }
    }
  };

  useEffect(() => {
    // InvoiceScreen();
    if (isinvoiceComplete) {
      router.push({
        pathname: "/library/invoice.screen",
        params: {
          price: JSON.stringify(PaymentPrice),
          paymentData: JSON.stringify(paymentData),
          paymentId: JSON.stringify(paymentId),
          bookingId: JSON.stringify(bookingId),
        },
      });
    }
  }, [isPaymentComplete]); // This effect runs whenever `isPaymentComplete` changes

  return (
    <SafeAreaView>
      {/* Header */}
      <View
        style={{
          marginTop: 20,
          marginBottom: 10,
        }}
      >
        <Header color="black" />
      </View>

      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          justifyContent: "flex-start",
          gap: 20,
          alignItems: "center",
        }}
      >
        <View style={{}}>
          <Image
            source={{ uri: data.details.images[0] }}
            style={{
              width: 140,
              height: 200,
              borderRadius: 10,
            }}
          />
          {/* <Image source={{uri : data.details.images[0]}} /> */}
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-start",
            // height: 100,
            gap: 10,
          }}
        >
          <View
            style={{
              width: 150,
              height: 50,
              borderRadius: 20,
              backgroundColor: "rgb(148, 230, 200)", // Example background color
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            {userDetails.bookingsForFriend ? (
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Text>Booking for friend</Text>
                <Text>{userDetails?.friendDetails?.name}</Text>
              </View>
            ) : (
              <Text>Booking for SELF</Text>
            )}
          </View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            {data?.details?.name}
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Ionicons name="time-outline" size={24} color="black" />
            <Text>
              Period - {BookedData.months}
              {BookedData.months > 1 ? "Months" : "Month"}{" "}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <AC />

            <Text>A/C Rooms - Yes</Text>
          </View>
        </View>
      </View>

      {/* Image and Side Details */}
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 20,
          marginTop: 20,
          // justifyContent: "space-between",
          alignItems: "center",
          height: 100,
          gap: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            width: 150,
          }}
        >
          <Ionicons name="calendar-outline" size={50} color="black" />
          <View
            style={{
              flexDirection: "column",
              // alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                flexDirection: "column",
                alignItems: "center",
                fontSize: 15,
                fontWeight: "semi-bold",
              }}
            >
              {" "}
              {BookedData.date} -
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "semi-bold",
              }}
            >
              {" "}
              {endDate.toISOString().split("T")[0]}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <SeatsCheckout />

          <Text>{data.details.seats} Seats</Text>
        </View>
      </View>

      <View
        style={{
          height: 1, // Thin line
          backgroundColor: "black", // Line color
          marginHorizontal: 20, // Match the margin you have set in the parent View
        }}
      ></View>

      {/* Summary */}
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          flexDirection: "column",
          gap: 15,
        }}
      >
        <View style={styles.summary}>
          <Cash />
          <View
            style={{
              flexDirection: "column",
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                Registration Fee{" "}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                - ₹{RegistrationFees}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                Sub Total{" "}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                - ₹{subtotal}
              </Text>
            </View>
          </View>
        </View>

        {/* //location */}
        <View style={styles.summary}>
          <CheckoutScreenLoc />

          <View
            style={{
              flexDirection: "column",
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "500" }}>
                {location.split(" ").slice(0, 2).join(" ")}{" "}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 15, fontWeight: "300" }}>
                {location.split(" ").slice(3, 5).join(" ")}{" "}
              </Text>
            </View>
          </View>
        </View>

        {/* //slot */}
        <View style={styles.summary}>
          <Note />
          <View
            style={{
              flexDirection: "column",
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                Slot Time - {data.details.slot} - 2:00
              </Text>
            </View>
          </View>
        </View>

        {/* //payment */}
        <TouchableOpacity onPress={() => PaymentScreen()}>
          <View
            style={{
              flexDirection: "row",
              position: "relative",
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
              Total Amount : ₹{totalAmount}
            </Text>

            <Ionicons name="arrow-forward" size={25} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  summary: {
    flexDirection: "row",
    gap: 15,
    marginTop: 10,

    alignItems: "center",
    fontSize: 15,
  },
});
export default CheckoutScreen;
