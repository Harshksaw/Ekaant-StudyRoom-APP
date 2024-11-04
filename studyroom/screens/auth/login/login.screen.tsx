import Button from "@/components/Button";
import { BACKEND } from "@/utils/config";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { createRef, useEffect, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView
} from "react-native";

import { Toast } from "react-native-toast-notifications";

const LoginScreen: React.FC = () => {
  const [password, setPassword] = useState("Password");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [createRef(), createRef(), createRef(), createRef()];
  const [loginOption, setLoginOption] = useState("password");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  useEffect(() => {
    const getme = async () => {
      const res = await axios.get(`${BACKEND}/me`);
      if (res.status === 200) {
        setLoading(false);
      }
    };
    getme();
  }, []);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const loginWithOtp = async () => {
    try {
      const response = await axios.post(`${BACKEND}/api/v1/auth/otp-login`, {
        phoneNumber,
        otp: otp.join(""),
      });

      if (response.status === 200) {
        await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));
        Toast.show("Login Successful", {
          type: "success",
          placement: "top",
          duration: 2000,
        });
        router.push("/(routes)/location");
      } else {
        Toast.show(response.data.message, {
          type: "danger",
          placement: "top",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show("Login failed", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };

  const login = async () => {
    if (!phoneNumber || !password) {
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
      console.log("🚀 ~ login ~ response:", response)


      if (response.data.success) {
        await AsyncStorage.setItem("token", JSON.stringify(response.data.token));
        await AsyncStorage.setItem("userData", JSON.stringify(response.data.data));
        Toast.show("Login Successful", {
          type: "success",
          placement: "top",
          duration: 2000,
        });
        router.push("/(tabs)");
      } else {
        Toast.show(response.data.message, {
          type: "danger",
          placement: "top",
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      Toast.show("Login failed", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };

  const handleLogin = async () => {
    if (phoneNumber.length == 10) {
      console.log(loginOption, phoneNumber);
      if (loginOption === "otp") {
        loginWithOtp();
      } else {
        await login();
      }
    } else {
      Toast.show("Please enter a valid 10-digit phone number", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };

  // useEffect(() => {
  //   if (phoneNumber.length === 10) {

  //     if (loginOption === "otp") {
  //         axios
  //         .post(`${BACKEND}/api/v1/auth/otp`, {
  //           phoneNumber,
  //         })
  //         .then((res) => {
  //           if (res.data.success) {
  //             Toast.show("OTP sent successfully", {
  //               type: "success",
  //               placement: "top",
  //               duration: 2000,
  //             });
  //           } else {
  //             Toast.show(res.data.message, {
  //               type: "danger",
  //               placement: "top",
  //               duration: 2000,
  //             });
  //           }
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           Toast.show("Failed to send OTP", {
  //             type: "danger",
  //             placement: "top",
  //             duration: 2000,
  //           });
  //         });
  //     }
  //   }
  // }, [phoneNumber]);
  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === "" && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  const handlePhoneNumberChange = (text) => {
    // Ensure only numeric input and limit to 10 digits
    const cleanedText = text.replace(/[^0-9]/g, '').slice(0, 10);
    setPhoneNumber(cleanedText);
  };


  const sendOtp = async() => {
    if (isBlocked) {
      Toast.show("You have reached the maximum number of attempts. Please try again later.", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
      return;
    }

    if (phoneNumber.length === 10) {
      Toast.show("Sending OTP...", {
        type: "info",
        placement: "top",
        duration: 2000,
      });

       await axios
        .post(`${BACKEND}/api/v1/auth/otp`, {
          phoneNumber,
        })
        .then((res) => {
          if (res.data.success) {
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
          console.log(err);
          Toast.show("Failed to send OTP", {
            type: "danger",
            placement: "top",
            duration: 2000,
          });
        });
    } else {
      Toast.show("Please enter a valid 10-digit phone number", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };



  return (
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

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 200,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 40,
            fontWeight: "800",
            letterSpacing: 5,
            marginBottom: 30,
            left: -100,
          }}
        >
          Login
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "black",
            marginBottom: 20,
            left: -70,
          }}
        >
          Good to See You back! 🖤
        </Text>

        <View style={styles.inputContainer}>
          <View
            style={{
              paddingLeft: 10,
              paddingRight: 10,
              borderRadius: 20,
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              backgroundColor: "#fff",
            }}
          >
            <Text
              style={{
                fontSize: 25,
                marginHorizontal: 10,
                color: "black",
                marginRight: -2,
              }}
            >
              🇮🇳 |
            </Text>

            <View style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:'space-between',
              paddingRight: 10,

            }
            }>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        maxLength={10}
        value={phoneNumber}
        onChangeText={handlePhoneNumberChange}
        placeholder="Enter your phone number"
      />
      <TouchableOpacity onPress={sendOtp}>

      {loginOption === 'otp' && (
        
        <Ionicons name="send" size={24} color="black" onPress={sendOtp} 
        
        style={{
          
          
          
          
        }}
        />
      )}
      </TouchableOpacity>
      {/* Add other components and logic here */}
    </View>
          </View>

          <Text
            style={{
              textAlign: "left",
              fontSize: 18,
              marginLeft: 20,
            }}
          >
            Login Via
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
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: "#2467E2",
                    }}
                  />
                )}
              </View>
              <Text
                style={{
                  color: loginOption === "password" ? "#2467E2" : "#000",
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
                      height: 10,
                      width: 10,
                      borderRadius: 5,
                      backgroundColor: "#2467E2",
                    }}
                  />
                )}
              </View>
              <Text
                style={{ color: loginOption === "otp" ? "#2467E2" : "#000" }}
              >
                OTP
              </Text>
            </TouchableOpacity>
          </View>

          {/* Conditional Input Field */}
          {loginOption === "password" ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                style={[styles.input, { width: "100%" }]} // Adjust padding as needed
                placeholder="Password"
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
                  name={
                    passwordVisibility ? "eye-off-outline" : "eye-outline"
                  }
                  size={25}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 70,
              }}
            >
              {otp.map((value, index) => (
                <TextInput
                  key={index}
                  ref={inputRefs[index]}
                  style={{
                    width: 50,
                    height: 50,
                    borderWidth: 1,
                    borderColor: "lightgray",
                    borderRadius: 10,
                    backgroundColor: "white",
                    textAlign: "center",
                  }}
                  maxLength={1}
                  keyboardType="numeric"
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  value={value}
                />
              ))}
            </View>
          )}
        </View>

        <TouchableOpacity
          style={{
            padding: 16,
            borderRadius: 8,
            marginHorizontal: 16,
            marginTop: 35,
          }}
          onPress={handleLogin}
        >
          <Button text="Login" width={300} height={60} onPress={handleLogin} />
        </TouchableOpacity>

        <View style={styles.signupRedirect}>
          <Text style={{ fontSize: 18, fontFamily: "normal" }}>
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/(routes)/signup")}>
            <Text
              style={{
                fontSize: 18,
                color: "#2467EC",
                marginLeft: 5,
              }}
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
 
  inputContainer: {
    width: "100%",
    marginHorizontal: 16,
    rowGap: 30,
  },
  input: {
    height: 55,
    borderRadius: 20,
    paddingLeft: 35,
    fontSize: 16,
    backgroundColor: "white",
    color: "#A1A1A0",
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
  signupRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});

export default LoginScreen;