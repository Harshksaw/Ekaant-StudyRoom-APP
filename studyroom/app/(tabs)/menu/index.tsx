import SvgComponent from "@/assets/svg";
import { View, StyleSheet } from "react-native";

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <SvgComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F4F8",
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
