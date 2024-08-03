import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";

import { Ionicons } from "@expo/vector-icons";
import MapViewStyle from "../utils/MapView.json";

import { useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import Markers from "./Maps/Markers";

export default function NearBy() {
  const route = useRoute();

  const data = JSON.parse(route.params.data);
  console.log("🚀 ~ NearBy ~ data:", data);

  const [location, setLocation] = useState(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  // const [libraries, setLibraries] = useState(data.data);

  useEffect(() => {
    // setLibraries(data.data);
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
      setLat(location.coords.latitude);
      setLong(location.coords.longitude);

      // console.log("loc", location);
    })();
  }, []);

  const [selectedLocation, setSelectedLocation] = useState("Delhi");

  // console.log(libraries,"libraries");
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: item.images[0] }} style={styles.cardImage} />
        <View style={styles.cardDetails}>
          <Text style={styles.cardTitle}>{item.name}</Text>

          <View style={{ flexDirection: "row", gap: 5 }}>
            {item.amenities.includes("wifi") ? (
              <Ionicons name="wifi" size={24} color="black" />
            ) : null}
            {item.amenities.includes("ac") ? (
              <Ionicons
                name="phone-landscape-outline"
                size={24}
                color="black"
              />
            ) : null}
          </View>

          {/* <Ionicons name="wifi" size={24} color="black" /> */}
          <Text style={styles.cardAddress}>
            {item.shortDescription.slice(0, 100)}
          </Text>
          <Text style={styles.cardPrice}>Price: ₹{item.RegistrationFees}</Text>
        </View>
      </View>
    </View>
  );
  // console.log("location", location, lat, long);

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.mapContainer}>
        {location ? (
          <MapView
            style={styles.map}
            customMapStyle={MapViewStyle}
            region={{
              latitude: lat || 28.6139,
              longitude: long || 77.209,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: lat || 28.6139,
                longitude: long || 77.209,
              }}
              title="My Location"
              description="I am here"
            >
              <Ionicons name="man" size={40} color="blue" />
            </Marker>

            {data.map((place, index) => (
              <Markers place={place} index={index} key={index} />
            ))}
          </MapView>
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardList}
          contentContainerStyle={styles.cardListContent}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  cardContent: {
    flexDirection: "row",
    gap: 10,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardAddress: {
    fontSize: 14,
    color: "#666",
  },
  cardPrice: {
    fontSize: 16,
    color: "#000",
    marginTop: 5,
  },

  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  cardList: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  cardListContent: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: "lightgray",
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    width: Dimensions.get("window").width * 0.8,
    height: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardAddress: {
    fontSize: 14,
    color: "gray",
  },
});
