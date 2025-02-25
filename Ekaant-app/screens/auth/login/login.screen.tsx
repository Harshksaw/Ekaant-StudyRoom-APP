import React, { createRef, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import Button from "@/components/Button";
import ff from "@/constants/fonts";
import { h, w } from "@/constants/size";
import { BACKEND } from "@/utils/config";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { login } from "../../../redux/userSlice";
import { Toast } from "react-native-toast-notifications";
import { useDispatch } from "react-redux";
import { CommonActions } from "@react-navigation/native";

export function maskPhoneNumber(phoneNumber?: string | number) {
  if (!phoneNumber) {
    return 0;
  }
  // Ensure the phone number is a string
  const phoneStr = phoneNumber.toString();
  // Mask the middle part of the phone number
  return phoneStr.slice(0, 2) + "****" + phoneStr.slice(-4);
}

const { width, height } = Dimensions.get("screen");
const isTablet = width >= 768; // Detect iPad/tablet

const LoginScreen: React.FC = () => {
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOtp, setIsOtp] = useState<boolean>(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [createRef(), createRef(), createRef(), createRef()];
  const [loginOption, setLoginOption] = useState("otp");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isFocused, setFocused] = useState(0);
  const [isKeyboard, setIsKeyboard] = useState<boolean>(false);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    const getme = async () => {
      const res = await axios.get(`${BACKEND}/me`);
      if (res.status === 200) {
        setLoading(false);
      }
    };
    getme();
  }, []);
  
  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (newOtp.join("").length === 4) {
      loginWithOtp(newOtp.join(""));
    }

    if (text && index < 3) {
      inputRefs[index + 1].current.focus();
      setFocused(index + 1);
    }
  };
  
  const loginWithOtp = async (text?: string) => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND}/api/v1/auth/otp-login`, {
        phoneNumber,
        otp: text ?? otp.join(""),
      });
      setLoading(false);
      if (response.status === 200) {
        await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));
        dispatch(login({ user: response.data, token: response.data.token }));
        Toast.show("Login Successful", {
          type: "success",
          placement: "top",
          duration: 2000,
        });
        router.dismissAll();
        router.replace("/(routes)/location");
      } else {
        console.log("🚀 ~ loginWithOtp ~ response.data.message:", response.data.message)
        Toast.show(response.data.message, {
          type: "danger",
          placement: "top",
          duration: 2000,
        });
      }
    } catch (error: any) {
      console.log("🚀 ~ loginWithOtp ~ error:", error);
      setLoading(false);
      if (error.response) {
        Toast.show(error.response.data.message, {
          type: "danger",
          placement: "top",
          duration: 4000,
        });
      } else {
        Toast.show("An unexpected error occurred. Please try again.", {
          type: "danger",
          placement: "top",
          duration: 4000,
        });
      }
    }
  };
  
  const loginHandler = async () => {
    setLoading(true);
    if (!phoneNumber || !password) {
      setLoading(false);
      return Toast.show("Please fill all fields", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  
    try {
      const response = await axios.post(`${BACKEND}/api/v1/auth/signin`, {
        phoneNumber,
        password,
      });
      setLoading(false);
      if (response.data.success) {
        await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));
        dispatch(login({ user: response.data, token: response.data.token }));
        Toast.show("Login Successful", {
          type: "success",
          placement: "top",
          duration: 2000,
        });
        router.dismissAll();
        router.replace("/(tabs)");
      } else {
        Toast.show(response.data.message, {
          type: "danger",
          placement: "top",
          duration: 2000,
        });
      }
    } catch (error: any) {
      setLoading(false);
      if (error.response) {
        Toast.show(error.response.data.message, {
          type: "danger",
          placement: "top",
          duration: 4000,
        });
      } else {
        Toast.show("Line 171 loginScreen", {
          type: "danger",
          placement: "top",
          duration: 4000,
        });
      }
    }
  };
  
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
      setFocused(index - 1);
    }
  };
  
  const handlePhoneNumberChange = (text: string) => {
    // Ensure only numeric input and limit to 10 digits
    const cleanedText = text.replace(/[^0-9]/g, "").slice(0, 10);
    setPhoneNumber(cleanedText);
  };
  
  const sendOtp = async () => {
    setLoading(true);
    if (isBlocked) {
      Toast.show(
        "You have reached the maximum number of attempts. Please try again later.",
        {
          type: "danger",
          placement: "top",
          duration: 2000,
        }
      );
      setLoading(false);
      return;
    }
  
    if (phoneNumber.length === 10) {
      Toast.show("Sending OTP...", {
        type: "info",
        placement: "top",
        duration: 2000,
      });
  
      await axios
        .post(`${BACKEND}/api/v1/auth/otp`, { phoneNumber })
        .then((res) => {
          setLoading(false);
          if (res.data.success) {
            setIsOtp(true);
            Toast.show("OTP sent successfully", {
              type: "success",
              placement: "top",
              duration: 2000,
            });
            setAttempts(attempts + 1);
            if (attempts + 1 >= 3) {
              setIsBlocked(true);
            }
          } else {
            Toast.show(res.data.message, {
              type: "danger",
              placement: "top",
              duration: 2000,
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          Toast.show("Failed to send OTP", {
            type: "danger",
            placement: "top",
            duration: 2000,
          });
        });
    } else {
      setLoading(false);
      Toast.show("Please enter a valid 10-digit phone number", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };
  
  const handleLogin = async () => {
    if (isOtp) {
      loginWithOtp();
      return;
    }
    if (phoneNumber.length === 10) {
      if (loginOption === "otp") {
        sendOtp();
      } else {
        await loginHandler();
      }
    } else {
      Toast.show("Please enter a valid 10-digit phone number", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      setIsKeyboard(true);
    });
  
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      setIsKeyboard(false);
    });
  
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            zIndex: -1,
          }}
        >
          <Image
            source={require("../../../assets/images/bubble 02.png")}
            style={StyleSheet.absoluteFill}
          />
          <Image source={require("../../../assets/images/bubble 01.png")} />
        </View>
        <Image
          style={{ position: "absolute", top: "25%", right: 0 }}
          source={require("../../../assets/images/bubblle 03.png")}
        />
  
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginTop: isTablet ? h(120) : h(200),
            width: "100%",
            height: "100%",
            zIndex: 1,
            paddingHorizontal: w(10),
          }}
        >
          <Text
            style={{
              fontSize: isTablet ? w(60) : w(50),
              fontFamily: ff.displayBlack,
              letterSpacing: 1.5,
            }}
          >
            Login
          </Text>
          <Text
            style={{
              fontSize: isTablet ? 24 : 20,
              color: "black",
              marginTop: isTablet ? h(4) : h(5),
              marginBottom: isTablet ? h(30) : h(20),
              fontFamily: ff.deckRegular,
            }}
          >
            Good to See You back!
          </Text>
  
          {!isOtp && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: isTablet ? h(15) : h(10),
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: isTablet ? w(24) : w(20),
                  fontFamily: ff.deckMedium,
                }}
              >
                Login Via:
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  justifyContent: "center",
                  gap: 25,
                }}
              >
                <TouchableOpacity
                  onPress={() => setLoginOption("password")}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: "#2467E2",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 5,
                    }}
                  >
                    {loginOption === "password" && (
                      <View
                        style={{
                          height: "90%",
                          width: "90%",
                          borderRadius: 50,
                          backgroundColor: "#2467E2",
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      color: loginOption === "password" ? "#2467E2" : "#000",
                      fontFamily: ff.deckMedium,
                    }}
                  >
                    Password
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setLoginOption("otp")}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 20,
                  }}
                >
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      borderRadius: 10,
                      borderWidth: 2,
                      borderColor: "#2467E2",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: 5,
                    }}
                  >
                    {loginOption === "otp" && (
                      <View
                        style={{
                          height: "90%",
                          width: "90%",
                          borderRadius: 50,
                          backgroundColor: "#2467E2",
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      color: loginOption === "otp" ? "#2467E2" : "#000",
                      fontFamily: ff.deckMedium,
                    }}
                  >
                    OTP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View style={styles.inputContainer}>
            {!isOtp && (
              <View
                style={{
                  paddingLeft: 10,
                  borderRadius: 20,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  backgroundColor: "#f8f8f8",
                }}
              >
                <Text
                  style={{
                    fontSize: isTablet ? 30 : 25,
                    marginLeft: 10,
                    color: "black",
                  }}
                >
                  🇮🇳 |
                </Text>
  
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={handlePhoneNumberChange}
                    placeholder="Enter your phone number"
                  />
                </View>
              </View>
            )}
            {/* Conditional Input Field */}
            {loginOption === "password" && (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInput
                  style={[styles.input, { width: "100%" }]}
                  placeholder="Enter your password"
                  secureTextEntry={passwordVisibility}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    right: 20,
                    bottom: 15,
                  }}
                  onPress={() => setPasswordVisibility(!passwordVisibility)}
                >
                  <Ionicons
                    name={passwordVisibility ? "eye-off-outline" : "eye-outline"}
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            )}
  
            {isOtp && (
              <>
                <Text
                  style={{
                    color: "#000",
                    fontSize: isTablet ? w(16) : w(14),
                    fontFamily: ff.deckMedium,
                    textAlign: "center",
                  }}
                >
                  {isOtp
                    ? "Enter 4-digit OTP to verify"
                    : "Enter 10-digit Phone Number to login"}
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
                      autoComplete="sms-otp"
                      key={index}
                      autoFocus={index ? false : true}
                      ref={inputRefs[index]}
                      style={{
                        width: isTablet ? 60 : 50,
                        height: isTablet ? 60 : 50,
                        borderWidth: 1,
                        borderColor: isFocused === index ? "#2467EC" : "lightgray",
                        borderRadius: 10,
                        backgroundColor: "white",
                        textAlign: "center",
                        fontFamily: ff.deckBold,
                        fontSize: isTablet ? w(24) : w(20),
                      }}
                      maxLength={1}
                      keyboardType="numeric"
                      onChangeText={(text) => handleOtpChange(text, index)}
                      onKeyPress={(e) => handleKeyPress(e, index)}
                      value={value}
                    />
                  ))}
                </View>
                <Text
                  style={{
                    color: "#000",
                    fontSize: isTablet ? w(16) : w(14),
                    fontFamily: ff.deckMedium,
                    textAlign: "center",
                  }}
                >
                  OTP has been sent to your registered Mobile Number {"\n"}
                  +91-{maskPhoneNumber(phoneNumber)}
                </Text>
              </>
            )}
          </View>
  
          <TouchableOpacity
            style={{
              borderRadius: 8,
              marginHorizontal: 16,
              marginTop: isTablet ? 45 : 35,
              opacity: loading ? 0.6 : 1,
            }}
            onPress={handleLogin}
            disabled={loading}
          >
            <Button
              loading={loading}
              text={isOtp || loginOption === "password" ? "Login" : "Submit"}
              width={isTablet ? w(350) : w(300)}
            />
          </TouchableOpacity>
  
          <View style={styles.signupRedirect}>
            <Text style={{ fontSize: isTablet ? 20 : 18, fontFamily: ff.deckRegular }}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => router.push("/(routes)/signup")}>
              <Text
                style={{
                  fontSize: isTablet ? 20 : 18,
                  color: "#2467EC",
                  marginLeft: 5,
                  fontFamily: ff.deckBold,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <Image
          style={{
            position: "absolute",
            bottom: isKeyboard ? "-25%" : "8%",
            right: 0,
          }}
          source={require("../../../assets/images/bubble 04.png")}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  inputContainer: {
    width: "100%",
    rowGap: 30,
  },
  input: {
    height: isTablet ? 65 : 55,
    borderRadius: 20,
    backgroundColor: "#f8f8f8",
    paddingLeft: w(10),
    width: "100%",
    fontSize: isTablet ? 18 : 16,
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
    fontSize: isTablet ? 18 : 16,
    marginTop: 10,
  },
  signupRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
  
export default LoginScreen;