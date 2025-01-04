import Avatar from "@/components/AvatarComponent";

import StarRating from "@/components/Ratinstar";

import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
import React, { useEffect, useMemo, useState } from "react";
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
} from "react-native";

import Carousel from "@/components/Slider";

import { router } from "expo-router";
import Button from "@/components/Button";
import getLocationName from "@/utils/location";
import { SafeAreaView } from "react-native-safe-area-context";
import { Toast } from "react-native-toast-notifications";
import axios from "axios";
import { BACKEND } from "@/utils/config";
import ReviewList from "@/components/Review";
import ff from "@/constants/fonts";
import TimeSlot from "../../../components/TimeSlot";

interface CardDetailScreenProps {
  // Define your params here
}

const CardDetailScreen: React.FC<CardDetailScreenProps> = ({}) => {
  const width = Dimensions.get("window").width;
  const [userReviews, setUserReviews] = useState([]);
  const params = useRoute();
  const libData = JSON.parse(params.params.item);
  const data = { ...libData, _id: libData.id };

  const [city, setCity] = useState("Delhi");

  const seat = data.seatLayout;
  const locationData = async () => {
    try {
      // Assuming data.location might be null or undefined, leading to issues when accessed
      if (!data.location || data.location.length < 2) {
        return; // Exit the function if location data is not valid
      }

      const res = await getLocationName(data.location[0], data.location[1]);

      // Check if res is not null before setting it
      if (res !== null) {
        setCity(res);
      } else {
        // Handle null case, maybe set a default value or handle it as needed
      }
    } catch (error) {
      console.error("Error in locationData:", error);
      // Additional error handling logic here
      // For example, setting city to a default value or updating the UI to reflect the error
    }
  };

  const getUserReviews = async () => {
    // Fetch user reviews here
    try {
      console.log("🚀 ~ getUserReviews ~ data:", data.id);
      const res = await axios.post(
        `${BACKEND}/api/v1/library/getReviews/${data.id}`
      );
      // console.log("🚀 ~ getUserReviews ~ res:", res.data)

      setUserReviews(res.data);
    } catch (error) {
      Toast.show("Error fetching user reviews");
    }
  };

  useEffect(() => {
    locationData();
    // getUserReviews();
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

  const amenities = data.amenities || {};

  const trueAmenities = Object.keys(amenities).filter((key) => amenities[key]);
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
          data={data.images}
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
  }, [width, data.images]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
        style={{}}
      >
        <View style={{ flex: 1 }}>{Carasoul}</View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            flexDirection: "column",
            ...(Platform.OS === "ios" ? { marginTop: -200 } : { marginTop: 0 }),
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
              <Text style={styles.heading}>{data?.name}</Text>
              <Text
                style={{
                  fontSize: 16,
                  color: "#0077B6",
                  fontFamily: ff.deckMedium,
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

            <Text style={styles.amenities}>About</Text>
            <Text
              style={{
                marginTop: 2,
                fontSize: 14,
                lineHeight: 19,
                color: "#A8A8A8",
                borderRadius: 10,
                textAlign: "left",
                letterSpacing: 1.1,
                fontFamily: ff.deckMedium,
              }}
              numberOfLines={7}
            >
              {data?.longDescription}
            </Text>

            <View style={{ marginTop: 20 }}>
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
                {trueAmenities.length > 0 ? (
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
                        {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                      </Text>
                    </View>
                  ))
                ) : (
                  <Text style={styles.amenityItem}>No amenities available</Text>
                )}
              </View>
            </View>

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

            {/* //ratings */}
          </View>
          <ReviewList libraryId={data.id} />

          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#F0F0F0",
              padding: 10,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                marginVertical: 20,
                fontSize: 14,
                fontFamily: ff.deckMedium,
              }}
            >
              Copyright © 2025 EKAANT . All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </ScrollView>
      <View
        style={{
          // position: "absolute",
          marginBottom: 10,
          bottom: 0,
          flexDirection: "row",
          justifyContent: "center",
          borderRadius: 20,
        }}
      >
        <TouchableOpacity onPress={() => librarybooking()}>
          <View>
            <Button text="Book Now" width={300} />
          </View>

          {/* pathname: "/(routes)/library/library.booking", */}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 12,
    alignItems: "center",
    flexDirection: "column",
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
    fontSize: 14,
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
