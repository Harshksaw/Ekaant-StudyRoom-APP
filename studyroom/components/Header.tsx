import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,

  Platform,
  PermissionsAndroid,
  SafeAreaView,
} from "react-native";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
import { Image } from 'expo-image'
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

// import Headerlogo from '../assets/icons/headerlogo.svg'
import { useAssets } from "expo-asset";

const citiesData = [
  { id: 1, name: "Mumbai" },
  { id: 2, name: "Delhi" },
  { id: 3, name: "Bangalore" },
  { id: 4, name: "Hyderabad" },
  { id: 5, name: "Chennai" },
  { id: 6, name: "Kolkata" },
  { id: 7, name: "Ahmedabad" },
  { id: 8, name: "Pune" },
  { id: 9, name: "Surat" },
  { id: 10, name: "Jaipur" },
];
const Header: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState();

  const [Enable, setEnable] = useState(true);
  // const [cities, setCities] = useState([]);
  // const [selectedCity, setSelectedCity] = useState("");
  const [assets, error] = useAssets([
    require('../assets/icons/headerlogo.svg'),

  ]);

  return (
    <View style={styles.header}>
      <View style={styles.citySelector}>
        <View style={styles.label}>
          <Text
            style={{

              fontFamily: "Poppins",
              fontSize: 16,
              fontWeight: "500",
              lineHeight: 24,
              textAlign: "center",
            }}
          >
            Location
          </Text>
          <Ionicons name="chevron-down-outline" size={20} color="blue" />
        </View>

        <View style={styles.picker}>
          <Ionicons name="location" size={24} color="black" />
          <Picker
            selectedValue={Enable}
            style={{
              height: 0,
              width: 175,
              borderRadius: 150,
              color: "black",
              borderBlockColor: "black",
              borderWidth: 1,
            }}
            mode={"dropdown"}
            // onValueChange={(itemValue) => setEnable(itemValue)}

            onValueChange={(itemValue, itemIndex) => setEnable(false)}
          >
            {citiesData?.map((slot, index) => (
              <Picker.Item
                key={index}
                label={slot.name}
                value={slot.name}
                style={{
                  color: "gray",
                  fontSize: 15,
                  fontStyle: "normal",
                  fontWeight: 800,

                  textAlign: "center",
                  // backgroundColor: "blue",

                  borderRadius: 20,

                  // padding: 2,
                  // margin: 4,
                }}
              />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.logoContainer}>
          {assets && assets[0] &&  <Image source={assets[0]} style={{

            width: 50, height: 50,

          }} />}
            {/* <Headerlogo
            width={120} height={40}
            /> */}
        {/* <Image
          height={20}
          source={require("../assets/icons/headerlogo.svg")}
          style={styles.logo}
        /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // width: width * 0.9, // 90% of screen width
    height: height * 0.09,
    width:'100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,

    paddingBottom: 8,

  },
  logoContainer: {
    // flex: 1,
    alignItems: "center",
  },
  logo: {
    width: "50%",
    height: "100%",
  },
  citySelector: {
    flex: 1,
    marginLeft: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
    flexDirection: "row",
    gap:5,
    alignItems: "center",
    marginTop: 5,
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 3,
    height: 40,
    // backgroundColor: "red",

    borderRadius: 40,
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
});

export default Header;
