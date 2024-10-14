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
  SafeAreaView,
} from "react-native";

import {
  AntDesign,
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { createRef, useEffect, useRef, useState } from "react";

import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";

import { Feather } from "@expo/vector-icons";
import { BACKEND } from "@/utils/config";
import Button from "@/components/Button";
import { Toast } from "react-native-toast-notifications";
import { spacing } from '../../../utils/theme';

export default function SignUpScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);

  const [otpVerified, setotpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const otpRefs = useRef([]);

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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
    try {
      console.log(userInfo.phone);
      setShowOtp(true);
      setLoading(true);
      const response = await axios.post(`${BACKEND}/api/v1/auth/otp`, {
        phoneNumber: userInfo.phone,
      });
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // useEffect hook to trigger the API call when all OTP fields are filled
  useEffect(() => {
    // Check if all OTP fields are filled
    const allFieldsFilled = otp.every((value) => value.trim() !== "");
    if (allFieldsFilled) {
      // Make your API call here
      console.log("Making API call with OTP:", otp.join(""));

      verifyOtp();
    }
  }, [otp]);
  const verifyOtp = async () => {
    try {
      const otpValue = otp.join("");
      console.log(otpValue, "aleuu");

      try {
        let response = await axios.post(`${BACKEND}/api/v1/auth/verifyOtp`, {
          phoneNumber: userInfo.phone,
          otp: otpValue,
        });

        if (response.status == 200) {
          setVerified(true);
          setotpVerified(true);
          Toast.show("Verified OTP", {
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

        // console.log("🚀 ~ verifyOtp ~ response:", response)
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //signup api
  const handleSignUp = async () => {
    if (!otpVerified) {
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
      // console.log("🚀 ~ handleSignUp ~ response:", response);
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
        router.push("/(tabs)");
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
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  return (
    <SafeAreaView
      style={[{
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center",
        // paddingTop  :50,
        // gap:50,
        backgroundColor: "#fff",

      }, styles.container]}
    >
      <ScrollView style={{
        flex: 1,
        flexDirection: "column",
        // justifyContent: "center",
        // paddingTop  :50,
        gap:60,
        backgroundColor: "#fff",
      }}>

      
      <View style={styles.signInImage}>
        <Image
          source={require("../../../assets/icons/bubble2.png")}
          style={styles.backgroundObject}
        />
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 60,
            marginLeft: -20,


            marginTop: 120,
            // marginLeft: 20,
            // backgroundColor: "red",
          }}
        >
          <Text style={[styles.welcomeText, {}]}>Create {"     "} Account</Text>

          <TouchableOpacity
            onPress={pickImage}
            style={{
              width: 100,
              height: 100,
              marginLeft: -80,
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

      <View style={{
        flexDirection: "column",
        gap: 15,
        marginTop: 45,
      }}>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <View>
            <TextInput
            
              style={[
                styles.input,
                {
                  paddingLeft: 40,
                  backgroundColor: "#F8F8F8",
                  borderRadius: 50,
                  color: "#000",
                },
              ]}
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
              style={[
                styles.input,
                {
                  paddingLeft: 40,
                  color: "#000",
                  marginBottom: -12,
                  borderRadius: 50,
                  backgroundColor: "#F8F8F8",
                },
              ]}
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
                  backgroundColor: "#F8F8F8",
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
  style={{ paddingLeft: 20,     color: "#000",}}
  keyboardType="phone-pad"
  value={userInfo.phone ? userInfo.phone.toString() : ''} // Conditionally render value
  placeholder="Your Number"
  onChangeText={(value) =>
    setUserInfo({
      ...userInfo,
      phone: value ? parseInt(value, 10) : 0, // Convert input value to number; use 0 as fallback
    })
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
                <Text
                  style={{
                    fontSize: 18,

                    fontWeight: "400",
                    textAlign: "center",marginVertical:10
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
                      ref={(ref) => otpRefs.current[index] = ref}
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
            )}

            <TextInput
              style={[
                styles.input,
                {
                  marginTop: 15,
                  borderRadius: 50,
                  borderRadius: 50,
                  backgroundColor: "#F8F8F8",
                  color: "#000",
                },
              ]}
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
                <>
                  {
                    otpVerified && (
                      <TouchableOpacity

                        style={{
                          padding: 20,
                          borderRadius: 8,
                          marginHorizontal: 16,

                          marginTop: 15,
                        }}
                        onPress={() => handleSignUp()}
                      >
                        <Button

                          text="Register" width={350} height={60} />
                      </TouchableOpacity>
                    )
                  }

                </>
              )}

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
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  content: {
    flex: 1,
  },
  backgroundObject: {
    position: 'absolute',
    width: 259.33,
    height: 213.44,
    left: -100,
    top: 0,
    // backgroundColor: 'rgba(0, 0, 0, 0.1)', // Adjust the color as needed
  },
  signInImage: {
    width: "60%",
    height: 300,
    marginBottom: 80,
    paddingTop:30,

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
