import { router } from "expo-router";
import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NetInfo from "@react-native-community/netinfo";

const Splash = () => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );
  useEffect(() => {
    // Simulate a delay to show the splash screen
    const timer = setTimeout(() => {
      router.dismissAll();
      NetInfo.fetch().then((state) => {
        if (!state.isConnected) {
          router.replace("/(routes)/NoConnection");
        } else {
          router.replace(isAuthenticated ? "/(tabs)" : "(routes)/onboarding");
        }
      });
    }, 3000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/animSplash.gif")}
        style={styles.gif}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0077B6", // Match your splash background color
  },
  gif: {
    width: "100%",
    height: "100%",
    resizeMode: "contain", // To maintain the aspect ratio of the GIF
  },
});

export default Splash;
