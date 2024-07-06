import {
  View,
  Text,

  TouchableOpacity,
  SafeAreaView,
} from "react-native";

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
import { Image, ImageBackground } from "expo-image";
import { useAssets } from "expo-asset";

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
  const [assets] = useAssets([
    require("../../assets/icons/Slide1.svg"),
    require("../../assets/icons/Slide2.svg"),
    require("../../assets/icons/Slide3.svg"),
    require("../../assets/icons/Slide4.svg"),
  ]);
  return (
    <Carousel
      data={[
        {
          key: "1",
          title: "Welcome",
          description:
            "Explore and reserve library seats across India",

          image: require("../../assets/images/BG.png"),
          data: {
            name: "John Doe",
            age: 25,
          },
        },
        {
          key: "2",
          title: "Easy Booking",
          description: "Find nearby study rooms and conquer your workload.",

          image: require("../../assets/images/Onboarding2.png"),
          data: {
            name: "John Doe",
            age: 25,
          },
        },
        {
          key: "3",
          title: "Flexible Plans",
          description:
            "Stress less, study more.Your library booking app is here",

          image: require("../../assets/images/BG.png"),
          data: {
            name: "John Doe",
            age: 25,
          },
        },
        {
          key: "4",
          title: "Join Now",
          description:
            "Sign up to unlock seamless library reservations",

          image: require("../../assets/images/Onboarding2.png"),
          data: {
            name: "John Doe",
            age: 25,
          },
        },
      ]}
      buttonsConfig={{
        disabled: true,
      }}
      renderItem={({ item, index }, goToSlide) => {
        // Define a variable to hold custom styles or components based on item.key
        let customStyles = {};
        let CustomComponent = null;

        // Apply conditions based on item.key
        switch (item?.key) {
          case "1":
            customStyles = { backgroundColor: "blue" }; // Example style for key 1
            CustomComponent = <Text></Text>;
            break;
          case "2":
            customStyles = { backgroundColor: "green" }; // Example style for key 2
            CustomComponent = <Text></Text>;
            break;
          case "3":
            customStyles = { backgroundColor: "yellow" }; // Example style for key 3
            CustomComponent = <Text></Text>;
            break;
          case "4":
            customStyles = { backgroundColor: "red" }; // Example style for key 4
            CustomComponent = <Text></Text>;
            break;
          default:
            customStyles = { backgroundColor: "white" }; // Default style
            CustomComponent = <Text>Default Slide Feature</Text>; // Default component
        }

        return (
          <SafeAreaView
            style={{
              flex: 1,
              width: "100%",
              // alignItems: "center",
              // justifyContent: "center",
              // gap: 40,

              // backgroundColor: "red",
              // paddingHorizontal: 10,
              zIndex: 1,
            }}
          >
            {/* //backgorudnImage */}
            <ImageBackground
              style={{
                flex: 1,
                zIndex: 1,
              }}
              source={item?.image}
            />

            <View
              style={{
                flex: 1,
                zIndex: 2,
                position: "absolute",
                backgroundColor: "transparent",

                alignItems: "center",
                justifyContent: "center",
                // gap: 40,

                width: "100%",
                height: "100%",

              }}
            >

              {/* //image */}
                <View>

                {assets && assets[0] && (
                  <ImageBackground source={assets[item?.key -1]}
                  style={{
                    width: 300,
                    height: 300,
                  }}
                  />
                )}

                </View>

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
                    color: "background: rgba(0, 0, 0, 1)",


                    lineHeight:30,
                    textAlign: "center",
                    fontWeight:400,
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
                      width: "90%",
                      flexDirection: "row",
                      justifyContent: "space-between",
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

                      }
                    : {
                        // Default style for other indices (e.g., index 0)
                        flexDirection: "row",

                        alignItems: "center",
                      }
                }
              >
                {index !== 0  &&  index !== 3 && (
                  <TouchableOpacity
                    style={{ padding: 20, borderRadius: 5 }}
                    onPress={() => router.push("/(routes)/welcome")}
                  >
                    <Text
                      style={{
                        color: "#000000",
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
                    if (index === 3) {
                      router.push("/(routes)/welcome");
                    } else {
                      goToSlide(index + 1);
                    }
                  }}
                >
                  <Button
                    text={
                      index === 3 ? "Continue" : index === 1 ? "Next" : "Next"
                    }
                    width={
                      index === 0 || index === 3 
                        ? responsiveWidth(80)
                      
                        : responsiveWidth(30)
                    }
                    radius={index === 3 ? 80 : index === 0 ? 10 : 80}
                    height={55}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        );
      }}
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
