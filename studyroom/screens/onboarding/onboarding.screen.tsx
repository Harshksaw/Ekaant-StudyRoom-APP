import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  Platform,
} from "react-native";
import { router } from "expo-router";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import Button from "@/components/Button";
import { ImageBackground } from "expo-image";
import ff from "@/constants/fonts";
import { h, vh, vw } from "@/constants/size";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Slider from "@/components/Slider";
import { TextOptions } from '../../node_modules/@types/istanbul-reports/index.d';

const { width, height } = Dimensions.get("screen");
const isTablet = Platform.OS === 'ios' && (width >= 768 );

export default function OnBoardingScreen() {
  const scale = useSharedValue(0);
  const offset: any = useSharedValue({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    scale.value = withTiming(0, { duration: 0 });
    offset.value = withTiming({ x: 100, y: 100 }, { duration: 0 });
    setTimeout(() => {
      scale.value = withTiming(1, { duration: 700 });
      offset.value = withTiming({ x: 0, y: 0 }, { duration: 700 });
    }, 200);
  }, [active]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: offset.value.x },
      { translateY: offset.value.y },
    ],
  }));

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
    <SafeAreaView style={{ flex: 1 }}>
      <Slider
        paginationConfig={{
          dotSize: 8.86,
          activeColor: "rgba(0, 119, 182, 1)",
          color: "#6FC8E2",
          bottomOffset: h(330),
          activeDotStyle: {
            width: 23,
            height: 8.86,
            left: -7,
          },
          dotSpacing: 20,
          animated: true,
          dotIncreaseSize: 1.2,
        }}
        setChanged={() => setActive(!active)}
        data={data}
        buttonsConfig={{
          disabled: true,
        }}
        renderItem={({ item, index }, goToSlide) => {
          return (
            <ImageBackground
              style={{
                width: isTablet ? width : vw,
                height: isTablet ? height : vh,
              }}
              source={item?.image}
            >
              <View
                style={{
                  flex: 1,
                  paddingVertical: height * (isTablet ? 0.1 : 0.15),
                }}
              >
                <Animated.Image
                  source={{ uri: item?.mainImg }}
                  style={[
                    {
                      width: isTablet ? width * 0.6 : width * 0.8,
                      height: isTablet ? width * 0.6 : width * 0.8,
                      alignSelf: "center",
                    },
                    animatedStyle,
                  ]}
                />

                <View
                  style={{
                    marginTop: height * (isTablet ? 0.08 : 0.1),
                    alignSelf: "center",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: isTablet ? 40 : 35,
                      textAlign: "center",
                      width: width * (isTablet ? 0.6 : 0.7),
                      fontFamily: ff.deckBold,
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={{
                      fontSize: isTablet ? 30 : 25,
                      color: "rgba(0, 0, 0, 1)",
                      fontStyle: "normal",
                      lineHeight: isTablet ? 32 : 28,
                      textAlign: "center",
                      fontWeight: "400",
                      marginVertical: 8,
                      width: width * (isTablet ? 0.6 : 0.7),
                      fontFamily: ff.textMedium,
                    }}
                  >
                    {item.description}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: index !== 0 && index !== 3 ? "row" : "column",
                    justifyContent: "space-between",
                    width: "90%",
                    marginTop: height * (isTablet ? 0.08 : 0.04),
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
                          fontSize: isTablet ? 24 : 20,
                          fontFamily: ff.deckBold,
                        }}
                      >
                        Skip
                      </Text>
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity

                    style={{ alignSelf: "center", overflow: "hidden" }}
                    onPress={() => {
                      if (index === 3) {
                        router.push("/(routes)/welcome");
                      } else {
                        goToSlide(index + 1);
                      }
                    }}
                  >
                    <Button

                      text={index === 3 ? "Continue" : "Next"}
                
                      width={
                        index === 0 || index === 3
                          ? width * (isTablet ? 0.6 : 0.75)
                          : responsiveWidth(30)
                      }
                      radius={index === 3 ? 80 : index === 0 ? 10 : 80}
                      height={isTablet ? 100 : 60}
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
    width: wp("32%"),
    paddingVertical: 16,
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