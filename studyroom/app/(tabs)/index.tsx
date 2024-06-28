import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";
import Carousel from "react-native-reanimated-carousel";
import Header from "@/components/Header";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchRoomData } from "@/hooks/api/library";

export default function index() {
  const width = Dimensions.get("window").width;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [notavailable, setNotAvailable] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const fetchLibraryDate = async () => {
      setIsLoading(true);
      setReload(false)
      try {
        const fetchedData = await fetchRoomData();
        setData(fetchedData || []);
      } catch (error) {
        console.error("Failed to fetch room data:", error);
       setNotAvailable(true);
        // Handle the error as needed, e.g., set an error state, show a message, etc.
        // For example, setError("Failed to load data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchLibraryDate();
    console.log(data);
  }, [reload]);

  const filters = [
    { id: 1, name: "Filter 1" },
    { id: 2, name: "Filter 2" },
    { id: 3, name: "Filter 3" },
  ];

  // return <HomeScreen />;
  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item._id}
      onPress={() =>
        router.push({
          pathname: "/(routes)/card-details",
          params: { item: JSON.stringify(item) },
        })
      }
    >
      <View style={styles.card}>
        <Image
          source={{ uri: item.images[0] }}
          style={{ width: 100, height: 100, borderRadius: 20 }}
        />
        <View
          style={{
            flex: 1,

            flexDirection: "column",
            width: 200,
            marginLeft: 20,
            // justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flex: 1,
              width: 250,

              marginHorizontal: 10,
              flexDirection: "column",
              justifyContent: "space-evenly",

              // justifyContent:'flex-start',
              alignItems: "flex-start",
            }}
          >
            <Text>{item.name}</Text>
            <Text>
              {item.description.split(" ").slice(0, 5).join(" ") +
                (item.description.split(" ").length > 5 ? "..." : "")}
            </Text>
          </View>

          <View
            style={{
              // flex:1,
              height: 20,
              width: 250,
              flexDirection: "row",
              paddingRight: 20,

              justifyContent: "space-between",
              alignItems: "space-between",
            }}
          >
            {item?.ratings ? <Text> ********{item?.ratings}</Text> : ""}

            <Text>{item.distance}</Text>
          </View>

        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        backgroundColor: "white",
      }}
    >
      {/* <View style={styles.header}></View> */}
      <Header />
      <View style={styles.welcome}>
        {/* <View></View> */}

        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: "black",
          }}
        >
          Welcome,
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: "green",
            }}
          >
            Harsh
          </Text>
        </Text>
      </View>
      <View style={styles.carousel}>
        <Carousel
          loop
          width={width}
          height={width / 2.2}
          autoPlay={true}
          data={[...new Array(6).keys()]}
          scrollAnimationDuration={2500}
          // onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                // borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../assets/images/slider1.png")}
                width={width}
              />
            </View>
          )}
        />
      </View>

      <View style={styles.filters}>
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              height: 40,
              // paddingHorizontal: 10,
              paddingHorizontal: 10,
              backgroundColor: "blue",
              borderRadius: 40,
            }}
            // onPress={onPress}
          >
            <Ionicons name={"arrow-back"} size={24} color="white" />
            <Text style={{ color: "white", marginLeft: 5 }}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.listings}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginHorizontal: 10,
            }}
          >
            Near By
          </Text>
          <Ionicons
            name={"arrow-forward"}
            size={24}
            color="black"
            style={{ marginHorizontal: 10 }}
          />
        </View>

        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ paddingTop: 50 }}
          />
        ) : (
          <>
            {data && data.data.map((item) => renderItem({ item }))}

            {data?.length == 0 ||  notavailable &&  (
             

              <TouchableOpacity 
              onPress={()=> setReload(true)}
              >
                 <Text
                style={{
                  textAlign: "center",
                  paddingTop: 50,
                  fontSize: 18,
                  color: "gray",
                }}
              >
                No listings available at the moment.
              </Text>
              </TouchableOpacity>

              
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
  },
  welcome: {
    height: 50,
    marginLeft: 20,

    justifyContent: "center",

    alignItems: "flex-start",
  },
  carousel: {
    height: 220,
    // backgroundColor: "yellow",
  },
  filters: {
    flexDirection: "row",
    height: 50,
    marginHorizontal: 10,
    gap: 10,
  },
  listings: {
    marginBottom: 360,
  },
  card: {
    margin: 10,
    backgroundColor: "white",

    flexDirection: "row",

    marginBottom: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    padding: 10,

    // justifyContent: "flex-start",
    alignItems: "center",
  },
});
