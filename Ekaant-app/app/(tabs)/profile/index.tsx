import { Feather, Fontisto, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LinearGradient as LinearBackground } from "expo-linear-gradient";

import { useDispatch, useSelector } from "react-redux";
import { logout, resetUserState } from "@/redux/userSlice";
import { resetAppState } from "@/redux/appSlice";
import { resetBookingState } from "@/redux/bookingSlice";
import { h, w, width } from "@/constants/size";
import ff from "@/constants/fonts";
const isTablet = Platform.OS === 'ios' && (width >= 768 );

export default function profile() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("userData");
    dispatch(logout());
    dispatch(resetUserState());
    dispatch(resetAppState());
    dispatch(resetBookingState());

    router.dismissAll();
    router.replace("(routes)/welcome" as any);
  };
  const [userData, setUserData] = React.useState<any>();
  const userDetails = useSelector((state: any) => state.user);

  useEffect(() => {
    const getUserData = async () => {
      const u = JSON.parse(userDetails.user || "{}");
      setUserData(u.data.user || u.user);
    };

    getUserData();
  }, [userDetails]);

  const { width , height} = Dimensions.get("window");

  const isTablet = width >= 768  ;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearBackground
        colors={["#0077B6", "#0077B6"]}
        style={{
          flex: 1,
          width: width,
          flexDirection:'row',
          justifyContent:'space-between'
      
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: isTablet ? w(24) : w(30),
            fontFamily: ff.deckMedium,
            margin: w(30),
          }}
        >
          My Profile
        </Text>


        <View
          style={{
            borderTopWidth: 1,
            borderStyle: "dashed",
            borderColor: "#000",
            marginHorizontal: w(20),
            marginTop: h(35),
          }}>
          <TouchableOpacity onPress={() =>router.push("/(routes)/delete-account")}>
            <View
              style={{
                marginTop: isTablet ? w(10) : w(6),
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: w(15),
              }}>
              <Text
                style={{
                  fontSize: isTablet ? w(14) : w(16),
                  fontFamily: ff.deckBold,
                  color: "#FF3B30",
                  alignSelf: "flex-start",
                }}>
                Delete Account
              </Text>
            </View>
            </TouchableOpacity>
          </View>
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
        backgroundColor: "#007422",
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
        fontSize: isTablet ? w(20) : 22,
        fontFamily: ff.deckMedium,
        alignSelf: "center",
      }}
    >
      {userData?.username || "---"}
    </Text>
    <Text
      style={{
        fontSize: isTablet ? w(20) : 20,
        fontFamily: ff.deckMedium,
        alignSelf: "center",
      }}
    >
      <Text>{userData?.email || "----"}</Text>
    </Text>

    <View
  style={{
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  }}
>
  <TouchableOpacity
    style={{
      borderWidth: 1,
      borderColor: "#818181",
      borderRadius: 10,
      paddingVertical: isTablet ? w(6) : 10,
      paddingHorizontal: isTablet ? w(12) : 20,
      minWidth: isTablet ? w(180) : "auto",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    }}
    onPress={() => router.push("/(tabs)/bookings")}
  >
    <Ionicons name="bookmarks-outline" color={"#263238"} size={isTablet ? w(12) : 20} />
    <Text
      style={{
        fontSize: isTablet ? w(12) : 17,
        fontFamily: ff.deckMedium,
        color: "black",
        marginLeft: 10, // Space between icon and text
        flexShrink: 1, // Prevent text from getting cut
      }}
      numberOfLines={1}
    >
      My Bookings
    </Text>
  </TouchableOpacity>


  <TouchableOpacity
  style={{
    borderWidth: 1,
    marginTop: 10,
      borderColor: "#818181",
      borderRadius: 10,
      paddingVertical: isTablet ? w(6) : 10,
      paddingHorizontal: isTablet ? w(12) : 20,
      minWidth: isTablet ? w(180) : "auto",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
  }}
  onPress={() => router.push("/(routes)/forgot-password")}
>
  <Fontisto name="locked" size={isTablet ? w(12) : 20} color="#4f4f4f" />
  <Text
    style={{
      fontSize: isTablet ? w(12) : 17,
      fontFamily: ff.deckMedium,
      color: "black",
      marginLeft: 10, // Adds spacing instead of gap
      flexShrink: 1, // Prevents text cutoff
    }}
    numberOfLines={1}
  >
    Change Password
  </Text>
</TouchableOpacity>


    </View>

    <View style={{
      flexDirection:  isTablet ? "row" : "column"
    }}>

    
    <TouchableOpacity
      onPress={() => {
        const url = `https://www.studyekaant.com/terms-and-conditions/`;
        Linking.openURL(url);
      }}
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
          fontSize: isTablet ? w(12) : 20,
          fontFamily: ff.deckMedium,
          color: "black",
          marginRight: 10,
        }}
      >
        Terms & Conditions
      </Text>
      <Ionicons name="arrow-forward" size={isTablet ? w(12) : 20} color="black" />
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => {
        const url = `https://www.studyekaant.com/contact-us/`;
        Linking.openURL(url);
      }}
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
      <Ionicons name="call-outline" color={"black"} size={isTablet ? w(14) : w(18)} />
      <Text
        style={{
          fontSize: isTablet ? w(12) : 20,
          fontFamily: ff.deckMedium,
          color: "black",
          marginHorizontal: 10,
        }}
      >
        Contact Us
      </Text>
      <Ionicons name="arrow-forward" size={isTablet ? w(12) : 20} color="black" />
    </TouchableOpacity>
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
          <TouchableOpacity onPress={() => logoutHandler()}>
            <View
              style={{
                marginTop: w(2),
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                marginLeft: w(15),
              }}
            >
              <Text
                style={{
                  fontSize: isTablet ? w(14) : w(16),
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
