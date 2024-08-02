import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView, { Marker } from "react-native-maps";

import * as Location from "expo-location";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import MapViewStyle from "../utils/MapView.json";
const libraries = [
  { id: "1", name: "Library 1", address: "123 Main St" },
  { id: "2", name: "Library 2", address: "456 Elm St" },
  { id: "3", name: "Library 3", address: "789 Oak St" },
  // Add more libraries as needed
];

export default function NearBy() {
  const [location, setLocation] = useState(null);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  useEffect(() => {
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

      console.log("loc", location);
    })();
  }, []);

  const [selectedLocation, setSelectedLocation] = useState("Delhi");

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardAddress}>{item.address}</Text>
    </View>
  );
  console.log("location", location, lat, long);

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>NearBy</Text> */}
      <View style={styles.mapContainer}>
        <MapView style={styles.map} />

        {/* {location && ( */}
        <MapView
          style={styles.map}
          customMapStyle={MapViewStyle}
          region={{
            latitude:lat || 28.6139, // Delhi latitude
            longitude: long ||  77.209, // Delhi longitude
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
        >
          {location ? (
              <Marker
                coordinate={{
                  latitude: lat,
                  longitude: long,
                }}
              >
                <Image source={{
                  uri: "https://cdn.iconscout.com/icon/free/png-256/current-location-555-461761.png"
                }} style={{ width: 50, height: 50
                }}
                />
               
               
              </Marker>
            ) : null}

          {/* { placeList.map((place, index)=>(



    <Markers place={place} index={index} key={index} />
  ))} */}
        </MapView>
        {/* )} */}

        <FlatList
          data={libraries}
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
