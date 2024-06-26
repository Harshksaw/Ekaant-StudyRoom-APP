import Header from "@/components/Header";
import { getDateAfterMonths } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import React, { useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const CheckoutScreen: React.FC = () => {
  const data = useSelector((state: any) => state.booking);
  console.log("ddd", data);
  console.log(data.details.date, data.details.months);
  const price = data.details.price || 6000;
  const convenienceFee = price * 0.1; // 10% of price
  const subtotal = price + convenienceFee;

  const endDate = getDateAfterMonths(data.details.date, data.details.months);
  const totalAmount = subtotal + subtotal * 0.18; // 18% GST
  return (
    <SafeAreaView>
      {/* Header */}
      <Header />

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
          <Image source={require("../../assets/images/res.png")} />
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
            Library name
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Ionicons name="time" size={24} color="black" />
            <Text>Period - {data.details.months}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
            }}
          >
            <Ionicons name="wifi" size={24} color="black" />

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
          <Ionicons name="calendar" size={50} color="black" />
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
              {data.details.date} -
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
          <Ionicons name="desktop" size={50} color="black" />

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
          <Ionicons name="cash" size={24} color="black" />
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
                Convenience Fee{" "}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "400" }}>
                - ₹{convenienceFee}
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
          <Ionicons name="location" size={25} color="black" />
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
                Viecon park{" "}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={{ fontSize: 15, fontWeight: "300" }}>
                4 th floor , 5th cross{" "}
              </Text>
            </View>
          </View>
        </View>

        {/* //slot */}
        <View style={styles.summary}>
          <Ionicons name="paper-plane" size={25} color="black" />
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
        <TouchableOpacity onPress={() => console.log("Payment")}>
          <View
            style={{
              flexDirection: "row",
              position: "sticky",
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
