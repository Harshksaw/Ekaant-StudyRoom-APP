import React from "react";
import { Link, Stack, useNavigation } from "expo-router";
import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import { useEffect } from "react";


import { useAssets } from "expo-asset";

import { useSelector } from "react-redux";
export default function Home() {
  const navigation = useNavigation();

  // useEffect(() => {
  //   navigation.setOptions({ headerShown: false });


  // }, [navigation]);

  const userDetails = useSelector((state: any) => state.user);


  const userData = JSON.parse(userDetails?.details)?.user;
  console.log("🚀 ~ Home ~ userData:", userData)

  const [assets] = useAssets([
    require("../../assets/images/EKAANT.png"),
    require("../../assets/images/EkaantWelcom.png"),
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit{" "}
          <Text style={{ fontWeight: "bold", color: "red" }}>{userData}</Text> amet.
        </Text>

        {assets && <Image width={100} height={100} source={assets[1]} />}
        {assets && <Image source={assets[1]} width={100} height={100} />}

        <Text style={styles.text2}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste,
          sapiente?
        </Text>
      </View>

      <View style={styles.view2}>
        {/* <View style={styles.buttonBox}> */}

        {/* <linearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.buttonBox}> */}

        <Text style={styles.buttonText}>Get started</Text>
        {/* </linearGradient> */}
        {/* </View> */}
        <Text style={styles.orText}>or</Text>
        <View style={{}}>
          <Link href={{ pathname: "welcome" }}>
            <Text style={styles.buttonText}>Login</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view1: {
    height: "80%",
    width: "100%",
    paddingHorizontal: 30,
    justifyContent: "space-around",
    alignItems: "center",
  },
  view2: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {

    fontWeight: "700",
    fontSize: 30,
    lineHeight: 45,
    textAlign: "center",
  },
  text2: {

    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonBox: {
    width: "80%",
    height: 50,

    backgroundColor: "#007AFF",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  orText: {
    color: "#8E8E93",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
  },
});
