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
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useSelector } from "react-redux";

import axios from "axios";
import { BACKEND } from "@/utils/config";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";
import RazorpayCheckout from "react-native-razorpay";

import getLocationName from "@/utils/location";
import { vw, w } from "@/constants/size";
import ff from "@/constants/fonts";

const CheckoutScreen: React.FC = () => {
  const userDetails = useSelector((state: any) => state.user);
  const [bookingId, setBookingId] = useState(null);
  const [userData, setUserData] = useState<any>(null);
  const [libraryData, setLibraryData] = useState(null);
  const [location, setLocation] = useState<String | null>(null);
  console.log("🚀 ~ location:", location)

  //getting data  from booking screen
  const [libraryId, setLibraryId] = useState(null);
  const params = useRoute();

  const BookedData = JSON.parse(params.params.item);
  // console.log("🚀 ~ BookedData:", BookedData)

  if (!BookedData) {
    return (
      <View>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const bookingid = BookedData.bookingId;

  // const BookingDate = BookedData?.bookingDate
  const BookingMonths = BookedData?.bookingPeriod;
  const BookingSeat = BookedData?.bookedSeat;
  // console.log("🚀 ~ BookingSeat:", BookingSeat)
  const BookingSlot = BookedData?.timeSlot;
  // console.log("🚀 ~ BookingSlot:", BookedData)
  const RoomNo = BookedData?.roomNo;
  const BookedDate = BookedData?.bookingDate.slice(0, 10);

  const [initialPrice, setInitialPrice] = useState(0);
  const [RegistrationFees, setRegistrationFees] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const [paymentStatus, setPaymentStatus] = useState(false);
  const [paymentData, setPaymentData] = useState(null); // Payment data
  const [paymentId, setPaymentId] = useState(null); // Payment data
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [isinvoiceComplete, setinvoiceComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log("🚀 ~ BookedData:", BookedData)
  // console.log("🚀 ~ BookedData:", BookedData.roomNo)
  console.log("🚀 ~ BookedData----:",BookedData.timeSlot











  )
  useEffect(() => {


    setBookingId( BookedData.bookingId);
    // console.log("🚀 ~ useEffect ~ BookedData.bookedSeat.bookingId:", BookedData.bookingId)
    setRegistrationFees(BookedData?.libraryId?.registrationFees);
    setInitialPrice(BookedData?.price);
        // console.log("🚀 ~ useEffect ~ BookedData?.libraryId.price:", BookedData?.libraryId.price)
    setFinalAmount(BookedData?.totalAmount);
    const getLibraryData = async () => {
      setLocation(BookedData?.libraryId?.address);
      // console.log("🚀 ~ getLibraryData ~ BookedData?.address:", BookedData);

      try {
        const userDataId = await AsyncStorage.getItem("userData");
        const userid = JSON.parse(userDataId);
        setUserData(userid);

        const res = await axios.post(
          `${BACKEND}/api/v1/library/getLibraryById`,
          {
            id: BookedData?.libraryId?.id,
          }
        );
        setLibraryData(res.data);
        return res.data.library;
      } catch (error) {
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

 
  const PaymentPrice = finalAmount;

  useEffect(() => {

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
      key: "rzp_test_hi1B6uwenBy9Ir",
      amount: `${PaymentPrice * 100}`,
      name: "Ekaant",
      order_id: "",
      prefill: {
        email: `${userData?.data?.user_id?.email}`,
        contact: `${userData?.data?.user_id?.phoneNumber}`,
        name: `${userData?.data?.user_id?.username}`,
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

      const res = await confirmPayment();
      // console.log("🚀 ~ handlePayment ~ res:", res)

      router.push("/(tabs)/bookings");
    } catch (error) {
      // console.log(error, "this");

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
    }
    try {


      // console.log(bookingId, "-1-1-11-", BookedData)
      const res = await axios.post(
        `${BACKEND}/api/v1/booking/confirm/${bookingId}`,
        {

          libraryId  : BookedData.libraryId.id,
           roomNo : BookedData.roomNo,
           bookedSeat : BookedData.timeSlot,
           bookingId : BookedData.bookingId,
          BookedData : BookedData,
        

        }
      );

      // console.log(bookingId, "-1-1-11-", paymentData, paymentId, paymentStatus, BookedData)

      if(res.data.status === "success") {
        Toast.show("Payment Success", {});
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  function formatSeatLabel(seatLabel) {
    const [row, column] = seatLabel.split("-");
    return `Row ${row}, Col ${column}`;
  }
  function formatTimeSlots(timeSlots) {
    return timeSlots
      .map((slot) => {
        const { from, to } = slot;

        const formatTime = (time) => {
          const [hour, minute] = time.split(":");

          return `${hour % 12 || 12} ${minute.slice(2)} `;
        };

        return `${formatTime(from)} to ${formatTime(to)}`;
      })
      .join("\n");
  }

  if (!BookedData || loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // console.log("🚀 ~ location:", location)
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
        marginTop: 20,
        paddingTop: 50,
      }}
    >
      <View>
        <Text
          style={{
            color: "#000",
            fontSize: w(30),
            fontFamily: ff.deckSemiBold,
            paddingLeft: 20,
            marginBottom: w(17),
          }}
        >
          Booking Confirmation
        </Text>
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
                width: vw / 2.5,
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
              gap: 10,
            }}
          >
            <View
              style={{
                borderRadius: 5,
                backgroundColor: "#fff", // Example background color
                justifyContent: "center",
                alignItems: "center",
                marginRight: 10,
                borderWidth: 1,
                borderColor: "#828282",
                paddingVertical: w(5),
                paddingHorizontal: w(10),
              }}
            >
              {userDetails?.bookingsForFriend ? (
                <View style={{ flexDirection: "column", alignItems: "center" }}>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: w(12),
                      fontFamily: ff.deckSemiBold,
                    }}
                  >
                    Booking for friend
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: w(12),
                      fontFamily: ff.deckSemiBold,
                    }}
                  >
                    {userDetails?.friendDetails?.name}
                  </Text>
                </View>
              ) : (
                <Text
                  style={{
                    color: "#000",
                    fontSize: w(12),
                    fontFamily: ff.deckSemiBold,
                  }}
                >
                  Booking for SELF
                </Text>
              )}
            </View>

            <Text
              style={{
                color: "#000",
                fontSize: w(20),
                fontFamily: ff.deckSemiBold,
              }}
            >
              {BookedData?.libraryId?.name || "Library Name"}
            </Text>

            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Ionicons name="time-outline" size={20} color="black" />
              <Text
                style={{
                  color: "#000",
                  fontSize: w(14),
                  fontFamily: ff.deckMedium,
                }}
              >
                Period - {BookedData.bookingPeriod} Month
                {BookedData.bookingPeriod > 1 ? "s" : ""}
              </Text>
            </View>

            <View
              style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
            >
              <Text
                style={{
                  color: "#000",
                  fontSize: w(13),
                  fontFamily: ff.deckMedium,
                  letterSpacing: 0.5,
                }}
              >
                A/C Rooms - {BookedData?.libraryId[0]?.Ac ? "Yes" : "No"}
              </Text>
            </View>
          </View>
        </View>

        {/* Image and Side Details */}
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: 20,
            marginTop: 20,
            alignItems: "center",
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
            <Ionicons name="calendar-outline" size={40} color="black" />
            <View style={{ flexDirection: "column", gap: 10 }}>
              <Text
                style={{
                  color: "#000",
                  fontSize: w(14),
                  fontFamily: ff.textRegular,
                }}
              >
                {BookedDate}
              </Text>
              <Text
                style={{
                  color: "#000",
                  fontSize: w(14),
                  fontFamily: ff.textRegular,
                }}
              >
                {endDate.toISOString().split("T")[0]}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <SeatsCheckout />
            <Text
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                color: "#000",
                fontSize: w(14),
                fontFamily: ff.deckRegular,
              }}
            >
              {formatSeatLabel(BookedData?.bookedSeat?.seatId)}{" "}
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: "black",
            marginHorizontal: 20,
            marginVertical: 10,
          }}
        />

        {/* Payment Summary */}
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 20,
            flexDirection: "column",
            gap: 15,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                color: "#000",
                fontSize: w(16),
                fontFamily: ff.deckRegular,
              }}
            >
              Registration Fee
            </Text>
            <Text
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                color: "#000",
                fontSize: w(16),
                fontFamily: ff.deckSemiBold,
              }}
            >
              ₹{RegistrationFees}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                color: "#000",
                fontSize: w(16),
                fontFamily: ff.deckRegular,
              }}
            >
              Sub Total
            </Text>
            <Text
              style={{
                flexDirection: "column",
                flexWrap: "wrap",
                color: "#000",
                fontSize: w(16),
                fontFamily: ff.deckSemiBold,
              }}
            >
              ₹{initialPrice}
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {BookedData?.libraryId?.[0]?.timeSlot?.map((slot, index) => (
              <View key={index} style={{ flexDirection: "row", gap: 5 }}>
                <Text
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    color: "#000",
                    fontSize: w(16),
                    fontFamily: ff.deckRegular,
                  }}
                >
                  {slot.from || ""} - {slot.to || ""}
                </Text>
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
                <Text
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    color: "#000",
                    fontSize: w(16),
                    fontFamily: ff.deckRegular,
                  }}
                >
                  {/* {location?.split(" ").slice(0, 2).join(" ")}{" "} */}
                 { location?.line1}, {location?.city}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    color: "#000",
                    fontSize: w(16),
                    fontFamily: ff.deckRegular,
                  }}
                >
          {location?.state}, {location?.pincode}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 10,
              // alignItems: "center",
              justifyContent: "flex-start",
              marginTop: 10,
            }}
          >
            <Note />
            <View>
              <Text
                style={{
                  flexDirection: "column",
                  flexWrap: "wrap",
                  color: "#000",
                  fontSize: w(16),
                  fontFamily: ff.deckSemiBold,
                }}
              >
                Slot Time -
              </Text>
              <Text
                style={{
                  flexDirection: "column",
                  flexWrap: "wrap",
                  color: "#000",
                  fontSize: w(16),
                  fontFamily: ff.deckRegular,
                  marginRight: w(20),
                }}
              >
                {formatTimeSlots(
                  BookedData?.timeSlot ?? BookedData.bookedSeat.timeSlot
                )}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Summary */}

      <TouchableOpacity onPress={handlePayment}>
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
            borderRadius: 4,
          }}
        >
          <Text
            style={{
              color: "#FFFFF5",
              fontSize: w(20),
              fontFamily: ff.deckBold,
              letterSpacing: 1.5,
            }}
          >
            Total Amount: ₹{finalAmount}
          </Text>
          <Ionicons name="arrow-forward" size={w(20)} color="white" />
        </View>
      </TouchableOpacity>
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
