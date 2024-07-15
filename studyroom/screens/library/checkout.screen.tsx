import { AC, Cash, CheckoutScreenLoc, Note, SeatsCheckout } from "@/assets";
import Header from "@/components/Header";
import Seats from "@/components/Seats";
import { getDateAfterMonths } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useEffect } from "react";
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

const CheckoutScreen: React.FC = () => {

  const userDetails = useSelector((state: any) => state.user);
  console.log(userDetails, "-----------------")
  //getting data  from booking screen 

  const params = useRoute();
  const BookedData = JSON.parse(params.params.item);
  // console.log(BookedData, "_________")


  const data = useSelector((state: any) => state.booking);
  // console.log("ddd------->>>>>>>>>>>>>>>>>>>", data);
  const location = data?.details?.location
  // console.log(data.details.images[0]);
  const price = data.details.price || 6000;
  const RegistrationFees = 1000;
  // Assuming price and RegistrationFees are numbers and already calculated correctly
  const subtotal = Number((price + RegistrationFees).toFixed(2));

  const endDate = getDateAfterMonths(BookedData?.date, BookedData?.months);
  const totalAmount = subtotal

  // console.log("Booked Data:", data );
  const BookingDate = BookedData.date;
  const BookingMonths = BookedData.months;
  const BookingSeat = BookedData.seat;
  const BookingSlot = BookedData.slot;
  const RoomNo = BookedData.room || 1;




  const PaymentScreen = async () => {




    router.push({
      pathname: "/library/payment.screen",
      params: { item: JSON.stringify(BookedData), price: JSON.stringify(totalAmount), id: JSON.stringify(data) }

    });
  }


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
          <Image source={{ uri: data.details.images[0] }} style={{
            width: 140,
            height: 200,
            borderRadius: 10,
          }} />
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
                <Text>

                  Booking for friend
                </Text>
                <Text>

                  {userDetails?.friendDetails?.name}
                </Text>
              </View>

            ) : (
              <Text>

                Booking for SELF
              </Text>

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
            <Text>Period - {BookedData.months}{BookedData.months > 1 ? "Months" : "Month"} </Text>
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

          < SeatsCheckout />

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
