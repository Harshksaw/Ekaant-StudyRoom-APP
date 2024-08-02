import Button from "@/components/Button";
import { BACKEND } from "@/utils/config";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import React, { createRef, useState } from "react";
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
  const [email, setEmail] = useState("mister.harshkumar@gmail.com");
  const [password, setPassword] = useState("testuser123");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [createRef(), createRef(), createRef(), createRef()];

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    if (text && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };
  const [loginOption, setLoginOption] = useState("password"); // 'password' or 'otp'
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const login = async () => {
    if (!email || !password) {
      return Toast.show("Please fill all fields", {
        type: "danger",
        placement: "top",
        duration: 2000,
      });
    }
  };

  const handleLogin = async () => {
    // Implement your login logic here

    //production
    // if (!email || !password) {
    //   return;
    // }

    try {
      const response = await axios.post(`${BACKEND}/api/v1/auth/signin`, {
        email,
        password,
      });

      console.log(response.data);
      if (response.data.success) {
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(response.data.token)
        );
        await AsyncStorage.setItem(
          "userData",
          JSON.stringify(response.data.data)
        );
        Toast.show(
          "Login Successful",

          {
            type: "success",
            placement: "top",
            duration: 2000,
          }
        );

        router.push("/(tabs)");

        // After storing the token, proceed with routing or any other operation
      }
    } catch (error) {
      console.log(error);
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
          marginTop: 100,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        <Text
          style={{
            fontSize: 40,

            marginBottom: 30,
            left: -100,
          }}
        >
          Login
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: "gray",

            marginBottom: 20,
            left: -50,
          }}
        >
          Good to See You back
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { paddingLeft: 40, marginBottom: -12 }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

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
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>


              <TextInput
                style={[styles.input, { width:'100%' }]} // Adjust padding as needed
                placeholder="Password"
                secureTextEntry={passwordVisibility}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 20,
                  bottom:15,

                }}
                onPress={() => setPasswordVisibility(!passwordVisibility)}
              >
                <Ionicons
                  // name="eye-outline"
                  name={
                    passwordVisibility ? "eye-off-outline" : "eye-outline"
                  }
                  size={25}
                  
                  style={{

                    // width: 150,
                    // height: 150,
                    // padding: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 50,
            }}>
             {otp.map((value, index) => (
               <TextInput
                 key={index}
                 ref={inputRefs[index]}
                 style={{
                  width: 40,
                  height: 40,
                  borderWidth: 1,
                  borderColor: 'lightgray',
                  borderRadius:10,
                  backgroundColor: 'white',
                  textAlign: 'center',
                }}
                 maxLength={1}
                 keyboardType="numeric"
                 onChangeText={(text) => handleOtpChange(text, index)}
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
  signupRedirect: {
    flexDirection: "row",
    marginTop: 30,
  },
  inputContainer: {
    width: "100%",

    marginHorizontal: 16,
    // marginTop: 30,`
    rowGap: 30,
  },
  input: {
    height: 55,
    // marginHorizontal: 16,
    borderRadius: 8,
    paddingLeft: 35,
    fontSize: 16,

    backgroundColor: "white",
    color: "#A1A1A1",
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
