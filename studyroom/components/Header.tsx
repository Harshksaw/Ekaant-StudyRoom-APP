import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import ff from "@/constants/fonts";

const Header = ({ color }: any) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

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

          <Ionicons name="chevron-down-outline" size={20} color={"#0077B6"} />
        </View>

        <View style={styles.selectedCity}>
          {color === "white" ? (
            <Ionicons name="location-outline" size={20} color={color} />
          ) : (
            assets &&
            assets[3] && (
              <Image
                source={assets[3]}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            )
          )}
          <Text style={styles.selectedCityText}>
            {selectedLocation ? `${selectedLocation}, IN` : "No location"}
          </Text>
        </View>
      </View>

      <View style={styles.logoContainer}>
        {color === "white" && (
          <View>
            {assets && assets[1] && (
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
                fontSize: 10,
                fontWeight: "bold",
                color: color,
              }}
            >
              EKAANT
            </Text>
          </View>
        )}

        {assets && assets[0] && (
          <Image
            source={{ uri: assets[0].localUri || assets[0].uri }}
            style={{
              width: 60,
              height: 60,
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
    // height: height * 0.085,
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 8,
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
    fontSize: 18,
    fontFamily: ff.deckMedium,
    marginLeft: 5,
  },
});

export default Header;
