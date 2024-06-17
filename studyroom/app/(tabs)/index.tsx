import {
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

export default function index() {
  const width = Dimensions.get("window").width;
  const data = [
    {
      id: 1,
      title: "Card 1",
      about: "About Card 1lo lroem ipsum mono",
      ratings: 4.5,
      distance: "2 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 2,
      title: "Card 2",
      about: "About Card 2lo lroem ipsum mono",
      ratings: 3.8,
      distance: "5 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 3,
      title: "Card 3",
      about: "About Card 3lo lroem ipsum mono",
      ratings: 4.2,
      distance: "3 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 4,
      title: "Card 4",
      about: "About Card 4lo lroem ipsum mono",
      ratings: 4.0,
      distance: "1 mile",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 5,
      title: "Card 5",
      about: "About Card 5lo lroem ipsum mono",
      ratings: 4.7,
      distance: "10 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 6,
      title: "Card 6",
      about: "About Card 6lo lroem ipsum mono",
      ratings: 3.5,
      distance: "7 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 7,
      title: "Card 7",
      about: "About Card 7lo lroem ipsum mono",
      ratings: 4.9,
      distance: "3 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 8,
      title: "Card 8",
      about: "About Card 8lo lroem ipsum mono",
      ratings: 4.3,
      distance: "5 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 9,
      title: "Card 9",
      about: "About Card 9lo lroem ipsum mono",
      ratings: 4.1,
      distance: "8 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 10,
      title: "Card 10",
      about: "About Card 1lo lroem ipsum mono0",
      ratings: 4.6,
      distance: "4 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 11,
      title: "Card 11",
      about: "About Card 1lo lroem ipsum mono1",
      ratings: 3.9,
      distance: "6 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 12,
      title: "Card 12",
      about: "About Card 1lo lroem ipsum mono2",
      ratings: 4.8,
      distance: "9 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 13,
      title: "Card 13",
      about: "About Card 1lo lroem ipsum mono3",
      ratings: 4.4,
      distance: "3 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 14,
      title: "Card 14",
      about: "About Card 1lo lroem ipsum mono4",
      ratings: 4.2,
      distance: "7 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 15,
      title: "Card 15",
      about: "About Card 1lo lroem ipsum mono5",
      ratings: 4.7,
      distance: "5 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
  ];

  const filters = [
    { id: 1, name: "Filter 1" },
    { id: 2, name: "Filter 2" },
    { id: 3, name: "Filter 3" },
  ];

  // return <HomeScreen />;
  const renderItem = ({ item }) => (

    <TouchableOpacity
    onPress={() =>
      router.push({
        pathname: "/(routes)/card-details",
        params: { item: JSON.stringify(item) },
      })
    }
    >

    
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageUrl }}
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
          <Text>{item.title}</Text>
          <Text>{item.about}</Text>
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
          <Text>{item.ratings}********</Text>
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
      <Header/>
      <View style={styles.welcome}>
        <View></View>

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
        {filters.map((filter) => (
          <TouchableOpacity
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
        {data && data.map((item) => renderItem({ item }))}

        {data?.length === 0 && (
          <Text
            style={{ textAlign: "center", paddingTop: 50, fontSize: 18 }}
          >
            No data available!
          </Text>
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
