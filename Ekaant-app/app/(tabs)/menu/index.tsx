import SvgComponent from "@/assets/svg";
import ff from "@/constants/fonts";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ComingSoon = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 0,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          borderBottomWidth: 1.5,
          paddingBottom: 5,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontFamily: ff.displayBlack,
            color: "black",
            textDecorationStyle: "solid",
            marginTop: 20,
            marginLeft: 30,
          }}
        >
          Menu
        </Text>
      </View>
      <View style={styles.container}>
        <SvgComponent />
        <Text
          style={{
            fontSize: 25,
            fontFamily: ff.displayMedium,
            color: "black",
            textDecorationStyle: "solid",
            marginTop: 20,
            marginLeft: 30,
            position: "absolute",
            top: "65%",
          }}
        >
          Stay tuned for exciting updates!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#3E4A59",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#7D8D9C",
    marginBottom: 30,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  countdownContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  countdownText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FF6F61",
    marginHorizontal: 10,
  },
  footer: {
    fontSize: 16,
    color: "#7D8D9C",
    fontStyle: "italic",
  },
});

export default ComingSoon;
