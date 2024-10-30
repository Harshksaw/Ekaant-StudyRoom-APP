import { AC, Cash, CheckoutScreenLoc, Note, SeatsCheckout } from "@/assets";

import { getDateAfterMonths } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";


import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { BACKEND } from "@/utils/config";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import RazorpayCheckout from "react-native-razorpay";
import { set, sub } from "react-native-reanimated";
import getLocationName from "@/utils/location";

const CheckoutScreen: React.FC = () => {
  const route = useRoute();

  const userDetails = useSelector((state: any) => state.user);
  const [bookingId, setBookingId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [libraryData, setLibraryData] = useState(null);
  const [location, setLocation] = useState(null);

  // console.log(userDetails, "-----------------")
  //getting data  from booking screen
  const [libraryId, setLibraryId] = useState(null);
  const params = useRoute();

  const BookedData = JSON.parse(params.params.item);

  if (!BookedData) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  console.log(BookedData, "Booked Data");

  console.log(libraryId, "Library Id");

  const bookingid = BookedData._id;

  // const BookingDate = BookedData?.bookingDate
  const BookingMonths = BookedData?.bookingPeriod;
  const BookingSeat = BookedData?.bookedSeat;
  const BookingSlot = BookedData?.timeSlot;
  const RoomNo = BookedData?.roomNo;
  const BookedDate = BookedData?.bookingDate.slice(0, 10);
  const [modalVisible, setModalVisible] = useState(false);
  const [initialPrice, setInitialPrice] = useState(0);
  const [RegistrationFees, setRegistrationFees] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState(false);
  const [paymentData, setPaymentData] = useState(null); // Payment data
  const [paymentId, setPaymentId] = useState(null); // Payment data
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isinvoiceComplete, setinvoiceComplete] = useState(false);

  useEffect(() => {

    setBookingId(bookingid);
    const getLibraryData = async () => {
      const loc = await getLocationName(
        BookedData?.libraryId?.location[0],
        BookedData?.libraryId?.location[1]
      );
      setLocation(loc);
      try {
        const userDataId = await AsyncStorage.getItem("userData");
        const userid = JSON.parse(userDataId);
        console.log("🚀 ~ getLibraryData ~ userid:", userid)
        setUserData(userid);

        const res = await axios.post(
          `${BACKEND}/api/v1/library/getLibraryById`,
          {
            id: BookedData?.libraryId?._id,
          }
        );
        setLibraryData(res.data);

        return res.data.library;
      } catch (error) {
        console.log(error);

        Toast.show("Error in fetching library details, Try again", {
          dangerColor: "red",
          duration: 2000,
          icon: <Ionicons name="alert-circle" size={24} color="red" />,
        });

        // router.back();
      }
    };
    getLibraryData();
  }, []);


  const endDate = getDateAfterMonths(BookedDate, BookingMonths);


  // const location = getLocationName(BookedData?.libraryId?.location[0], BookedData?.libraryId?.location[1]);

  useEffect(() => {
    const getFinalPrice = async () => {
      const price = BookedData?.price;
      console.log(price, "Price++++");
      setInitialPrice(price);

      //registion fee from libary only
      const RegistrationFees =
        (await AsyncStorage.getItem("RegistrationFee")) || 1000;
      setRegistrationFees(RegistrationFees);
      const finalAmount = price + parseInt(RegistrationFees);
      setFinalAmount(finalAmount);
    };
    getFinalPrice();
  }, []);
  const PaymentPrice = finalAmount;

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
  }, [isPaymentComplete]);

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
        email: `${userData.user.email}`,
        contact: `${userData.user.phoneNumber}`,
        name: `${userData.user.username}`,
      },
    };
    RazorpayCheckout.open(options)
      .then((data) => {
        // handle success
        setPaymentStatus(true);
        setPaymentData(data);
        setPaymentId(data.razorpay_payment_id);
        // console.log(data, "Payment Success");

        setIsPaymentComplete(true);
        Toast.show("Payment Success", {
          successColor: "green",
          duration: 4000,
          icon: <Ionicons name="checkmark-circle" size={24} color="green" />,
        });
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

  // console.log(userData, "User Data", BookedData?.libraryId);

  const confirmPayment = async () => {
    if (!bookingId) {
      Toast.show("Booking ID is missing");
    }
    try {
      console.log("Payment Data is 186");
      const res = await axios.post(
        `${BACKEND}/api/v1/booking//confirm/${bookingId}`,
        {
          bookingId: bookingId,
          paymentId: paymentId,
          paymentData: paymentData,
          paymentStatus: paymentStatus,
        }
      );
      console.log(res.data, "Payment Confirmed 196");
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const PaymentScreen = async () => {
    await handlePayment();
    // console.log("Payment Screen");

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
  function formatSeatLabel(seatLabel) {
    const [row, column] = seatLabel.split('-');
    return `Row ${row}, Column ${column}`;
  }
  function formatTimeSlots(timeSlots) {
    return timeSlots.map(slot => {
      const { from, to } = slot;

      const formatTime = (time) => {
        const [hour, minute] = time.split(':');

        return `${hour % 12 || 12} ${minute.slice(2,)} `;
      };

      return `${formatTime(from)} - ${formatTime(to)}`;
    }).join(', ');
  }
  console.log("BOoked Data",BookedData)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        // alignItems: "center",

        marginTop: 20,
        paddingTop: 50,
      }}
    >
      <View>
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
              source={{ uri: BookedData?.libraryId?.images[0] }}
              style={{
                width: 140,
                height: 200,
                borderRadius: 10,
              }}
            />
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
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Text>Booking for friend</Text>
                  <Text>{userDetails?.friendDetails?.name}</Text>
                </View>
              ) : (
                <Text>Booking for SELF</Text>
              )}
            </View>

            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {BookedData?.libraryId?.name || "Library Name"}
            </Text>

            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <Ionicons name="time-outline" size={24} color="black" />
              <Text>Period - {BookedData.bookingPeriod} Month{BookedData.bookingPeriod > 1 ? 's' : ''}</Text>
            </View>


            <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
              <Text>A/C Rooms - {BookedData?.libraryId[0]?.Ac ? "Yes" : "No"}</Text>
            </View>
          </View>
        </View>

        {/* Image and Side Details */}
        <View style={{ flexDirection: "row", marginHorizontal: 20, marginTop: 20, alignItems: "center", gap: 40 }}>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center", width: 150 }}>
            <Ionicons name="calendar-outline" size={50} color="black" />
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>{BookedDate} -</Text>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>{endDate.toISOString().split("T")[0]}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            < SeatsCheckout />
            <Text style={{
              fontSize: 15,
              fontWeight: "500",
              color: "black",
              textTransform: "uppercase",
              flexDirection: "column",
              flexWrap: "wrap"


            }}>{formatSeatLabel(BookedData?.bookedSeat?.seatLabel)} </Text>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: "black", marginHorizontal: 20, marginVertical: 10 }} />

        {/* Payment Summary */}
        <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: "column", gap: 15 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 20, fontWeight: "400" }}>Registration Fee</Text>
            <Text style={{ fontSize: 20, fontWeight: "400" }}>- ₹{RegistrationFees}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>Sub Total</Text>
            <Text style={{ fontSize: 20, fontWeight: "500" }}>- ₹{initialPrice}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            {BookedData?.libraryId?.[0]?.timeSlot?.map((slot, index) => (
              <View key={index} style={{ flexDirection: "row", gap: 5 }}>
                <Text>{slot.from || ''} - {slot.to || ''}</Text>
              </View>
            ))}
          </View>

          {/* Display Location */}
          <View style={{ flexDirection: "row", gap: 10 }}>
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
                  {location?.split(" ").slice(0, 2).join(" ")}{" "}
                </Text>
              </View>
              <View
                style={{ flexDirection: "row", justifyContent: "space-between" }}
              >
                <Text style={{ fontSize: 15, fontWeight: "300" }}>
                  {location?.split(" ").slice(3, 5).join(" ")}{" "}
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={styles.summary}>
            <Note />
            <View style={{ flexDirection: 'column', gap: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: '400', maxWidth: '80%' }}>
                Slot Time - {formatTimeSlots(BookedData?.timeSlot)}
              </Text>
            </View>
          </View> */}

        </View>
      </View>



      {/* Summary */}

      <TouchableOpacity onPress={PaymentScreen}>
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 25,
            width: "90%",
            justifyContent: "space-between",
            marginHorizontal: 20,
            alignItems: "center",
            padding: 20,
            backgroundColor: "#0077B6",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "#FFFFF5", fontSize: 18, fontWeight: "700", letterSpacing: 2 }}>
            Total Amount: ₹{finalAmount}
          </Text>
          <Ionicons name="arrow-forward" size={25} color="white" />
        </View>
      </TouchableOpacity>
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
