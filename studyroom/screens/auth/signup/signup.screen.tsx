import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView,
} from "react-native";

import { AntDesign, Entypo, Fontisto, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useRef, useState } from "react";

import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import { BACKEND } from "@/utils/config";
import Button from "@/components/Button";
import { Toast } from "react-native-toast-notifications";
import { h, w } from "@/constants/size";
import ff from "@/constants/fonts";
import { maskPhoneNumber } from "../login/login.screen";

export default function SignUpScreen() {
  const [buttonSpinner, setButtonSpinner] = useState(false);

  const [showOtp, setShowOtp] = useState(false);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: 0,
    password: "",
  });

  const [required, setRequired] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const otpRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (newOtp.join("").length === 4) {
      verifyOtp(newOtp.join(""));
    }
    // Move to next input if value is entered
    if (value && index < otp.length - 1) {
      otpRefs.current[index + 1].focus();
    }

    // Move to previous input if value is deleted
    if (!value && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("🚀 ~ pickImage ~ result:", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const sendOtp = async () => {
    if (
      !userInfo.email ||
      !userInfo.name ||
      !userInfo.password ||
      !userInfo.phone
    ) {
      Toast.show("Fill all feilds to proceed", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
      return;
    }
    try {
      setButtonSpinner(true);
      const response = await axios.post(`${BACKEND}/api/v1/auth/otp`, {
        phoneNumber: userInfo.phone,
      });
      setShowOtp(true);
      setButtonSpinner(false);
    } catch (error) {
      Toast.show("Registration failed", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
      console.log(error?.response?.data);
      setButtonSpinner(false);
    }
  };

  const verifyOtp = async (textOtp?: string) => {
    const otpValue = textOtp ?? otp.join("");

    try {
      let response = await axios.post(`${BACKEND}/api/v1/auth/verifyOtp`, {
        phoneNumber: userInfo.phone,
        otp: otpValue,
      });

      if (response.status == 200) {
        handleSignUp(true);
      }
    } catch (error) {
      Toast.show(error?.message ?? "something went wrong", {
        type: "danger",
        duration: 2000,
        placement: "top",
        style: {
          backgroundColor: "green",
          borderRadius: 10,
          padding: 10,
          marginTop: 50,
        },
      });
    }
  };

  //signup api
  const handleSignUp = async (verified = true) => {
    if (!verified) {
      Toast.show("Please verify OTP", {
        type: "danger",
        duration: 3000,
        placement: "top",
        style: {
          backgroundColor: "red",
          borderRadius: 10,
          padding: 10,
          marginTop: 50,
        },
      });
      return;
    }

    setButtonSpinner(true);

    let formData = new FormData();

    try {
      if (image) {
        formData.append("image", {
          uri: image,
          name: "image.jpg", // Replace with desired filename
          type: "image/jpeg", // Replace with correct image type
        });
      }

      // Append other user info to formData
      formData.append("username", userInfo.name);
      formData.append("email", userInfo.email);
      formData.append("password", userInfo.password);
      formData.append("phoneNumber", userInfo.phone.toString()); // Ensure phone is a string
      formData.append("accountType", "User");

      const response = await axios.post(
        `${BACKEND}/api/v1/auth/signup`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status == 200 || 201) {
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(response.data.token)
        );
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));
        setButtonSpinner(false);
        Toast.show("Account created successfully", {
          type: "success",
          duration: 3000,
          placement: "top",
          style: {
            backgroundColor: "green",
            borderRadius: 10,
            padding: 10,
            marginTop: 50,
          },
        });

        if (buttonSpinner) {
          setButtonSpinner(false);
        }
        router.dismissAll();
        router.replace("/(tabs)");
        // router.push("/(tabs)");
      }
    } catch (error) {
      setButtonSpinner(false);
      console.log(error);

      Toast.show("An error occured", {
        type: "danger",
      });
    }
  };
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#fff",
        },
        styles.container,
      ]}
    >
      <ScrollView
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 60,
        }}
      >
        <View style={styles.signInImage}>
          <Image
            source={require("../../../assets/icons/bubble2.png")}
            style={styles.backgroundObject}
            resizeMode="contain"
          />
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              marginTop: h(100),
              width: "100%",
              zIndex: 1,
            }}
          >
            <Text
              style={{
                fontSize: w(40),
                fontFamily: ff.displayBlack,
                letterSpacing: 1.5,
                left: -w(50),
              }}
            >
              Create{"\n"}Account
            </Text>

            <TouchableOpacity
              onPress={pickImage}
              style={{
                width: 100,
                height: 100,
                left: -w(50),
                marginTop: h(20),
                borderRadius: 50, // This makes the border rounded
                borderWidth: 2, // This sets the width of the border
                borderColor: "#0077B6", // This sets the color of the border
                borderStyle: "dashed", // This makes the border dotted
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <NativeButton  onPress={pickImage} 
              
              
              > */}
              {!image && (
                <Ionicons name="camera-outline" size={40} color={"#0077B6"} />
              )}
              {/* </NativeButton> */}
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 50,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../../assets/images/bubble2.png")}
            style={{
              marginRight: -100,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "column",
            gap: 15,
            marginTop: 45,
          }}
        >
          <KeyboardAvoidingView style={styles.inputContainer}>
            {!showOtp && (
              <>
                <View>
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    value={userInfo.email}
                    placeholder="Email"
                    onChangeText={(value) =>
                      setUserInfo({ ...userInfo, email: value })
                    }
                  />
                  <Fontisto
                    style={{ position: "absolute", left: 26, top: 17.8 }}
                    name="email"
                    size={20}
                    color={"#A1A1A1"}
                  />
                </View>
                <View style={{ borderRadius: 50 }}>
                  <TextInput
                    style={styles.input}
                    keyboardType="default"
                    value={userInfo.name}
                    placeholder="Full Name"
                    onChangeText={(value) =>
                      setUserInfo({ ...userInfo, name: value })
                    }
                  />
                  <AntDesign
                    style={{ position: "absolute", left: 26, top: 14 }}
                    name="user"
                    size={20}
                    color={"#A1A1A1"}
                  />
                </View>
              </>
            )}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
                gap: 10,
                marginTop: h(20),
              }}
            >
              {!showOtp && (
                <View
                  style={[
                    styles.input,
                    {
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      paddingLeft: w(10),
                    },
                  ]}
                >
                  <Text style={{ fontSize: 20 }}>🇮🇳</Text>
                  <View
                    style={{
                      height: 30,
                      borderWidth: 1,
                      width: 1,
                      borderColor: "black",
                      marginLeft: 10,
                    }}
                  ></View>
                  <TextInput
                    autoComplete="sms-otp"
                    style={{ paddingLeft: 20, color: "#000" }}
                    keyboardType="phone-pad"
                    value={userInfo.phone ? userInfo.phone.toString() : ""} // Conditionally render value
                    placeholder="Your Number"
                    onChangeText={(value) =>
                      setUserInfo({
                        ...userInfo,
                        phone: value ? parseInt(value, 10) : 0, // Convert input value to number; use 0 as fallback
                      })
                    }
                  />
                </View>
              )}
              {/* {showOtp && Number(userInfo.phone) >= 1000000000 && (
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 10,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,

                      fontWeight: "400",
                      textAlign: "center",
                      marginVertical: 10,
                    }}
                  >
                    Enter OTP
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: 50,
                    }}
                  >
                    {otp.map((value, index) => (
                      <TextInput
                        key={index}
                        // Assuming inputRefs is defined elsewhere in your component
                        ref={(ref) => (otpRefs.current[index] = ref)}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        style={{
                          width: 45,
                          height: 45,
                          borderWidth: 1,

                          marginHorizontal: 8,
                          borderColor: "rgb(199, 196, 196)",
                          borderRadius: 10,
                          backgroundColor: "white",
                          textAlign: "center",
                        }}
                        maxLength={1}
                        keyboardType="numeric"
                        value={value}
                      />
                    ))}
                  </View>
                </View>
              )} */}
              {!showOtp && (
                <>
                  <TextInput
                    style={styles.input}
                    secureTextEntry
                    value={userInfo.password}
                    placeholder="Password"
                    onChangeText={(value) => {
                      setUserInfo({ ...userInfo, password: value });
                    }}
                  />

                  {required && (
                    <View
                    //  style={commonStyles.errorContainer}
                    >
                      <Entypo name="cross" size={18} color={"red"} />
                    </View>
                  )}
                </>
              )}

              {showOtp && (
                <>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: w(14),
                      fontFamily: ff.deckMedium,
                      textAlign: "center",
                    }}
                  >
                    Enter 4-digit otp to verify Phone
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingHorizontal: "10%",
                    }}
                  >
                    {otp.map((value, index) => (
                      <TextInput
                        key={index}
                        // Assuming inputRefs is defined elsewhere in your component
                        ref={(ref) => (otpRefs.current[index] = ref)}
                        onChangeText={(text) => handleOtpChange(text, index)}
                        onKeyPress={(e) => handleKeyPress(e, index)}
                        style={{
                          width: 50,
                          height: 50,
                          borderWidth: 1,
                          borderColor: "lightgray",
                          borderRadius: 10,
                          backgroundColor: "white",
                          textAlign: "center",
                          fontFamily: ff.deckBold,
                          fontSize: w(20),
                        }}
                        maxLength={1}
                        keyboardType="numeric"
                        value={value}
                      />
                    ))}
                  </View>
                  <Text
                    style={{
                      color: "#000",
                      fontSize: w(14),
                      fontFamily: ff.deckMedium,
                      textAlign: "center",
                    }}
                  >
                    OTP has been sent to your registered Mobile Number {"\n"}
                    +91-{maskPhoneNumber(userInfo.phone)}
                  </Text>
                </>
              )}

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 40,
                }}
              >
                {buttonSpinner ? (
                  <ActivityIndicator size="large" color="rgb(184, 196, 71)" />
                ) : (
                  <TouchableOpacity
                    style={{
                      padding: 20,
                      borderRadius: 8,
                      marginHorizontal: 16,
                      marginTop: 15,
                    }}
                    onPress={() => (showOtp ? verifyOtp() : sendOtp())}
                  >
                    <Button
                      text={showOtp ? "Submit" : "Register"}
                      width={w(300)}
                    />
                  </TouchableOpacity>
                )}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#000",
                      fontSize: 20,
                      lineHeight: 20,
                      textAlign: "center",
                      fontFamily: ff.textMedium,
                      letterSpacing: 0.9,
                    }}
                  >
                    Already registered?
                  </Text>
                  <Link href={{ pathname: "login" }}>
                    <Text
                      style={{
                        color: "#0077B6",
                        fontSize: 18,
                        lineHeight: 25,
                        textAlign: "center",
                        fontFamily: ff.deckBold,
                        letterSpacing: 0.9,
                      }}
                    >
                      {" "}
                      Login
                    </Text>
                  </Link>
                </View>

                <TouchableOpacity
                  style={{
                    paddingHorizontal: w(16),
                    paddingVertical: w(6),
                    borderRadius: 8,
                    marginHorizontal: 16,
                    marginBottom: 100,
                    marginTop: h(15),
                    borderWidth: 1,
                    borderColor: "#a7a7a7",
                  }}
                  onPress={() => router.back()}
                >
                  <Text
                    style={{
                      // color: "white",
                      textAlign: "center",
                      fontSize: 16,
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  content: {
    flex: 1,
  },
  backgroundObject: {
    position: "absolute",
    width: 259.33,
    height: 213.44,
    left: -100,
    top: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the color as needed
  },
  signInImage: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    alignSelf: "center",
    marginTop: 0,
  },
  welcomeText: {
    flexDirection: "row",
    maxWidth: 250,
    height: 150,
    fontWeight: "700",

    textAlign: "left",
    fontSize: 50,
    marginLeft: -20,

    marginTop: 50,
  },
  learningText: {
    textAlign: "center",
    color: "#575757",
    fontSize: 15,
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: "column",
    gap: 5,

    marginHorizontal: 16,
    // marginTop: 30,`
    rowGap: 10,
  },
  input: {
    height: 55,
    borderRadius: 20,
    paddingLeft: w(55),
    fontSize: 16,
    backgroundColor: "#f8f8f8",
    color: "#434343",
    fontFamily: ff.deckMedium,
  },
  visibleIcon: {
    position: "absolute",
    right: 30,
    top: 15,
  },
  icon2: {
    position: "absolute",
    left: 23,
    top: 17.8,
    marginTop: -2,
  },
  forgotSection: {
    marginHorizontal: 16,
    textAlign: "right",
    fontSize: 16,
    marginTop: 10,
  },
});
