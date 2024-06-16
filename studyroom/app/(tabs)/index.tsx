import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native";

export default function index() {
  const data = [
    {
      id: 1,
      title: "Card 1",
      about: "About Card 1",
      ratings: 4.5,
      distance: "2 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 2,
      title: "Card 2",
      about: "About Card 2",
      ratings: 3.8,
      distance: "5 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 3,
      title: "Card 3",
      about: "About Card 3",
      ratings: 4.2,
      distance: "3 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 4,
      title: "Card 4",
      about: "About Card 4",
      ratings: 4.0,
      distance: "1 mile",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 5,
      title: "Card 5",
      about: "About Card 5",
      ratings: 4.7,
      distance: "10 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 6,
      title: "Card 6",
      about: "About Card 6",
      ratings: 3.5,
      distance: "7 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 7,
      title: "Card 7",
      about: "About Card 7",
      ratings: 4.9,
      distance: "3 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
    {
      id: 8,
      title: "Card 8",
      about: "About Card 8",
      ratings: 4.3,
      distance: "5 miles",
      imageUrl:
        "https://img.traveltriangle.com/blog/wp-content/uploads/2023/06/PTV-India-Cover-Final.png",
    },
  ];
  // return <HomeScreen />;
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: 100, height: 100 }}
      />

      <View
        style={{
          marginHorizontal: 10,
          flexDirection: "column",
          flex: 1,
          // justifyContent: "space-between",
          backgroundColor: "red",
        }}
      >
        <Text>{item.title}</Text>
        <Text>{item.about}</Text>
        <View>
          <Text>{item.ratings}</Text>
          <Text>{item.distance}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView>
      <View style={styles.header}></View>
      <View style={styles.welcome}>
        <Text>Welcome</Text>
      </View>
      <View style={styles.carousel}></View>
      <View style={styles.filters}></View>

      <ScrollView style={styles.listings}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "blue",
  },
  welcome: {
    height: 100,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
  },
  carousel: {
    height: 200,
    backgroundColor: "yellow",
  },
  filters: {
    flexDirection: "row",
    height: 50,
    backgroundColor: "orange",
  },
  listings: {
    backgroundColor: "red",
  },
  card: {

    margin:20,
    backgroundColor: "white",

    flexDirection: "row",

    // marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    // justifyContent: "flex-start",
    alignItems: "center",
  },
});
