import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { BACKEND } from "@/utils/config";
import { TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function Invoice() {
  const [invoiceDetails, setInvoiceDetails] = useState<any>(null);
  const route = useRoute();
  const { id } = route.params;
  console.log("🚀 ~ Invoice ~ id:", id);

  const getInvoice = async () => {
    try {
      const res = await axios.post(`${BACKEND}/api/v1/booking/invoices/${id}`);
      console.log("🚀 ~ getInvoice ~ res:", res.data);
      setInvoiceDetails(res.data.data);
    } catch (error) {
      console.error("Error fetching invoice:", error);
    }
  };

  useEffect(() => {
    getInvoice();
  }, []);

  if (invoiceDetails === null) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="blue" size="large" />
      </SafeAreaView>
    );
  }

  console.log("🚀 ~ Invoice ~ invoiceDetails:", invoiceDetails);
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView contentContainerStyle={styles.scrollContainer}> */}
      <View style={styles.invoiceContainer}>
        <Text style={styles.title}>Invoice</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice Number:</Text>
          <Text style={styles.value}>{invoiceDetails.invoiceNumber}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Invoice Date:</Text>
          <Text style={styles.value}>
            {new Date(invoiceDetails.invoiceDate).toLocaleDateString()}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Partner Name:</Text>
          <Text style={styles.value}>{invoiceDetails.customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Partner Email:</Text>
          <Text style={styles.value}>{invoiceDetails.customerEmail}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Partner Phone:</Text>
          <Text style={styles.value}>{invoiceDetails.customerPhoneNumber}</Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Text style={styles.label}>Library Address:</Text>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: "#666",
                textAlign: "center",
                marginHorizontal: 10,
                flexWrap: "wrap",
              }}
            >
              {invoiceDetails.libraryAddress}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          {JSON.parse(invoiceDetails.timeSlotDetails).map((slot, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  color: "#333",
                  marginBottom: 10,
                }}
              >
                Time {index + 1}
              </Text>
              <Text style={styles.value}>From: {slot.from}</Text>
              <Text style={styles.value}>To: {slot.to}</Text>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Date:</Text>
          <Text style={styles.value}>
            {new Date(invoiceDetails.bookingDate).toLocaleDateString()}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Booking Period:</Text>
          <Text style={styles.value}>
            {invoiceDetails.bookingPeriod} month(s)
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booking ends on</Text>
          <Text style={styles.value}>
            {invoiceDetails.bookingFinalDate.slice(0, 10)}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Final Price:</Text>
          <Text style={styles.value}>Rs {invoiceDetails.finalPrice}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Booking Status:</Text>
          <Text style={styles.value}>{invoiceDetails.bookingStatus}</Text>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          router.back();
        }}
        style={{
          backgroundColor: "white",
          padding: 10,
          paddingHorizontal: 30,
          borderRadius: 10,
          margin: 10,
          borderWidth: 4,
          borderColor: "red",
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            color: "black",
            textAlign: "center",

            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Close
        </Text>
      </TouchableOpacity>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f1",
    borderBlockColor: "black",
    borderWidth: 1,
    borderEndColor: "black",

    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  scrollContainer: {
    padding: 20,
  },
  invoiceContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#222020",
  },
});
