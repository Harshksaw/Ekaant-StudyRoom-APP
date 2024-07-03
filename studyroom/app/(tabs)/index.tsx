import {
  ActivityIndicator,
  Button,
  Dimensions,
  Image,
  Modal,
  Platform,
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

const { width, height } = Dimensions.get("window");

import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NotListedModal from "@/components/NotListedModal";
import { LinearGradient } from "expo-linear-gradient";
import { fetchRoomData } from "../../hooks/api/library";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/redux/userSlice";

// import * as Location from 'expo-location';
// import {Picker} from '@react-native-picker/picker';

export default function index() {
  const width = Dimensions.get("window").width;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [notavailable, setNotAvailable] = useState(false);
  const [notListed, setNotListed] = useState(false);
  const [reload, setReload] = useState(false);
  const toggleNotListedModal = () => setNotListed(!notListed);

  // const [location, setLocation] = useState(null);
  // const [errorMsg, setErrorMsg] = useState(null);

  // useEffect(() => {
  //   (async () => {

  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== 'granted') {
  //       setErrorMsg('Permission to access location was denied');
  //       return;
  //     }

  //     let location = await Location.getCurrentPositionAsync({});
  //     setLocation(location);

  //     console.log(location)
  //   })();
  // }, []);

  // let text = 'Waiting..';
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  const dispatch = useDispatch();

  const getTokenAndPrintIt = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("userData");
      console.log("Token:", token);
      console.log("TokenData:", userData);
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  const getUserData = async () => {
    const res = await AsyncStorage.getItem("userData");
    // const data = JSON.parse(res);
    return res;
  };

  useEffect(() => {
    const fetchLibraryDate = async () => {
      const res = await getUserData();
      dispatch(setUserDetails(res));

      setIsLoading(true);
      setReload(false);
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
    getTokenAndPrintIt();

    fetchLibraryDate();
  }, [reload]);

  const filters = [
    { id: 1, name: "Filters", icon: "funnel" },
    { id: 2, name: "Sort", icon: "arrow-down-circle" },
    { id: 3, name: "Locality", icon: "location" },
    { id: 4, name: "Price", icon: "wallet" },
  ];

  const userDetails = useSelector((state: any) => state.user);

  console.log("-------------->", userDetails);

  // return <HomeScreen />;
  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={{
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "gray",
        marginBottom: 4,
        padding: 2,
      }}
      key={item._id}
      onPress={() =>
        router.push({
          pathname: "/(routes)/card-details",
          params: { item: JSON.stringify(item) },
        })
      }
      // onPress={()=> {
      //   setNotListed(true)

      // }}
    >
      <View style={styles.card}>
        <Image
          source={{
            uri:
              item.images[0] ||
              "data:image/jpeg;base64,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",
          }}
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
        flex: 1,
        flexDirection: "column",
        gap: 10,  
        // justifyContent: "center",
        // alignItems: "flex-start",
        backgroundColor: "lightblue",
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
      <NotListedModal isVisible={notListed} onClose={toggleNotListedModal} />

      {/* ///carousel -> Listings -> Filters */}
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

      <ScrollView
        style={styles.filters}
        horizontal={true}
        scrollEnabled={true}
        showsHorizontalScrollIndicator={false}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 10,
              height: 30,
              // paddingHorizontal: 10,
              paddingHorizontal: 15,
              backgroundColor: "lightgray",
              borderRadius: 40,
            }}
            // onPress={onPress}
          >
            <Ionicons name={filter.icon} size={24} color="black" />
            <Text style={{ color: "black", marginLeft: 5 }}>{filter.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View
        style={{
          marginHorizontal: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "red",
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
      <ScrollView style={styles.listings}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{ paddingTop: 50 }}
          />
        ) : (
          <>
            <View style={{ paddingHorizontal: 16, marginTop: 4 }}>
              {data &&
                data.data.map((item, index) => renderItem({ item, index }))}

              {data?.data.length == 0 ||
                (notavailable && (
                  <TouchableOpacity onPress={() => setReload(true)}>
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
                ))}
            </View>
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
    // height: 210,
    // width: width * 0.9, // 90% of screen width
    height: height * 0.24,
    backgroundColor: "yellow",
  },
  filters: {
    flexDirection: "row",
    backgroundColor: "red",
    marginHorizontal: 20,

    // height: 13,
    // gap: 15,
    // backgroundColor:'red'
  },
  listings: {
    marginBottom: 450,
  },
  card: {
    margin: 5,
    // backgroundColor: "red",
    // padding:10,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",

    ...(Platform.OS === "ios" && {
      marginBottom: 10,
      marginHorizontal: 10,
      borderRadius: 20,
      padding: 10,
    }),

    // justifyContent: "flex-start",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    backgroundColor: "#DDD", // Adjust background color for better visibility
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
});
