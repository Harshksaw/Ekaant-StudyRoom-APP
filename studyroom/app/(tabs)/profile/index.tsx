// import ProfileScreen from "@/screens/profile/profile.screen";

import Header from "@/components/Header";

import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,


  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient as LinearBackground } from 'expo-linear-gradient';





const generateShadesOfBlue = () => {
  // Function to generate shades of blue dynamically
  // This example uses a simple approach to generate shades of blue.
  // You can adjust the logic to generate the shades as per your requirement.
  const shadesOfBlue = [


    '#00BFFF', // Deep Sky Blue
    '#1E90FF', // Dodger Blue
    '#4169E1', // Royal Blue
  ];
  return shadesOfBlue.sort(() => 0.5 - Math.random()).slice(0, 3);
};


import { useDispatch, useSelector } from "react-redux";
import { resetUserState } from "@/redux/userSlice";
import { resetAppState } from "@/redux/appSlice";
import { resetBookingState } from "@/redux/bookingSlice";
export default function profile() {

  const dispatch = useDispatch();

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userData");
    dispatch(resetUserState());
    dispatch(resetAppState());
    dispatch(resetBookingState());

    router.push("(routes)/welcome");
  };

  const userDetails = useSelector((state: any) => state.user);

  // console.log("-------------->",JSON.parse(userDetails));
  // console.log("-------------->+++++++", JSON.parse(userDetails.details));
  const userData = JSON.parse(userDetails?.details)?.user;
  const getInitials = (name: string) => {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  };
  const { width } = Dimensions.get('window');
  const [colors, setColors] = useState(generateShadesOfBlue());

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Generate new shades of blue dynamically
      setColors(generateShadesOfBlue());
    }, 3000); // Change colors every 3 seconds
  
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, }}>
       <LinearBackground
        colors={colors}
        style={{
          flex: 1,
          width: width,
        }}
      >


        <View
          style={{
            marginTop: 0,


          }}
        >
          <Header color="white" />
        </View>

      </LinearBackground>
    
       
      <View
        style={{
          flex: 1,
          zIndex: 3,
          borderRadius: 250,
          borderBottomEndRadius: 0,
          borderBottomStartRadius: 0,
          backgroundColor: "white",
          position: "absolute",
          bottom: 0,
          height: "70%",
          width: "100%",
          justifyContent: "flex-start",
          // borderColor: "black",

          // justifyContent: "center",
          // alignItems: "center",
        }}
      >
        
        
        <View
          style={{
            // position: "relative",
            // bottom:50,

            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            bottom: 30,
          }}
        >
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
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
              width={100}
              height={100}
              style={{
                borderRadius: 100,
              }}
            />
            {/* <Text
              style={{
                color: "#ffffff", // Example text color
                fontSize: 16,
              }}
            >
              {getInitials("HARSH")}
            </Text> */}
          </View>
        </View>

        <View
          style={{
            marginTop: -20,
            flexDirection: "column",
            gap: 10,
            marginHorizontal: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center" }}
          >
            {userData?.username || "Harsh"}
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: "bold", alignSelf: "center" }}
          >
            <Text> {userData?.email || "Harsh@gmail.com"}</Text>
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 10,
              marginTop: 20,
              borderWidth: 4,
              width: "60%",
              height: 50,
              // justifyContent: "center",
              alignItems: "center",

              borderRadius: 10,
              // borderBlockColor: "lightblue",
              borderColor: "lightblue",
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
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
                borderWidth: 2,
                borderColor: "black",

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
                <Ionicons name="book" size={30} color="black" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "semibold",
                    color: "black",
                  }}
                >
                  My Bookings
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                borderWidth: 2,
                borderColor: "black",
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
                <Ionicons name="key" size={30} color="black" />
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "semibold",
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
          }}
          >
            <Text>Terms & Conditions</Text>
            <Ionicons name="arrow-forward" size={20} color="black" />
          </View>


          <TouchableOpacity onPress={() => logout()}>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",

                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "semibold",
                  color: "red",
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
