import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { router } from "expo-router";

import axios from "axios";
import { BACKEND } from "@/utils/config";
import ff from "@/constants/fonts";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { h, w } from "@/constants/size";

const LocationsScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const citiesData = useSelector((state: any) => state.app);

  useEffect(() => {
    setLocations(citiesData.locations || []);
  }, [citiesData.locations]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const citiesData = useSelector((state) => state.app);

        const res = await axios.get(`${BACKEND}/api/v1/app/getApp`);
        const citiesData = res.data.data;
        setLocations(citiesData.locations);
        setFilteredLocations(citiesData.locations);
      } catch (error) {}
    };

    fetchData();
  }, []);

  const handleLocationSelect = async (location: any) => {
    setSelectedLocation(location);

    try {
      await AsyncStorage.setItem("selectedLocation", location.location);
    } catch (error) {
      console.error("Failed to save location to AsyncStorage", error);
    }

    // navigation.goBack();
    router.push("/(tabs)");
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFilteredLocations(
        locations.filter((location: any) =>
          location.location.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }, 400); // Delay of 300ms

    return () => clearTimeout(timeoutId);
  }, [searchQuery, locations]);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: w(20),
          marginTop: h(5),
          marginBottom: h(15),
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Entypo name="chevron-with-circle-left" size={30} />
        </TouchableOpacity>
        <Text style={styles.title}>Select a location</Text>
        <TouchableOpacity style={{ opacity: 0 }}>
          <Entypo name="chevron-with-circle-left" size={30} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <EvilIcons name="search" size={30} style={{ marginBottom: 5 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search locations..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <View
        style={{
          marginHorizontal: w(20),
          marginVertical: h(5),
          backgroundColor: "#fff",
          padding: w(10),
          borderRadius: 7,
          elevation: 5,
        }}
      >
        <Text
          style={{ color: "#000", fontSize: w(20), fontFamily: ff.deckBold }}
        >
          All Cities
        </Text>
        <View style={{ width: "12%", backgroundColor: "#000", height: 3 }} />
      </View>
      <FlatList
        data={filteredLocations}
        numColumns={3}
        style={{
          marginHorizontal: w(15),
        }}
        contentContainerStyle={{ width: "100%" }}
        keyExtractor={(_, index) => index.toString()} // Ensure each item has a unique key
        renderItem={({ item }: { item: any }) => (
          <TouchableOpacity
            style={styles.gridItem}
            onPress={() => handleLocationSelect(item)}
          >
            <View
              style={{
                backgroundColor: "#000",
                ...styles.image,
                opacity: 1,
                elevation: 5,
                shadowColor: "#acacac",
              }}
            >
              <Image
                source={{
                  uri:
                    item?.locationImage ||
                    "https://th.bing.com/th/id/OIP.m78y_Nupeq-RtHFEeNk5PwHaH5?rs=1&pid=ImgDetMain",
                }}
                style={styles.image}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.locationItem}>{item?.location}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    fontFamily: ff.textSemiBold,
  },
  gridItem: {
    margin: h(6),
    padding: 8,
    alignItems: "center",
    gap: w(7),
    borderRadius: 3,
    width: "29.5%",
    // flex: 0,
  },
  searchBar: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
    elevation: 5,
    backgroundColor: "#fff",
    marginTop: h(10),
  },
  searchInput: {
    height: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  image: {
    width: w(60),
    height: w(60),
    borderRadius: 40,
    marginBottom: 5,
    opacity: 0.94,
  },
  locationItem: {
    fontSize: 18,
    textAlign: "center",
    fontFamily: ff.deckRegular,
  },
});

export default LocationsScreen;
