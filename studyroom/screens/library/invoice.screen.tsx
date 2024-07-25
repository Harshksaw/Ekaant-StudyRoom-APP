import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useAssets } from "expo-asset";
import { ImageBackground } from "expo-image";
import Header from "@/components/Header";
import { Success } from "@/assets";
const InvoiceScreen: React.FC = () => {
  const route = useRoute();
  let PaymentPrice = route?.params.price
    ? JSON.parse(route.params.price)
    : null;

  let PaymentData = route.params?.paymentData ? JSON.parse(route.params.paymentData) : null;
  let PaymentId = route.params?.paymentId ? JSON.parse(route.params.paymentId) : null;
  console.log(PaymentData,"--", PaymentId, "---", PaymentPrice);



  const [assets] = useAssets([require("../../assets/images/Subtract.png")]);
  return (
    <View style={styles.container}>
      {/* <View
        style={{
          marginTop: 20,
        }}
      >
        <Header color="black" />
      </View> */}
      <View>
        {assets && (
          <ImageBackground
            source={assets[0]}
            style={{ width: 300, height: 500, marginTop: 50 }}
          >
            <View 
            style={{
                marginTop:50,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap:30,
            }}
            >
              <Text>Payment Success</Text>
              <Text>Your payment has been successfully done</Text>
              <View
                style={{ width: "90%", height: 2, backgroundColor: "black" }}
              />
              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "space-between",
                    alignItems: "center",
                }}
              >
                <Text style={{fontSize:20, }}>Total Payment</Text>
                <Text style={{fontSize:25 , fontWeight:'600'}}> ₹{" "}{PaymentPrice}</Text>
              </View>
            </View>
          </ImageBackground>
        )}
        <View
          style={{
            position: "absolute",
            top: 55, // Position at the top of the container
            left: 120, // Position at the left of the container
            backgroundColor: "white",
            // width: "100%", // Commented out, use fixed width below
            alignItems: "center",
            width: 50,
            height: 50,
            borderWidth: 0.2,
            shadowOffset: {
              width: 5,
              height: 2,
            },
            shadowOpacity: 0.9,
            shadowColor: "black",
            shadowRadius: 4,
            borderRadius: 25,
          }}
        >
          <Success />
        </View>
      </View>

      <TouchableOpacity
          onPress={() =>
                router.navigate("/(tabs)")

          }
          >
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
                Done
              </Text>


            </View>
          </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default InvoiceScreen;
