import Avatar from "@/components/AvatarComponent";
import Header from "@/components/Header";
import StarRating from "@/components/Ratinstar";

import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");
import React, { useEffect, useState } from "react";
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

import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import Button from "@/components/Button";
import getLocationName from "@/utils/location";

interface CardDetailScreenProps {
  // Define your params here
}

const CardDetailScreen: React.FC<CardDetailScreenProps> = ({}) => {
  const width = Dimensions.get("window").width;

  const params = useRoute();
  const data = JSON.parse(params.params.item);

  const [city, setCity] = useState("Delhi");

  const seat = data.seatLayout;
  console.log(data, "----card.details--45", seat);
  const locationData = async () => {
    try {
      // Assuming data.location might be null or undefined, leading to issues when accessed
      if (!data.location || data.location.length < 2) {
        console.log("Invalid location data");
        return; // Exit the function if location data is not valid
      }

      const res = await getLocationName(data.location[0], data.location[1]);
      console.log("----card.details--45", res);

      // Check if res is not null before setting it
      if (res !== null) {
        setCity(res);
      } else {
        // Handle null case, maybe set a default value or handle it as needed
        console.log("Received null response from getLocationName");
      }
    } catch (error) {
      console.error("Error in locationData:", error);
      // Additional error handling logic here
      // For example, setting city to a default value or updating the UI to reflect the error
    }
  };

  useEffect(() => {
    locationData();
  }, []); // Ensure locationData is called within useEffect to avoid infinite loops

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const librarybooking = () => {
    router.push({
      pathname: "/(routes)/library/library.booking",
      params: { item: JSON.stringify(data), location: JSON.stringify(city) },
    });

    // params: { params.item.seatLayout },
    // });
  };
  // console.log(data)
  return (
    <SafeAreaView style={styles.container}>
      <Header color="black" />
      <ScrollView
        stickyHeaderIndices={[2]}
        showsVerticalScrollIndicator={false}
        style={{}}
      >
        <View style={{ flex: 1, marginVertical: -20 }}>
          <Carousel
            loop
            width={width}
            height={width / 1.5} // Adjusted height for better aspect ratio
            autoPlay={true}
            data={data.images}
            scrollAnimationDuration={2000}
            renderItem={({ item, index }) => (
              <View style={styles.imageContainer}>
                <Image source={{ uri: item }} style={styles.image} />
              </View>
            )}
          />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,

            flexDirection: "column",
            ...(Platform.OS === "ios"
              ? { marginTop: -200 }
              : { marginTop: 0 }),
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
                  fontSize: 15,
                  color: "blue",
                  fontWeight: "500",
                  fontStyle: "italic",
                }}
              >
                ₹{data?.price}/month
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
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  color: "#A8A8A8",
                  fontWeight: "semi-bold",
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
                lineHeight: 18.67,
                color: "#A8A8A8",
                borderRadius: 10,
              }}
              numberOfLines={7}
            >
              {data?.longDescription}
            </Text>

            <View style={{ marginTop: 12 }}>
              <Text style={{ fontWeight: "700", fontSize: 17, color: "black" }}>
                Overview
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 10,
                  marginTop: 6,
                  // justifyContent: "space-between",
                }}
              >
                {data.amenities.map((amenity: string, index: any) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 10,
                      borderColor: "#dfdfdf",
                      borderWidth: 1,
                      borderRadius: 20,
                      padding: 7,
                      alignSelf: "flex-start",
                    }}
                  >
                    {/* Your text here */}
                    <Text style={{ color: "#606060" }}>{amenity}</Text>
                  </View>
                ))}
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

            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  margin: 20,
                  // fontFamily: "Roboto",
                  fontSize: 20,
                  fontStyle: "normal",
                  fontWeight: "800",

                  textAlign: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                Reviews
              </Text>

              <View
                style={{
                  marginHorizontal: "auto",
                  flexWrap: "wrap",
                  backgroundColor: "#F0F0F0",
                  elevation: 6,
                  borderRadius: 12,
                  flexDirection: "row",
                  paddingHorizontal: 38,
                  paddingVertical: 8,
                  justifyContent: "center",
                  alignSelf: "",
                  gap: 10,
                }}
              >
                {/* <Text>4.5</Text> */}
                <StarRating rating={4} />
                <Text style={{ padding: 0, fontSize: 13 }}>10 Reviews</Text>
              </View>

              {/* ///review by user */}

              <View
                style={
                  {
                    // height:'100%',
                    // backgroundColor:'red'
                  }
                }
              >
                <Text style={{ fontWeight: "bold", fontSize: 20, margin: 10 }}>
                  User Reviews
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                    flexWrap: "wrap",
                    // margin: 10,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {[1, 1, 1].map((item, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "auto",
                        borderTopWidth: 2,

                        padding: 10,
                        paddingHorizontal: 40,
                        borderColor: "#eaeaea",
                        // backgroundColor: "#30364D",

                        // alignSelf: "center",
                        gap: 10,
                      }}
                    >
                      <Avatar name="Arsh" />
                      <View
                        style={{
                          flexDirection: "column",

                          marginTop: 10,

                          borderRadius: 20,
                          padding: 10,

                          alignSelf: "center",

                        }}
                      >
                        <Text>Harsh</Text>
                        <Text>Review revis is Good</Text>
                      </View>

                      <StarRating rating={4} />
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </View>

          <View 
          style={{

            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F0F0F0",
            padding: 10,
            borderRadius: 20,
            marginVertical: 20,
          
          }}
          >
            <Text style={{ marginVertical: 10, fontSize: 12, fontWeight: 600 }}>
              Copyright © 2024 EKAANT . All rights reserved.
            </Text>
          </View>
        </ScrollView>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          marginBottom: 20,
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

    flexDirection: "column", // Arrange children in columns

    // justifyContent: "space-between", // Arrange children in columns
    // alignItems: "center", // Arrange children in columns
  },
  imageContainer: {
    flex: 1,



    alignItems: "center",
    

    padding: 10,

    borderRadius: 20,
    marginRight: 30,
    // backgroundColor: "lightblue",
    justifyContent: "center",
  },
  image: {
    // width: "100%",
    // height: 250,
    // marginTop: -10,
    // borderRadius: 20,

      marginTop: -0,
      width: width * 0.90,
      height: height * 0.25,
      borderRadius: 20,
      // borderTopLeftRadius: 40,
      // borderTopRightRadius: 40,

  },
  cardDetails: {
    flexDirection: "column", // Arrange children in columns
    gap: 0, // Add gap between children
    // height: 400, // Adjust height for better spacing
    // marginBottom: 120, // Add margin for better spacing
    padding: 10, // Add padding for better spacing
  },
  heading: {
    fontSize: 25,
    fontWeight: "700",
  },

  amenities: {
    fontSize: 17,
    fontWeight: "700",
    color: "black",
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
