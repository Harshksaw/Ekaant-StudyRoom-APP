import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
  Animated,
  Easing,
} from "react-native";

import Carousel from "@/components/Slider";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { BACKEND } from "@/utils/config";
import ReviewList from "@/components/Review";
import ff from "@/constants/fonts";
import { h, vw, w } from "@/constants/size";
const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;
interface CardDetailScreenProps {
  // Define your params here
}

const CardDetailScreen: React.FC<CardDetailScreenProps> = ({}) => {
  const width = Dimensions.get("window").width;
  const { params } = useRoute();

  const translateX = useRef(new Animated.Value(-vw + vw * 0.5)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 300,
          duration: 1500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),

        Animated.delay(1000),
      ])
    ).start();
  }, []);

  const [data, setData] = useState({});

  const getLibraryById = async () => {
    try {
      const res = await axios.post(`${BACKEND}/api/v1/library/getLibraryById`, {
        id: params?.id,
      });

      if (res.status === 200) {
        const library = res.data.data;
        setData({ ...library, _id: library.id });
        setCity(library?.address?.city);
      }
    } catch (error) {}
  };

  const [city, setCity] = useState("Delhi");

  useEffect(() => {
    getLibraryById();
  }, []);

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const librarybooking = () => {
    router.push({
      pathname: "/(routes)/library/library.booking",
      params: { item: JSON.stringify(data), location: JSON.stringify(city) },
    });
  };

  const trueAmenities = data?.amenities?.amenities;

  const price = data.Price || 0;

  const Carasoul = useMemo(() => {
    return (
      <>
        <Carousel
          autoplay
          paginationConfig={{
            dotSize: 8.86,
            activeColor: "rgba(0, 119, 182, 1)",
            color: "#6FC8E2",
            bottomOffset: 0,
            activeDotStyle: {
              width: 23,
              height: 8.86,
              left: -7,
            },
            dotSpacing: 20,
            animated: true,
            dotIncreaseSize: 1.2,
          }}
          data={data?.images}
          buttonsConfig={{
            disabled: true,
          }}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          )}
        />
      </>
    );
  }, [width, data]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
        style={{}}
      >
        {data.images && <View style={{ flex: 1 }}>{Carasoul}</View>}

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            flexDirection: "column",
            ...(Platform.OS === "ios" ? { marginTop: 0 } : { marginTop: 0 }),
          }}
        >
          <View style={styles.cardDetails}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                gap: 10,
                paddingRight: 28,
              }}
            >
              <Text style={{ ...styles.heading, width: "72%" }}>
                {data?.name}
              </Text>
              <Text
                style={{
                  fontSize: w(isTablet ? 14 : 14),

                  color: "#0077B6",
                  fontFamily: ff.deckMedium,
                  width: "28%",
                  textAlign: "right",
                }}
              >
                ₹{price}/month
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                gap: 4,
              }}
            >
              <Ionicons name="location" size={24} />
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 14,
                  color: "#929191",
                  fontFamily: ff.textMedium,
                  letterSpacing: 1,
                  marginRight: 30,
                }}
              >
                {city ? city : "Delhi"}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#ECECEC",
                height: 1,
                width: "100%",
                marginBottom: h(10),
              }}
            />
            <Text style={styles.amenities}>About</Text>
            <Text
              style={{
                marginTop: 2,
                fontSize: w(isTablet ? 12 : 14),
                lineHeight: h(17),
                color: "#A8A8A8",
                borderRadius: 10,
                textAlign: "justify",
                letterSpacing: 1.1,
                fontFamily: ff.deckRegular,
              }}
              numberOfLines={7}
            >
              {data?.longDescription}
            </Text>

            <View
              style={{
                backgroundColor: "#ECECEC",
                height: 1,
                width: "100%",
                marginVertical: h(10),
              }}
            />
            <View>
              <Text style={styles.amenities}>Overview</Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 5,
                  rowGap: 2,
                  marginTop: 6,
                }}
              >
                {trueAmenities && trueAmenities?.length > 0 ? (
                  trueAmenities.map((amenity, index) => (
                    <View
                      key={index}
                      style={{
                        borderWidth: 1,
                        borderColor: "#d0cdcd",
                        borderRadius: 10,
                        paddingVertical: 4,
                        paddingHorizontal: 16,
                        margin: 5,
                      }}
                    >
                      <Text key={index} style={styles.amenityItem}>
                        {amenity
                          .replace(/([a-z])([A-Z])/g, "$1 $2")
                          .charAt(0)
                          .toUpperCase() +
                          amenity.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1)}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.amenityItem}>No amenities available</Text>
                )}
              </View>
            </View>

            {isModalVisible && (
              <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={toggleModal}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <TouchableOpacity
                    // onPress={() => Linking.openURL('mailto:example@example.com')}
                    >
                      <Text style={{ color: "blue" }}>
                        Email: example@example.com
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    // onPress={() => Linking.openURL('tel:+1234567890')}
                    >
                      <Text style={{ color: "blue" }}>Phone: +1234567890</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={toggleModal}>
                      <Ionicons name="close" size={30} color="#000" />
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
            )}

            {/* //ratings */}
          </View>
          <ReviewList libraryId={params?.id} />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                marginVertical: 20,
                fontSize: w(isTablet ? 12 : 14),
                fontFamily: ff.deckMedium,
              }}
            >
              Copyright © 2025 EKAANT . All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </ScrollView>

      <TouchableOpacity
        style={{
          bottom: 0,
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "#0077B6",
          borderRadius: 3,
          marginBottom: h(12),
          width: "80%",
          overflow: "hidden",
        }}
        onPress={() => librarybooking()}
      >
        <Text
          style={{
            alignItems: "center",
            padding: w(10),
            borderRadius: 20,
            fontSize: w(16),
            fontFamily: ff.deckSemiBold,
            color: "#fff",
            letterSpacing: 1,
          }}
        >
          Book Now
        </Text>

        <Animated.View
          style={{
            position: "absolute",
            transform: [{ translateX }, { translateY: -30 }],
            opacity: 0.7,
          }}
        >
          <Image
            source={require("@/assets/blurShadow.png")}
            resizeMode="contain"
            style={{
              flex: 1,
              transform: [{ rotate: "-60deg" }],
              width: 150,
              height: 100,
            }}
          />
        </Animated.View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    marginBottom: 25,
  },
  image: {
    marginTop: -0,
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: 20,
  },
  cardDetails: {
    flexDirection: "column", // Arrange children in columns
    gap: 0, // Add gap between children
    padding: 10, // Add padding for better spacing
  },
  heading: {
    fontSize: 26,
    fontFamily: ff.deckBold,
  },

  amenities: {
    fontSize: 19,
    fontFamily: ff.deckBold,
    color: "black",
  },
  amenityItem: {
    fontSize: w(isTablet ? 12 : 14),
    fontFamily: ff.deckRegular,
    color: "#5a5959",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // This will give a semi-transparent background
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    gap: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CardDetailScreen;
