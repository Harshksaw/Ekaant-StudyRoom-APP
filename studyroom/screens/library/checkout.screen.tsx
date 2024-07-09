import { AC, Cash, CheckoutScreenLoc, Note, SeatsCheckout } from "@/assets";
import Header from "@/components/Header";
import Seats from "@/components/Seats";
import { getDateAfterMonths } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useAssets } from "expo-asset";
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
import PaymentScreen from "./payment.screen";
import axios from "axios";
import { BACKEND } from "@/utils/config";
import { getUserId } from "@/utils/keys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-notifications";

const CheckoutScreen: React.FC = () => {

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


// console.log("Price:", price);
// console.log("Convenience Fee:", RegistrationFees);

// console.log("End Date:", endDate);
// console.log("Total Amount:", totalAmount);


const PreBook = async() => {
  const userData = await AsyncStorage.getItem("userData");
  const userid = JSON.parse(userData || "{}")
  const userId = userid.user._id;

  console.log("User ID:", userId, "--------","libraryId", data.id, "Initial Price:", price, "Final Price:", totalAmount, "Time Slot:", BookingSlot, "Room No:", RoomNo, "Booked Seat:", BookingSeat, "Booking Date:", BookingDate, "Booking Period:", BookingMonths);
  if(!userId || !data.id || !price || !totalAmount || !BookingSlot || !RoomNo || !BookingSeat || !BookingDate || !BookingMonths){
    return Toast.show("Please fill all fields !ReBook", {
      type: "error",
      placement: "top",
      animationDuration: 1000,
      icon: <Ionicons name="alert-circle" size={24} color="red" />,

      duration: 3000,
    }

  )
    return;
  }

  const response = await axios.post(`${BACKEND}/api/v1/booking/createBooking`,{
    userId: userId,
    libraryId : data.id,
    initialPrice : price,
    finalPrice : totalAmount,
    timeSlot : BookingSlot,
    roomNo : RoomNo,
    bookedSeat : BookingSeat,
    bookingDate : BookingDate,
    bookingPeriod : BookingMonths,
  })

}

  const PaymentScreen = async() => {
    await PreBook();



    // router.push({
    //   pathname: "/library/payment.screen",
    //   params: { item: JSON.stringify(BookedData), price: JSON.stringify(totalAmount) }

    // });
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
