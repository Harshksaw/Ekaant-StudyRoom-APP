import React from "react";
import { Link, Stack, router, useNavigation } from "expo-router";
import { View, Text, StyleSheet, Image, TouchableOpacity ,SafeAreaView} from "react-native";
import { useEffect } from "react";


import { useAssets } from "expo-asset";
import Button from "@/components/Button";

export default function Home() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [assets] = useAssets([
    require("../../assets/images/EKAANT.png"),
    require("../../assets/images/EkaantWelcom.png"),
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.text}>
          Study Anywhere & Anytime{" "}
          <Text style={{ fontWeight: "bold", color: "#0077B6" }}>
            Book Your Seat
          </Text>{" "}
          Now
        </Text>

        {assets  && assets[1] && <Image
        style={{
          width: 250,
          height: 250,
        
        }}
        source={assets[1]} />}
        {assets && <Image
           style={{
            width: 300,
            height: 50,
          
          }}
        source={assets[0]} />}
        <View
          style={{
            paddingHorizontal: 20,
          }}
        >
          <Text style={styles.text2}>
            Reserve library spaces across India with ease
          </Text>
        </View>
      </View>

      <View style={styles.view2}>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={() => router.push("/(routes)/signup")}>
            <Button
            width={250}
            text="Get Started"
            />
          </TouchableOpacity>
          {/* <linearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.buttonBox}> */}
        </View>
        {/* </linearGradient> */}
        <Text style={styles.orText}>Or</Text>

        <View style={{}}>
          <Link href={{ pathname: "login" }}>
            <Text
              style={{
                color: "#0077B6",
                fontSize: 25,
                lineHeight: 30,
                fontWeight: "400",
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
    paddingHorizontal: 10,
    justifyContent: "space-around",

    alignItems: "center",
  },
  view2: {
    height: "20%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap:0
  },
  text: {
    color: "#000000",

    fontSize: 26,
    fontWeight: "700",

    lineHeight: 39,
    textAlign: "center",
  },
  text2: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
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

    // backgroundColor: "#007AFF",
    textAlign: "center",
    alignItems: "center",
    borderRadius: 20,
    // paddingVertical: 12,
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
