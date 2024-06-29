import { View, Text, Image, TouchableOpacity } from "react-native";
// import { useFonts, Raleway_700Bold } from "@expo-google-fonts/raleway";
// import { Nunito_400Regular, Nunito_700Bold } from "@expo-google-fonts/nunito";

import { router } from "expo-router";
import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Button from "@/components/Button";

import Carousel from "react-native-intro-carousel";
import { useEffect } from "react";
import useUser from "@/hooks/auth/useUser";

export default function OnBoardingScreen() {

  const {user,error, loading } = useUser();
  useEffect(() => {
    console.log(user, error, loading);
  }, []);
  // let [fontsLoaded, fontError] = useFonts({
  //   Raleway_700Bold,
  //   Nunito_400Regular,
  //   Nunito_700Bold,
  // });

  // if (!fontsLoaded && !fontError) {
  //   return null;
  // }

  //   return (
  //     <LinearGradient
  //       colors={["#E5ECF9", "#F6F7F9"]}
  //       style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
  //     >
  //       <View style={styles.firstContainer}>
  //         <View>
  //           <Image
  //             style={{
  //               width: responsiveWidth(70),
  //               height: responsiveHeight(55),
  //               marginBottom: responsiveHeight(5),
  //               marginTop: responsiveHeight(-15),
  //               resizeMode: "contain",
  //             }}
  //             source={require("../../assets/images/Study.png")}
  //           />
  //         </View>

  //         {/* <Button text={"Get Started"} width={responsiveWidth(60)} /> */}
  //       </View>
  //     </LinearGradient>
  //   );

  return (
    <Carousel
      data={[
        {
          key: "1",
          title: "Welcome",
          description: "This is a cool package lorem ipsum",
          image: require("../../assets/images/Study.png"),
          data: {
            name: "John Doe",
            age: 25,
          },
        },
        {
          key: "2",
          title: "loremp ipsum lorem ipsum ",
          description: "This is a cool package lorem ipsum 2 lorem ipsume",
          image: require("../../assets/images/Study.png"),
          data: {
            name: "John Doe",
            age: 25,
          },
        },
        {
          key: "3",
          title: "Read",
          description: "This is a cool package lorem ipsum 3",
          image: require("../../assets/images/Study.png"),
          data: {
            name: "John Doe",
            age: 25,
          },
        },
      ]}
      buttonsConfig={{
        disabled: true,
      }}
      renderItem={({ item, index }, goToSlide) => (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",

            width: "90%",
          }}
        >
          <Image source={item.image} style={{ width: 200, height: 200 }} />

          <Text style={{ fontSize: 36, fontWeight: "bold", margin: 20 }}>
            {item.title}
          </Text>
          <Text style={{ fontSize: 16, color: "gray" }}>
            {item.description}
          </Text>

          <View
            style={
              index === 2
                ? {
                    flexDirection: "column-reverse",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }
            }
          >
            {index !== 0 && (
              <TouchableOpacity
                style={{ padding: 10, borderRadius: 5 }}
                onPress={() => router.push("/(routes)/welcome")}
              >
                <Button text="skip" width={responsiveWidth(20)} />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                padding: 10,
                borderRadius: 5,
                marginLeft: 10,
              }}
              // {index === 2 && router.push("/(routes)/welcome")  }
              onPress={() => {
                if (index === 2) {
                  router.push("/(routes)/welcome");
                } else {
                  goToSlide(index + 1);
                }
              }}
            >
              <Button
                text={index === 2 ? "Get Started" : "Next"}
                width={index === 2 ? responsiveWidth(60) : responsiveWidth(40)}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    />
  );
}
const styles = StyleSheet.create({
  firstContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  logo: {
    width: wp("23%"),
    height: hp("10%"),
  },
  titleWrapper: {
    flexDirection: "row",
  },
  titleTextShape1: {
    position: "absolute",
    left: -28,
    top: -20,
  },
  titleText: {
    fontSize: hp("4%"),
    textAlign: "center",
  },
  titleTextShape2: {
    position: "absolute",
    right: -40,
    top: -20,
  },
  titleShape3: {
    position: "absolute",
    left: 60,
  },
  dscpWrapper: {
    marginTop: 30,
  },

  dscpText: {
    textAlign: "center",
    color: "#575757",
    fontSize: hp("2%"),
  },
  buttonWrapper: {
    //   backgroundColor: "#2467EC",
    width: wp("32%"),

    paddingVertical: 18,
    borderRadius: 20,
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  welcomeButtonStyle: {
    backgroundColor: "#2467EC",
    width: responsiveWidth(88),
    height: responsiveHeight(5.5),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
});
