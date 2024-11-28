import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
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
import useUser from "@/hooks/auth/useUser";
import { ImageBackground } from "expo-image";
import { Image } from "react-native";
import ff from "@/constants/fonts";

const { width, height } = Dimensions.get("screen");

export default function OnBoardingScreen() {
  const { user, error, loading } = useUser();
  // useEffect(() => {
  //   console.log(user, error, loading);
  // }, []);

  // const [assets] = useAssets([
  //   require("../../assets/icons/Slide1.svg"),
  //   require("../../assets/icons/Slide2.svg"),
  //   require("../../assets/icons/Slide3.svg"),
  //   require("../../assets/icons/Slide4.svg"),
  // ]);

  const arr = [
    "https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722596840/assets/z98t3eznkwvgenvmpoxy.png",
    "https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722597025/assets/aihull3sq2a6hsx4dy0h.png",
    "https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722597034/assets/lnnhcojmsp2uw8gazs4m.png",
    "https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722597055/assets/zkh6zr51x1fmgrwai59i.png",
    "https://res.cloudinary.com/dbnnlqq5v/image/upload/v1722597083/assets/cwdjhddyzahxbbp0vaqf.png",
  ];
  const data = [
    {
      key: "1",
      title: "Welcome",
      description: "Explore and reserve library seats across India",
      image: require("../../assets/images/BG.png"),
      mainImg: arr[0],
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
      mainImg: arr[1],
      data: {
        name: "John Doe",
        age: 25,
      },
    },
    {
      key: "3",
      title: "Flexible Plans",
      description: "Stress less, study more.Your library booking app is here",
      mainImg: arr[2],
      image: require("../../assets/images/BG.png"),
      data: {
        name: "John Doe",
        age: 25,
      },
    },
    {
      key: "4",
      title: "Join Now",
      description: "Sign up to unlock seamless library reservations",
      mainImg: arr[3],
      image: require("../../assets/images/Onboarding2.png"),
      data: {
        name: "John Doe",
        age: 25,
      },
    },
  ];
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
      <Carousel
        paginationConfig={{
          dotSize: 8.86,
          activeColor: "rgba(0, 119, 182, 1)",
          color: "#6FC8E2",
          bottomOffset: height * 0.43,
          activeDotStyle: {
            width: 23,
            height: 8.86,
            left: -10,
          },
          dotSpacing: 20,
        }}
        data={data}
        buttonsConfig={{
          disabled: true,
        }}
        renderItem={({ item, index }, goToSlide) => {
          return (
            <ImageBackground
              style={{
                flex: 1,
                width: "100%",
                backgroundColor: "red",
              }}
              source={item?.image}
            >
              <View
                style={{
                  flex: 1,
                  paddingVertical: height * 0.15,
                }}
              >
                <Image
                  source={{ uri: item?.mainImg }}
                  style={{
                    width: width * 0.8,
                    height: width * 0.8,
                    alignSelf: "center",
                  }}
                />

                <View
                  style={{
                    marginTop: height * 0.1,
                    alignSelf: "center",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 35,
                      textAlign: "center",
                      width: width * 0.7,
                      fontFamily: ff.deckBold,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: 25,
                      color: "background: rgba(0, 0, 0, 1)",
                      fontStyle: "normal",
                      lineHeight: 28,
                      textAlign: "center",
                      fontWeight: 400,
                      marginVertical: 8,
                      width: width * 0.7,
                      fontFamily: ff.textMedium,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection:
                      index !== 0 && index !== 3 ? "row" : "column",
                    justifyContent: "space-between",
                    width: "90%",
                    marginTop: height * 0.04,
                    alignSelf: "center",
                  }}
                >
                  {index !== 0 && index !== 3 && (
                    <TouchableOpacity
                      style={{ padding: 20, borderRadius: 5 }}
                      onPress={() => router.push("/(routes)/welcome")}
                    >
                      <Text
                        style={{
                          color: "#000000",
                          fontSize: 20,
                          fontFamily: ff.deckBold,
                        }}
                      >
                        Skip
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={{ alignSelf: "center" }}
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
                          ? width * 0.75
                          : responsiveWidth(30)
                      }
                      radius={index === 3 ? 80 : index === 0 ? 10 : 80}
                      height={55}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          );
        }}
      />
    </SafeAreaView>
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
