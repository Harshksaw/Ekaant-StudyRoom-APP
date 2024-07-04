import { View, Text, Image, TouchableOpacity } from "react-native";

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
  const { user, error, loading } = useUser();
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
          description:
            "Empower your studies. Reserve the perfect library environment.",
          image: require("../../assets/images/Study.png"),
          data: {
            name: "John Doe",
            age: 25,
          },
        },
        {
          key: "2",
          title: "Get started and unlock your study haven.",
          description: "Find nearby study rooms and conquer your workload.",
          image: require("../../assets/images/Study.png"),
          data: {
            name: "John Doe",
            age: 25,
          },
        },
        {
          key: "3",
          title: "Read",
          description:
            "Stress less, study more.Your library booking app is here",
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
            gap: 40,

            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <Image source={item.image} style={{ width: 200, height: 200 }} />
          <View>
            <Text
              style={{
                fontSize: 30,
                fontWeight: "bold",
                margin: 20,
                textAlign: "center",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: "gray",
                textAlign: "center",
                marginVertical: 20,
                marginHorizontal: 15,
              }}
            >
              {item.description}
            </Text>
          </View>

          <View
            style={
              index === 2
                ? {
                    width: "100%",
                    flexDirection: "column-reverse",
                    justifyContent: "center",
                    alignItems: "center",
                  }
                : index === 1
                ? {
                    width: "90%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }
                : index === 3
                ? {
                    // Define styles for index 3 here
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "flex-end",
                    backgroundColor: "blue", // Example style for index 3
                  }
                : {
                    // Default style for other indices (e.g., index 0)
                    flexDirection: "row",

                    alignItems: "center",
                  }
            }
          >
            {index !== 0 && (
              <TouchableOpacity
                style={{ padding: 10, borderRadius: 5 }}
                onPress={() => router.push("/(routes)/welcome")}
              >
                <Text
                  style={{
                    color: "#0077B6",
                    fontSize: 20,
                  }}
                >
                  Skip
                </Text>
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
                text={index === 2 ? "Continue" : index === 1 ? "Next" : "Next"}
                width={
                  index === 2
                    ? responsiveWidth(80)
                    : index === 1
                    ? responsiveWidth(30)
                    : responsiveWidth(30)
                }
                radius={index === 2 ? 80 : index === 1 ? 35 : 10}
                height={index === 2 ? 60 : index === 1 ? 55 : 55}
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
