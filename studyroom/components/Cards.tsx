import { View, Text, Image, FlatList, StyleSheet } from "react-native";

const Cards = ({ item }) => (
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
);

const styles = StyleSheet.create({
  
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

export default Cards;
