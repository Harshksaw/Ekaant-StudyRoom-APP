import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import ff from "@/constants/fonts";
import { Toast } from "react-native-toast-notifications";

const Header = ({ color }: any) => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const [assets, error] = useAssets([
    require("../assets/icons/headerlogo.svg"),
    require("../assets/icons/Headerwhite.png"),
    require("../assets/icons/Ekaant.svg"),
    require("../assets/icons/Headerloc.svg"),
  ]);

  const fetchLocation = async () => {
    try {
      const location = await AsyncStorage.getItem("selectedLocation");
      if (location) {
        setSelectedLocation(location);
      }
    } catch (error) {
      console.error("Failed to fetch location from AsyncStorage", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchLocation();
    }, [])
  );

  if(error){
    Toast.show("Failed to load assets", {});
  }
  return (
    <View style={styles.header}>
      <View style={styles.citySelector}>
        <View style={styles.label}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: ff.textRegular,
              lineHeight: 24,
              textAlign: "center",
              color: color,
            }}
          >
            Location
          </Text>

          <Ionicons name="chevron-down-outline" size={20} color={"#258de9"}  />
        </View>

        <View style={styles.selectedCity}>
          {color === "white" ? (
            <Ionicons name="location-outline" size={20} color={"#258de9"}


            />
          ) : (
            <Ionicons name="location-outline" size={20} color={color} />
            
          )}
          <Text style={styles.selectedCityText}>
            {selectedLocation ? `${selectedLocation},IN` : "No location"}
          </Text>
        </View>
      </View>

      <View style={styles.logoContainer}>

          <View 
          style={{
            padding:2
          }}
          >
            {assets && assets[2] &&  (
              <Image
                source={assets[2]}
                style={{
                  width: 50,
                  height: 50,
                  tintColor: color,
                }}
              />
            )}

            <Text
              style={{
                fontSize: 12,
                fontWeight: "bold",
                color: color,
              }}
            >
              EKAANT
            </Text>
          </View>


        {/* {assets && assets[0] && (
          <Image
            source={{ uri: assets[0].localUri || assets[0].uri }}
            style={{

              marginRight: 10,
              width: 60,
              height: 50,
              tintColor: color,
            }}
          />
        )} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    // height: height * 0.085,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
    marginTop: 2,
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
    marginLeft: 16,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginTop: 5,
  },
  selectedCity: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedCityText: {
    lineHeight: 24,

    
    fontSize: 18,
    fontFamily: ff.deckMedium,
    flexWrap: "nowrap",
    marginLeft: 5,
  },
});

export default Header;
