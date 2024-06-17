import { useRoute } from "@react-navigation/native";

import React from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

interface CardDetailScreenProps {
  // Define your params here
}

const CardDetailScreen: React.FC<CardDetailScreenProps> = ({}) => {
  const width = Dimensions.get("window").width;

  const params = useRoute();
  const data = JSON.parse(params.params.item);
  console.log(data);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Carousel
        loop
        width={width}
        height={width / 1.8}
        autoPlay={true}
        data={data.imageUrl}
        scrollAnimationDuration={4000}
        // pagingEnabled={true}
        // onSnapToItem={(index) => console.log("current index:", index)}
        renderItem={({ item, index }) => (
          <View
            style={{
              //   flex: 1,
              // borderWidth: 1,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: item }}
              style={{ width: 400, height: 200, borderRadius: 20 }}
            />
          </View>
        )}
      />

      <View
        style={{
          flex: 1,

          width: width,
          backgroundColor: "red",
        }}
      >
        <Text style={styles.heading}>Heading</Text>
        <Text style={styles.location}>Location</Text>
        <Text style={styles.about}>About</Text>
        <Text style={styles.amenities}>Amenities</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    color: "black",
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  about: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  amenities: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default CardDetailScreen;
