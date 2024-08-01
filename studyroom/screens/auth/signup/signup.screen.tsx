import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  SafeAreaView
} from "react-native";


import {
  AntDesign,
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
  
} from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { createRef, useEffect, useState } from "react";
//   import { commonStyles } from "@/styles/common/common.styles";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
//   import { SERVER_URI } from "@/utils/uri";

import { Feather } from "@expo/vector-icons";
import { BACKEND } from "@/utils/config";
import Button from "@/components/Button";
import { Toast } from "react-native-toast-notifications";


export default function SignUpScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);

  const [otpVerified, setotpVerified] = useState(false);

  const [showOtp, setShowOtp] = useState(false);

  const [verified, setVerified] = useState(false);
  const [userInfo, setUserInfo] = useState({

    name: "",
    email: "",
    phone: 0,
    password: "",
  });
  const [required, setRequired] = useState(false);
  const [error, setError] = useState({
    password: "",
  });

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [createRef(), createRef(), createRef(), createRef()];

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    // if (text && index < 3) {
    //   inputRefs[index + 1].current.focus();
    // }
  };


  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };




  const validatePassword = (password: string) => {
    // Check if password is at least 8 characters long
    if (password.length < 8) {
      return "Password should be at least 8 characters";
    }

    // Add more checks as needed
    // For example, check if password contains at least one number
    if (!/\d/.test(password)) {
      return "Password should contain at least one number";
    }

    // If all checks pass, return null
    return null;
  };

  const sendOtp = async () => {
    try {
      console.log(userInfo.phone);
      setShowOtp(true);
      const response = await axios.post(`${BACKEND}/api/v1/auth/otp`, {
        phoneNumber: userInfo.phone,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };


  // useEffect hook to trigger the API call when all OTP fields are filled
  useEffect(() => {
    // Check if all OTP fields are filled
    const allFieldsFilled = otp.every(value => value.trim() !== "");
    if (allFieldsFilled) {
      // Make your API call here
      console.log("Making API call with OTP:", otp.join(""));


      verifyOtp();

    }
  }, [otp]); 
  const verifyOtp = async () => {
    try {
      const otpValue = otp.join("");
      console.log(otpValue, "aleuu")

      try {
        
        let response = await axios.post(`${BACKEND}/api/v1/auth/verifyOtp`, {
          phoneNumber : userInfo.phone,
          otp: otpValue,
        });

      if (response.data.success) {
        setVerified(true);
        setotpVerified(true);
      }

      console.log(response.data);
      } catch (error) {
        console.log(error);
        
      }
     


    } catch (error) {
      console.log(error);
    }
  };

  //signup api 
  const handleSignUp = async () => {

if(!otpVerified){
  Toast.show("Please verify OTP", {
    type: "danger",
    duration: 3000,
    placement: "top",
    style: {
      backgroundColor:'red',
      borderRadius: 10,
      padding: 10,
      marginTop:50


    }
  });
}

    console.log("signup.screen.tsx>>>>>>", userInfo);
    try {
      console.log("Sending signup data:", {
        username: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        phoneNumber: userInfo.phone,
        accountType: "User",
      });


      let formData = new FormData();
      // console.log("Image path:", typeof image  )

      const respon = await fetch(image);
      const blob = await respon.blob();
      const file = new File([blob], `${userInfo.name}.jpg`, { type: blob.type });
      formData.append('profile', file);

      // Append other user info to formData
      formData.append('username', userInfo.name);
      formData.append('email', userInfo.email);
      formData.append('password', userInfo.password);
      formData.append('phoneNumber', userInfo.phone.toString()); // Ensure phone is a string
      formData.append('accountType', "User");

      const response = await axios.post(`${BACKEND}/api/v1/auth/signup`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data.success) {
        await AsyncStorage.setItem(
          "token",
          JSON.stringify(response.data.token)
        );
        await AsyncStorage.setItem("userData", JSON.stringify(response.data));
        setButtonSpinner(false);
        router.push("/(tabs)");
        // Toast.show("Account created successfully", {
        //   type: "success",
        // });
      }
    } catch (error) {
      console.log(error);
      setButtonSpinner(false);
      // Toast.show("An error occured", {
      //   type: "danger",
      // });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >
    
        <View style={styles.signInImage}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              marginLeft: -20,

              // marginTop: 100,
              // marginLeft: 20,
              // backgroundColor: "red",
            }}
          >
            <Text style={[styles.welcomeText, {}]}>
              Create {"     "} Account
            </Text>

            <TouchableOpacity 
            onPress={pickImage} 
              style={{
                width: 100,
                height: 100,
                marginLeft: -40,
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
              {!image &&
                  <Ionicons name="camera-outline" size={40} color={"#0077B6"} />
              }
              {/* </NativeButton> */}
              {image && <Image source={{ uri: image }} style={{
                width: 100,
                height: 100,
                borderRadius: 50,
              }} />}
            
            </TouchableOpacity>
          </View>

          <Image
            source={require("../../../assets/images/bubble2.png")}
            style={{
              marginRight: -100,
            }}
          />
        </View>

        <ScrollView style={{}}>
          <KeyboardAvoidingView style={styles.inputContainer}>
            <View>
              <TextInput
                style={[styles.input, { paddingLeft: 40, backgroundColor: "#F8F8F8", borderRadius: 50 }]}
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
            <View
              style={{ borderRadius: 50 }}
            >
              <TextInput
                style={[styles.input, { paddingLeft: 40, marginBottom: -12, borderRadius: 50, backgroundColor: "#F8F8F8" }]}
                keyboardType="default"
                value={userInfo.name}
                placeholder="Full Name"
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, name: value })
                }
              />
              <AntDesign
                style={{ position: "absolute", left: 26, top: 14, }}
                name="user"
                size={20}
                color={"#A1A1A1"}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
                gap: 10,
                marginTop: 10,

              }}
            >
              <View
                style={[
                  styles.input,
                  {
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    borderRadius: 50,
                    backgroundColor: "#F8F8F8"
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
                  style={{ paddingLeft: 20, }}
                  keyboardType="phone-pad"
                  value={userInfo.phone.toString()} // Convert phone number to string for the value prop
                  placeholder="phone"
                  onChangeText={
                    (value) =>
                      setUserInfo({
                        ...userInfo,
                        phone: parseInt(value, 10) || 0,
                      }) // Convert input value to number; use 0 as fallback
                  }
                />

                <Feather
                  style={{
                    position: "absolute",
                    right: 30,
                    top: 15,
                  }}
                  onPress={sendOtp}
                  name="arrow-up-right"
                  size={24}
                  color="black"
                />

              </View>
              {showOtp && Number(userInfo.phone) >= 1000000000 && (

                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: 5,
                    marginTop: 10,

                  }}
                >
                  <Text style={{
                    fontSize: 18,
                    fontWeight: "400",
                  }}>Enter OTP</Text>


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
          ref={inputRefs[index]}
          style={{
            width: 40,
            height: 40,
            borderWidth: 1,
            borderColor: "lightgray",
            borderRadius: 10,
            backgroundColor: "white",
            textAlign: "center",
          }}
          maxLength={1}
          keyboardType="numeric"
          onChangeText={(text) => handleOtpChange(text, index)}
          value={value}
        />
      ))}

                  </View>
                </View>

              )}

              <TextInput
                style={[styles.input, {
                  marginTop: 15, borderRadius: 50, borderRadius: 50,
                  backgroundColor: "#F8F8F8"
                }]}
                secureTextEntry
                value={userInfo.password}
                placeholder="password"
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

              <View
                style={{
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: 40,
                }}
              >

                         <TouchableOpacity
                         style={{
                           padding: 20,
                           borderRadius: 8,
                           marginHorizontal: 16,
       
                           marginTop: 15,
                         }}
                         onPress={() => handleSignUp()}
                       >
                         <Button text="Register" width={250} height={60} />
                       </TouchableOpacity>



                <TouchableOpacity
                  style={{
                    padding: 16,
                    borderRadius: 8,
                    marginHorizontal: 16,
                    marginBottom: 100,

                    // marginTop: 15,
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
        </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    width: "60%",
    height: 250,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",

    alignSelf: "center",
    marginTop: 0,
  },
  welcomeText: {
    flexDirection: "row",
    maxWidth: 200,
    fontWeight: "700",

    textAlign: "left",
    fontSize: 40,
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
    marginHorizontal: 16,
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
});
