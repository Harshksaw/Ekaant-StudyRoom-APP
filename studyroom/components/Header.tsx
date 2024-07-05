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
import { Image } from "expo-image";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

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
const Header: React.FC<{ color: string }> = ({ color }) => {
  const [selectedLocation, setSelectedLocation] = useState();

  const [Enable, setEnable] = useState(true);

  const [assets, error] = useAssets([
    require("../assets/icons/headerlogo.svg"),
    require("../assets/icons/Headerwhite.png"),
    require("../assets/icons/Ekaant.svg"),
  ]);

  return (
    <View style={styles.header}>
      <View style={styles.citySelector}>
        <View style={styles.label}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              lineHeight: 24,
              textAlign: "center",
              color: color,
            }}
          >
            Location
          </Text>
          <Ionicons name="chevron-down-outline" size={20} color={color} />
        </View>

        <View style={styles.picker}>
          <Ionicons name="location" size={18} color={'#0077B6'} />
          <Picker
            selectedValue={Enable}
            style={{
              height: 0,
              width: 175,
              borderRadius: 150,
              color: color,
              borderBlockColor: color,
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
                  color: color,
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
        {color === "white" && (
          <View>
            {assets && assets[1] && (
              <Image
                source={assets[1]}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: color,
                }}
              />
            )}

            <Text
              style={{
                fontSize: 10,
                fontWeight: "bold",
                color: color,
              }}
            >
              EKAANT
            </Text>
          </View>
        )}

        {color == "black" && assets && assets[0] && (
          <Image
            source={assets[0]}
            style={{
              width: 50,
              height: 50,
              tintColor: color,
            }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // width: width * 0.9, // 90% of screen width
    height: height * 0.09,
    width: "100%",
    // backgroundColor: 'pink',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",


    paddingBottom: 4,
  },
  logoContainer: {
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
    gap: 5,
    alignItems: "center",
    marginTop: 5,
  },
  picker: {
    flexDirection: "row",
    alignItems: "center",
    zIndex: 3,
    height: 30,
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
