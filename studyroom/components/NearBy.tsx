import { View, Text, StyleSheet, FlatList, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MapView from "react-native-maps";

const libraries = [
  { id: "1", name: "Library 1", address: "123 Main St" },
  { id: "2", name: "Library 2", address: "456 Elm St" },
  { id: "3", name: "Library 3", address: "789 Oak St" },
  // Add more libraries as needed
];

export default function NearBy() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardAddress}>{item.address}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text>NearBy</Text>
      <View style={styles.mapContainer}>
        {/* <MapView style={styles.map} /> */}
        <MapView
          style={styles.map}
          // customMapStyle={MapViewStyle}
          region={{
            latitude: 28.6139,
            longitude: 77.2090,
            latitudeDelta: 0.122,
            longitudeDelta: 0.2921,
          }}
        >
          {/* {location? <Marker
         coordinate={{
          latitude:location?.latitude,
          longitude:location?.longitude
         }} */}
          {/* ></Marker> */}
          {/* 
        <Image source={require('../../../assets/images/car.png')} style={{width:60 , height:60}} />

</Marker> : null} */}

          {/* { placeList.map((place, index)=>(



    <Markers place={place} index={index} key={index} />
  ))} */}
        </MapView>
         
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
