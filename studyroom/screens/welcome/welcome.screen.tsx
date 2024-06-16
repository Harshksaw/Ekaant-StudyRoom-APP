import React from "react";
import { Link, Stack, router, useNavigation } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useEffect } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { useAssets } from "expo-asset";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [assets] = useAssets([
    require("../../assets/images/EKAANT.png"),
    require("../../assets/images/react-logo.png"),
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit{" "}
          <Text style={{ fontWeight: "bold", color: "red" }}>harsh</Text> amet.
        </Text>

        {assets && <Image width={100} height={100} source={assets[1]} />}
        {assets && <Image source={assets[0]} />}

        <Text style={styles.text2}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste,
          sapiente?
        </Text>
      </View>

      <View style={styles.view2}>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={() => router.push("/(routes)/signup")}>
            <Text style={styles.buttonText}>Get started</Text>
          </TouchableOpacity>
          {/* <linearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.buttonBox}> */}
        </View>
        {/* </linearGradient> */}
        <Text style={styles.orText}>or</Text>

        <View style={{}}>
          <Link href={{ pathname: "login" }}>
            <Text
              style={{
                color: "#007AFF",
                fontSize: 25,
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Login
            </Text>
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
    fontFamily: "Poppins",
    fontWeight: "700",
    fontSize: 30,
    lineHeight: 45,
    textAlign: "center",
  },
  text2: {
    fontFamily: "Poppins",
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

// import React from 'react';
// import { View, Text, StyleSheet, Image } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

// const  WelcomeScreen = () => {
//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.view1}>
//                 <Text style={styles.text}>View 1</Text>
//                 {/* <Image/> */}
//                 <Text style={styles.text2}>View 1</Text>
//             </View>
//             <View style={styles.view2}>
//                 <Text style={styles.text}>View 2</Text>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: 'black',

//         // flexDirection: 'column-reverse',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     view1: {

//         height: '80%',
//         width:'100%',
//         backgroundColor: 'red',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     view2: {
//         height: '20%',

//         // height: 100,
//         width:'100%',
//         backgroundColor: 'blue',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     text: {
//         color: 'white',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
// });
// export default WelcomeScreen;
