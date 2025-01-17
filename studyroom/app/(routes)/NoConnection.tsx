import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { h, w } from "@/constants/size";
import ff from "@/constants/fonts";
import * as Updates from "expo-updates";
import { SafeAreaView } from "react-native-safe-area-context";

const NoConnection = () => {
  const [loader, setLoader] = useState<boolean>(true);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setLoader(true);
    }, 500);

    return clearTimeout(timeOut);
  }, []);

  if (loader) {
    return (
      <View style={{ flex: 1 }}>
        <ActivityIndicator size={"large"} color={"#0077B6"} />
      </View>
    );
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 20,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [translateY]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar backgroundColor={"#fff"} translucent={false} />
      <View
        style={{
          backgroundColor: "#fff",
          flex: 1,
          alignItems: "center",
          paddingTop: h(30),
        }}
      >
        <View
          style={{ flexDirection: "row", alignItems: "center", gap: w(10) }}
        >
          <Image
            source={require("@/assets/images/Study.png")}
            style={{ width: w(50), height: w(50) }}
          />

          <Text
            style={{ fontSize: w(35), fontFamily: ff.textBold, color: "#000" }}
          >
            EKAANT
          </Text>
        </View>

        <Animated.Image
          source={require("@/assets/images/cloud.png")}
          style={{ transform: [{ translateY }] }}
        />

        <Text
          style={{
            fontSize: w(50),
            fontFamily: ff.textBold,
            color: "#000",
            marginTop: h(-20),
          }}
        >
          Oops..
        </Text>
        <Text
          style={{
            fontSize: w(14),
            width: "60%",
            fontFamily: ff.textMedium,
            color: "#000",
            textAlign: "center",
            marginTop: h(10),
          }}
        >
          There is a connection error. Please check your internet and try again.
        </Text>
        <TouchableOpacity
          style={{
            bottom: 0,
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#0077B6",
            borderRadius: 3,
            marginBottom: h(12),
            width: "80%",
            overflow: "hidden",
            marginTop: h(30),
          }}
          onPress={() => {
            console.log("ret");

            Updates.reloadAsync();
          }}
        >
          <Text
            style={{
              alignItems: "center",
              padding: w(10),
              borderRadius: 20,
              fontSize: w(16),
              fontFamily: ff.deckSemiBold,
              color: "#fff",
              letterSpacing: 1,
            }}
          >
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NoConnection;
