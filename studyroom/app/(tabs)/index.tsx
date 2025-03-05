import {
  Alert,
  BackHandler,
  Dimensions,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
  Animated,
  Easing,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import Header from "@/components/Header";
import { router, useFocusEffect } from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const { height } = Dimensions.get("window");

import AsyncStorage from "@react-native-async-storage/async-storage";
import NotListedModal from "@/components/NotListedModal";

import { fetchRoomData } from "../../hooks/api/library";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/redux/userSlice";
import { Image } from "expo-image";
import StarRating from "@/components/Ratinstar";
import { SafeAreaView } from "react-native-safe-area-context";
import { BACKEND } from "@/utils/config";
import axios from "axios";

import { setAppDetails } from "@/redux/appSlice";
import { Toast } from "react-native-toast-notifications";
import ff from "@/constants/fonts";
import Slider from "@/components/Slider";
import { h, w } from "@/constants/size";

export default function index() {
  const width = Dimensions.get("window").width;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  // const [notAvailable, setNotAvailable] = useState(false);
  const [notListed, setNotListed] = useState(false);
  const [reload, setReload] = useState(false);
  const toggleNotListedModal = () => setNotListed(!notListed);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const [bannerImage, setBannerImage] = useState([]);
  const [locationData, setLocationData] = useState(null);

  const [selectedLocation, setSelectedLocation] = useState("");
  const [allfetched, setAllfetched] = useState(false);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const isTablet = screenWidth >= 768;

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  const getAppData = async () => {
    // TODO, tanstackquery
    try {
      const response = await axios.get(`${BACKEND}/api/v1/app/getApp`);

      setBannerImage(response.data.data.Banner);

      setLocationData(response.data.data.locations);
    } catch (error) {
      setBannerImage([]);
      console.error("Failed to fetch banner image data:", error);
    }
  };

  dispatch(setAppDetails(locationData || []));

  const getUserData = async () => {
    const res = await AsyncStorage.getItem("userData");
    // const data = JSON.parse(res);
    return res;
  };

  const fetchSelectedLocation = async () => {
    const location = await AsyncStorage.getItem("selectedLocation");
    setSelectedLocation(location);
  };

  const fetchLibraryDate = async (isFresh: string | null = null) => {
    const res = await getUserData();

    dispatch(setUserDetails(res));
    setIsLoading(true);
    try {
      const fetchedData = await fetchRoomData({
        selectedLocation,
        page,
        limit,
      });
      setAllfetched(
        fetchedData.totalLibraries === [...data, ...fetchedData.data].length
      );

      setData(
        isFresh
          ? fetchedData.data
          : (prevData) => [...prevData, ...fetchedData.data]
      );
    } catch (error) {
      Toast.show("Failed to fetch room data", {
        type: "error",
        duration: 3000,
      });

      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const backAction = () => {
    Alert.alert(
      "Are You Sure?",
      "You Want to Exit From the application?",
      [
        {
          text: "Exit",
          onPress: () => BackHandler.exitApp(),
        },
        {
          text: "continue to app",
          onPress: () => {},
          style: "cancel",
        },
      ],
      {
        cancelable: false,
      }
    );
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [backAction])
  );

  useEffect(() => {
    fetchSelectedLocation();
    getAppData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (!!selectedLocation) {
        fetchLibraryDate();
      }
    }, [selectedLocation, page])
  );

  const reCallLibrary = () => {
    if (!allfetched) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -300,
        duration: 20000,
        delay: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  //card listedrooms
  const renderItem = ({ item, index }: any) => (
    <TouchableOpacity
      key={index}
      style={{
        borderRadius: isTablet ? 20 : 15,
        borderWidth: 1.5,
        borderColor: "#dcd8da",
        marginBottom: h(isTablet ? 20 : 10),
        padding: 5,
        overflow: "hidden",
      }}
      onPress={
        item?.approved
          ? () =>
              router.push({
                pathname: "/(routes)/card-details",
                params: { item: JSON.stringify(item) },
              })
          : () => toggleNotListedModal()
      }
    >
      {item?.approved && (
        <View style={styles.card}>
          <Image
            source={{
              uri:
                item?.cardImage ||
                "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkI...",
            }}
            style={{
              width: w(isTablet ? 95 : 90),
              borderRadius: 10,
              aspectRatio: 16 / 15,
            }}
          />
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              marginLeft: 0,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                overflow: "hidden",

                justifyContent: isTablet ? "center" : "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: w(isTablet ? 14 : 18),
                  lineHeight: isTablet ? 36 : 26.01,
                  textAlign: "left",
                  fontFamily: ff.deckMedium,
                  letterSpacing: 1,
                  flexShrink: 1,
                  flexWrap: "wrap",
                }}
              >
                {item?.name.split(" ").slice(0, 3).join(" ")}
              </Text>
              <Animated.View
                style={{
                  transform: [
                    {
                      translateX:
                        item?.shortDescription?.length > 25 ? translateX : 0,
                    },
                  ],
                  width: isTablet ? 1500 : 1000,
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: w(isTablet ? 18 : 14),
                    fontFamily: ff.textMedium,
                    color: "#0077B6",
                    width: "100%",
                  }}
                >
                  {item?.shortDescription}
                </Text>
              </Animated.View>
            </View>

            <View
              style={{
                flex: 1,
                height: 10,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {item?.approved && (
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 5,
                    }}
                  >
                    <StarRating rating={item?.avgRating ?? 0} />
                    <Text
                      style={{
                        fontSize: isTablet ? 16 : 14,
                        fontFamily: ff.textMedium,
                        lineHeight: isTablet ? 24 : 20.21,
                        color: "#626262",
                      }}
                    >
                      {(item?.avgRating ?? 0).toFixed(1)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );

  const userDetails = useSelector((state: any) => state.user);

  const parsedUser =
    typeof userDetails.user === "string"
      ? JSON.parse(userDetails.user)
      : userDetails.user;

  const username =
    parsedUser?.user?.username.split(" ")[0] ||
    parsedUser?.data.user?.username.split(" ")[0];

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    fetchLibraryDate("fresh");

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [selectedLocation]);

  const Carasoul = useMemo(() => {
    return (
      <Slider
        autoplay
        paginationConfig={{
          dotSize: 8.86,
          activeColor: "rgba(0, 119, 182, 1)",
          color: "#6FC8E2",
          bottomOffset: h(10),
          activeDotStyle: {
            width: 23,
            height: 8.86,
            left: -7,
          },

          dotSpacing: 20,
          animated: true,
          dotIncreaseSize: 1.2,
        }}
        data={bannerImage}
        buttonsConfig={{
          disabled: true,
        }}
        renderItem={({ item, index }) => {
          return (
            <Image
              key={index}
              source={item}
              style={{
                marginTop: -50,
                width: width * 0.95,
                height: height * 0.25,
                borderRadius: 20,
                objectFit: "cover",
              }}
            />
          );
        }}
      />
    );
  }, [width, bannerImage]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        gap: 5,
        backgroundColor: "white",
      }}
    >
      <TouchableOpacity
        style={{ marginTop: 0 }}
        onPress={() => {
          router.navigate("/(routes)/location");
        }}
      >
        <Header color="black" handleLocationChange={handleLocationChange} />
      </TouchableOpacity>

      <NotListedModal isVisible={notListed} onClose={toggleNotListedModal} />

      <FlatList
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        onEndReachedThreshold={0.2}
        style={{ paddingHorizontal: w(10) }}
        onEndReached={reCallLibrary}
        ListHeaderComponent={
          <View key={index}>
            <View style={{ height: h(270) }}>
              <Text
                style={{
                  fontSize: 30,
                  letterSpacing: 1.2,
                  fontFamily: ff.deckBold,
                  color: "black",
                  marginLeft: w(20),
                }}
              >
                Welcome,{" "}
                <Text
                  style={{
                    fontSize: 30,
                    letterSpacing: 1.2,
                    fontFamily: ff.deckBold,
                    color: "#0077B6",
                  }}
                >
                  {username}
                </Text>
                <Text
                  style={{
                    fontSize: 25,
                    letterSpacing: 1.2,
                    fontFamily: ff.deckBold,
                    color: "#0077B6",
                  }}
                >
                  {" "}
                  😊
                </Text>
              </Text>

              {Carasoul}
            </View>

            <TouchableOpacity
              disabled
              onPress={() =>
                data?.data
                  ? router.push({
                      pathname: "/(routes)/nearby",
                      params: { data: JSON.stringify(data?.data) },
                    })
                  : null
              }
            >
              <View
                style={{
                  marginBottom: 10,
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontFamily: ff.deckBold,
                    color: "black",
                  }}
                >
                  Near By
                </Text>
                <Ionicons
                  name={"chevron-forward"}
                  size={22}
                  color="#0077B6"
                  style={{ fontWeight: "600" }}
                />
              </View>
            </TouchableOpacity>
          </View>
        }
        ListEmptyComponent={
          <TouchableOpacity onPress={() => setReload(true)}>
            <Text
              style={{
                textAlign: "center",
                paddingTop: 50,
                fontSize: 25,
                color: "red",
              }}
            >
              No listings available at the moment.
            </Text>
          </TouchableOpacity>
        }
        ListFooterComponent={
          allfetched ? (
            <Text
              style={{
                fontSize: 18,
                fontFamily: ff.textMedium,
                color: "rgb(209, 59, 59)",
                textAlign: "center",
                marginVertical: 16,
              }}
            >
              No more Library available
            </Text>
          ) : null
        }
      />

      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80,
  },
  welcome: {
    marginLeft: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  filters: {
    flexDirection: "row",
    marginBottom: 8,
    zIndex: -1,
  },

  card: {
    margin: 5,
    gap: 18,
    borderRadius: 5,
    flexDirection: "row",
    ...(Platform.OS === "ios" && {
      marginBottom: 10,
      marginHorizontal: 5,
      borderRadius: 20,
      padding: 5,
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
