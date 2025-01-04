import React from "react";
import {
  Link,
  Stack,
  router,
  useFocusEffect,
  useNavigation,
} from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  BackHandler,
} from "react-native";
import { useEffect } from "react";

import { useAssets } from "expo-asset";
import Button from "@/components/Button";
import { Image, ImageBackground } from "expo-image";

import {
  useFonts,
  Poppins_100Thin,
  Poppins_100Thin_Italic,
  Poppins_200ExtraLight,
  Poppins_200ExtraLight_Italic,
  Poppins_300Light,
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_600SemiBold_Italic,
  Poppins_700Bold,
  Poppins_700Bold_Italic,
  Poppins_800ExtraBold,
  Poppins_800ExtraBold_Italic,
  Poppins_900Black,
  Poppins_900Black_Italic,
} from "@expo-google-fonts/poppins";
import ff from "@/constants/fonts";
import { vw } from "@/constants/size";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Home() {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    Poppins_100Thin,
    Poppins_100Thin_Italic,
    Poppins_200ExtraLight,
    Poppins_200ExtraLight_Italic,
    Poppins_300Light,
    Poppins_300Light_Italic,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_600SemiBold_Italic,
    Poppins_700Bold,
    Poppins_700Bold_Italic,
    Poppins_800ExtraBold,
    Poppins_800ExtraBold_Italic,
    Poppins_900Black,
    Poppins_900Black_Italic,
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);
  const [assets] = useAssets([
    require("../../assets/images/EKAANT.png"),
    require("../../assets/images/EkaantWelcom.png"),
  ]);

  const backAction = () => {
    BackHandler.exitApp();

    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
      return () => backHandler.remove();
    }, [backAction])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.text}>
          Study Anywhere & Anytime{" "}
          <Text
            style={{
              color: "#0077B6",
            }}
          >
            Book Your Seat
          </Text>{" "}
          Now
        </Text>

        <View
          style={{
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
          }}
        >
          <Image
            source={{
              uri: "https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722597055/assets/zkh6zr51x1fmgrwai59i.png",
            }}
            contentFit="contain"
            style={{
              width: vw * 0.7,
              height: vw * 0.7,
            }}
          />
          <Image
            source={{
              uri: "https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722597083/assets/cwdjhddyzahxbbp0vaqf.png",
            }}
            style={{
              width: vw * 0.8,
              height: 60,
              marginTop: 10,
            }}
          />
        </View>

        <Text style={styles.text2}>
          Reserve library spaces across India with ease
        </Text>
      </View>

      <View style={styles.view2}>
        <View style={styles.buttonBox}>
          <TouchableOpacity onPress={() => router.push("/(routes)/login")}>
            <Button width={300} text="Get Started" height={60} fontSizeR={22} />
          </TouchableOpacity>
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
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
  },
  text: {
    color: "#000000",
    fontSize: 30,
    fontFamily: ff.deckBold,
    marginTop: 25,
    lineHeight: 37,
    textAlign: "center",
    width: vw * 0.8,
  },
  text2: {
    fontSize: 20,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
    fontFamily: ff.deckRegular,
    width: vw * 0.7,
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
    marginVertical: 10,

    // backgroundColor: "#007AFF",
    textAlign: "center",
    alignItems: "center",
    fontSize: 20,
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
    color: "#000",
    fontSize: 22,
    marginVertical: 10,
    fontFamily: ff.deckBold,
  },
});
