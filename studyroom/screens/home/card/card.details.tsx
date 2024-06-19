import Avatar from "@/components/AvatarComponent";
import Header from "@/components/Header";
import StarRating from "@/components/Ratinstar";
import getPlaceNameFromCoordinates from "@/utils/location";
import { useRoute } from "@react-navigation/native";

import React from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

interface CardDetailScreenProps {
  // Define your params here
}

const CardDetailScreen: React.FC<CardDetailScreenProps> = ({}) => {
  const width = Dimensions.get("window").width;

  const params = useRoute();
  const data = JSON.parse(params.params.item);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ flex: 1 }}>
        <Carousel
          loop
          width={width}
          height={width / 1.2} // Adjusted height for better aspect ratio
          autoPlay={true}
          data={data.imageUrl}
          scrollAnimationDuration={4000}
          renderItem={({ item, index }) => (
            <View style={styles.imageContainer}>
              <Image source={{ uri: item }} style={styles.image} />
            </View>
          )}
        />
      </View>

      <ScrollView
        style={{
          flex: 1,

          marginHorizontal: 0,
          flexDirection: "column",
          marginTop: -200,
        }}
      >
        <View style={styles.cardDetails}>
          <Text style={styles.heading}>{data.title}</Text>
          <Text
            style={{
              fontSize: 15,
              color: "black",
              fontWeight: "semi-bold",
            }}
          >
            {data.location}
          </Text>

          <Text style={styles.amenities}>About</Text>
          <Text
            style={{
              fontSize: 15,

              borderRadius: 10,
              padding: 10,
              marginBottom: 10,
            }}
            numberOfLines={7}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            magni illo fuga, tempora pariatur ea non minus est? Laudantium, ex
            deleniti. Architecto perferendis id iure nesciunt? Repudiandae
            delectus blanditiis exercitationem. Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Corporis, excepturi dignissimos.
            Corporis nisi natus hic, sapiente veritatis temporibus delectus
            aliquam quisquam architecto odio laudantium? Veniam, eum. Soluta
            quis sunt accusamus.
          </Text>

          <View>
            <Text>Amenities</Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: 10,
                margin: 10,
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
                    borderColor: "black",
                    borderWidth: 1,
                    borderRadius: 20,
                    padding: 7,
                    alignSelf: "flex-start",
                  }}
                >
                  {/* Your text here */}
                  <Text>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              // justifyContent: "flex-end",
              gap: 10,
              borderRadius: 20,
            }}
          >
            <TouchableOpacity
              style={{
                width: "50%",
                borderRadius: 50,
              }}
            >
              <View
                style={{
                  backgroundColor: "lightgray",

                  padding: 10,

                  borderRadius: 50,

                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "black",
                  }}
                >
                  Contact
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: "50%",
              }}
            >
              <View
                style={{
                  backgroundColor: "blue",

                  padding: 10,

                  borderRadius: 50,

                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 15,
                    fontWeight: "bold",
                  }}
                >
                  Book Now
                </Text>
              </View>
            </TouchableOpacity>
          </View>

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
                fontFamily: "Roboto",
                fontSize: 20,
                fontStyle: "normal",
                fontWeight: "700",

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
                backgroundColor: "lightgray",

                borderRadius: 20,
                flexDirection: "row",
                padding: 20,
                justifyContent: "space-between",
                alignSelf: "flex-start",
                gap: 10,
              }}
            >
              {/* <Text>4.5</Text> */}
              <StarRating rating={4.5} />
              <Text>10 Reviews</Text>
            </View>

            {/* ///review by user */}

        
            <View>
              <Text style={{fontWeight: "bold", fontSize: 20, margin: 10}}>User Reviews</Text>
              <View
                style={{
                  flexDirection: "column",
                  flexWrap: "wrap",
                  gap: 10,
                  // margin: 10,
                  // justifyContent: "space-between",
                }}
              >

            {[1,1,1].map((item)=>(
                  <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    // margin: 20,
                    padding: 10,
                    paddingHorizontal:20,
                    borderRadius: 20,
                    backgroundColor: "lightgray",
    
                    alignSelf: "flex-start",
                    gap: 10,
                  }}
                >
                      <Avatar name="Arsh" />
                  <View
                    style={{
                      flexDirection: "column",
    
                      marginTop: 10,
    
    
                      borderRadius: 20,
                      padding: 7,
                      alignSelf: "flex-start",
                    }}
                  >
                
                    <Text>Name</Text>
                    <Text>Review revis iss dd</Text>
                  </View>
    
                  <StarRating rating={3} />
                </View>

            ))}
                {/* {data.map((review: any, index: any) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: "column",
                      justifyContent: "space-between",
                      marginTop: 10,
                      borderColor: "black",
                      borderWidth: 1,
                      borderRadius: 20,
                      padding: 7,
                      alignSelf: "flex-start",
                    }}
                  >

                    <Text>{review.rating}</Text>

                    <StarRating rating={review.rating} />
                  </View>
                ))} */}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,

    flexDirection: "column", // Arrange children in columns
    // justifyContent: "space-between", // Arrange children in columns
    // alignItems: "center", // Arrange children in columns
  },
  imageContainer: {
    // flex: 1,

    borderRadius: 20,
    marginRight: 30,
    backgroundColor: "blue",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 250,
    marginTop: -10,
    borderRadius: 20,
  },
  cardDetails: {
    flexDirection: "column", // Arrange children in columns
    gap: 10, // Add gap between children
    // height: 400, // Adjust height for better spacing
    // marginBottom: 120, // Add margin for better spacing
    padding: 10, // Add padding for better spacing
  },
  heading: {
    fontSize: 25,
    fontWeight: "500",
  },

  amenities: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default CardDetailScreen;
