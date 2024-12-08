// import ProfileScreen from "@/screens/profile/profile.screen";

import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient as LinearBackground } from "expo-linear-gradient";



import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "@/redux/userSlice";
import { resetAppState } from "@/redux/appSlice";
import { resetBookingState } from "@/redux/bookingSlice";
import { h, w } from "@/constants/size";
import ff from "@/constants/fonts";
export default function profile() {
  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userData");
    dispatch(resetUserState());
    dispatch(resetAppState());
    dispatch(resetBookingState());

    router.push("(routes)/welcome" as any);
  };

  const userDetails = useSelector((state: any) => state.user);

  // console.log("-------------->",JSON.parse(userDetails));
  // console.log("-------------->+++++++", JSON.parse(userDetails.details));
  const userData = JSON.parse(userDetails?.details)?.user;
  // const getInitials = (name: string) => {
  //   let initials = name.match(/\b\w/g) || [];
  //   initials = (
  //     (initials.shift() || "") + (initials.pop() || "")
  //   ).toUpperCase();
  //   return initials;
  // };
  const { width } = Dimensions.get("window");
  // const [colors, setColors] = useState(generateShadesOfBlue());

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Generate new shades of blue dynamically
  //     setColors(generateShadesOfBlue());
  // //   }, 3000); // Change colors every 3 seconds

  //   return () => clearInterval(intervalId); // Cleanup interval on component unmount
  // }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearBackground
        colors={["#0077B6", "#0077B6"]}
        style={{
          flex: 1,
          width: width,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: w(30),
            fontFamily: ff.deckMedium,
            margin: w(30),
          }}
        >
          My Profile
        </Text>
      </LinearBackground>

      <View
        style={{
          flex: 1,
          zIndex: 3,
          borderRadius: w(25),
          borderBottomEndRadius: 0,
          borderBottomStartRadius: 0,
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          height: "75%",
          width: "100%",
          justifyContent: "flex-start",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            top: "-20%",
          }}
        >
          <View
            style={{
              width: w(140),
              height: w(140),
              borderRadius: 400,
              backgroundColor: "#007422", // Example background color
              justifyContent: "center",
              alignItems: "center",
              marginRight: 10,
            }}
          >
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&s=10",
              }}
              style={{
                borderRadius: 400,
                width: w(140),
                height: w(140),
              }}
            />
          </View>
        </View>

        <View
          style={{
            marginTop: "-15%",
            flexDirection: "column",
            gap: 10,
            marginHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontFamily: ff.deckMedium,
              alignSelf: "center",
            }}
          >
            {userData?.username || "Harsh"}
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontFamily: ff.deckMedium,
              alignSelf: "center",
            }}
          >
            <Text> {userData?.email || "Harsh@gmail.com"}</Text>
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              marginTop: 20,
              borderWidth: 1,
              width: "60%",
              height: 50,
              alignItems: "center",
              borderRadius: w(6),
              borderColor: "lightblue",
            }}
          >
            <Feather name="edit" size={20} />
            <Text
              style={{
                fontSize: 18,
                fontFamily: ff.deckMedium,
                color: "black",
              }}
            >
              Edit Profile
            </Text>
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "column",
              gap: 0,
              width: "90%",
              // marginHorizontal: 20,
            }}
          >
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#818181",

                height: 45,
                gap: 0,

                borderRadius: 10,
                padding: 5,
              }}
              onPress={() => router.push("/(tabs)/bookings")}
            >
              <View
                style={{
                  height: 30,
                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginHorizontal: 20,
                  gap: 20,
                }}
              >
                <Ionicons
                  name="bookmarks-outline"
                  color={"#263238"}
                  size={20}
                />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: ff.deckMedium,
                    color: "black",
                  }}
                >
                  My Bookings
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#818181",

                marginTop: 10,
                height: 45,
                gap: 10,

                width: "auto",
                borderRadius: 10,
                padding: 5,
              }}
              onPress={() => router.push("/(routes)/forgot-password")}
            >
              <View
                style={{
                  height: 30,

                  alignItems: "center",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  marginHorizontal: 20,

                  gap: 20,
                }}
              >
                <Fontisto name="locked" size={20} color="#4f4f4f" />
                <Text
                  style={{
                    fontSize: 17,
                    fontFamily: ff.deckMedium,
                    color: "black",
                  }}
                >
                  Change Password
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
              borderWidth: 0.3,
              padding: w(10),
              borderRadius: 3,
              borderColor: "#949494",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontFamily: ff.deckMedium,
                color: "black",
                marginRight: 10,
              }}
            >
              Terms & Conditions
            </Text>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>
        </View>
        <View
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            borderColor: "#000",
            marginHorizontal: w(20),
            marginTop: h(35),
          }}
        >
          <TouchableOpacity onPress={() => logout()}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: w(15),
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: ff.deckBold,
                  color: "#000",
                  alignSelf: "flex-start",
                }}
              >
                Log Out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 10,
    // paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: "#0077B6",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
  citySelector: {
    flex: 2,
    marginLeft: 16,
    // alignItems: "center",
    marginTop: 10,
    // justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  picker: {
    zIndex: 3,
    height: 40,

    borderRadius: 4,
  },
  selectedCity: {
    flex: 1,
    alignItems: "center",
  },
  selectedCityText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  container: {
    flex: 1, // Make content take full screen height
  },
  locationContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0", // Light background
    padding: 10,
    margin: 10,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationData: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
  },
  // avatar: {
  //   width: 40,
  //   height: 40,
  //   borderRadius: 20,
  //   marginRight: 10,
  // },
  // initialsAvatar: {
  //   width: 100,
  //   height: 100,
  //   borderRadius: 50,
  //   backgroundColor: 'green', // Example background color
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginRight: 10,
  // },
  // initialsText: {
  //   color: '#ffffff', // Example text color
  //   fontSize: 16,
  // },
  // userName: {
  //   fontSize: 16,
  // },
});
