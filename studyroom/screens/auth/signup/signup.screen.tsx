import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Fontisto,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Raleway_700Bold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { useState } from "react";
//   import { commonStyles } from "@/styles/common/common.styles";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
//   import { SERVER_URI } from "@/utils/uri";
import { Toast } from "react-native-toast-notifications";

export default function SignUpScreen() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [required, setRequired] = useState("");
  const [error, setError] = useState({
    password: "",
  });

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  //   const handlePasswordValidation = (value: string) => {
  //     const password = value;
  //     const passwordSpecialCharacter = /(?=.*[!@#$&*])/;
  //     const passwordOneNumber = /(?=.*[0-9])/;
  //     const passwordSixValue = /(?=.{6,})/;

  //     if (!passwordSpecialCharacter.test(password)) {
  //       setError({
  //         ...error,
  //         password: "Write at least one special character",
  //       });
  //       setUserInfo({ ...userInfo, password: "" });
  //     } else if (!passwordOneNumber.test(password)) {
  //       setError({
  //         ...error,
  //         password: "Write at least one number",
  //       });
  //       setUserInfo({ ...userInfo, password: "" });
  //     } else if (!passwordSixValue.test(password)) {
  //       setError({
  //         ...error,
  //         password: "Write at least 6 characters",
  //       });
  //       setUserInfo({ ...userInfo, password: "" });
  //     } else {
  //       setError({
  //         ...error,
  //         password: "",
  //       });
  //       setUserInfo({ ...userInfo, password: value });
  //     }
  //   };

  // const handleSignIn = async () => {
  //   setButtonSpinner(true);
  //   await axios
  //     .post(`${SERVER_URI}/registration`, {
  //       name: userInfo.name,
  //       email: userInfo.email,
  //       password: userInfo.password,
  //     })
  //     .then(async (res) => {
  //       await AsyncStorage.setItem(
  //         "activation_token",
  //         res.data.activationToken
  //       );
  //       Toast.show(res.data.message, {
  //         type: "success",
  //       });
  //       setUserInfo({
  //         name: "",
  //         email: "",
  //         password: "",
  //       });
  //       setButtonSpinner(false);
  //       router.push("/(routes)/verifyAccount");
  //     })
  //     .catch((error) => {
  //       setButtonSpinner(false);
  //       Toast.show("Email already exist!", {
  //         type: "danger",
  //       });
  //     });
  // };
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

  // Use the validation function when setting the password
  // const handlePasswordChange = (password: string) => {
  //     const validationError = validatePassword(password);
  //     if (validationError) {
  //         // Show error message to the user
  //         // Alert.alert(validationError);
  //         console.log(validationError);
  //     } else {
  //             setUserInfo({ ...userInfo, password: password });
  //     }
  // };

  // In your TextInput for password

  return (
    <LinearGradient
      colors={["#E5ECF9", "#F6F7F9"]}
      style={{ flex: 1, paddingTop: 0 }}
    >
      <View>
        <View style={styles.signInImage}>

          <Text style={[styles.welcomeText, { fontFamily: "Raleway_700Bold" }]}>
            Create an {""} Account
          </Text>
          <Text style={[ { fontFamily: "Raleway_700Bold" }]}>
            Create an Account
          </Text>
        </View>

        {/* <Text style={styles.learningText}>
            Create an account to Becodemy to get all features
          </Text> */}
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              style={[styles.input, { paddingLeft: 40, marginBottom: -12 }]}
              keyboardType="default"
              value={userInfo.name}
              placeholder="harsh"
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

          <View>
            <TextInput
              style={[styles.input, { paddingLeft: 40 }]}
              keyboardType="email-address"
              value={userInfo.email}
              placeholder="support@becodemy.com"
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

          <View>
            <View
              style={[
                styles.input,
                {
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                },
              ]}
            >
              <Text>+91</Text>
              <TextInput
                style={{ paddingLeft: 40 }}
                keyboardType="phone-pad"
                value={userInfo.phone}
                placeholder="phone"
                onChangeText={(value) =>
                  setUserInfo({ ...userInfo, phone: value })
                }
              />
            </View>
            {/* <Fontisto
                style={{ position: "absolute", left: 26, top: 17.8 }}
                name="email"
                size={20}
                color={"#A1A1A1"}
              /> */}

            <TextInput
              style={[styles.input, { marginTop: 15 }]}
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
            {/* <View style={{ marginTop: 15 }}>
              <TextInput
                //   style={commonStyles.input}
                keyboardType="default"
                secureTextEntry={!isPasswordVisible}
                defaultValue=""
                placeholder="********"
                onChangeText={handlePasswordValidation}
              />
              <TouchableOpacity
                style={styles.visibleIcon}
                onPress={() => setPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? (
                  <Ionicons
                    name="eye-off-outline"
                    size={23}
                    color={"#747474"}
                  />
                ) : (
                  <Ionicons name="eye-outline" size={23} color={"#747474"} />
                )}
              </TouchableOpacity>
              <SimpleLineIcons
                style={styles.icon2}
                name="lock"
                size={20}
                color={"#A1A1A1"}
              />
            </View> */}
            {/* {error.password && (
              <View style={[commonStyles.errorContainer, { top: 145 }]}>
                <Entypo name="cross" size={18} color={"red"} />
                <Text style={{ color: "red", fontSize: 11, marginTop: -1 }}>
                  {error.password}
                </Text>
              </View>
            )} */}

            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 16,
                  borderRadius: 8,
                  marginHorizontal: 16,
                  backgroundColor: "#2467EC",
                  marginTop: 15,
                }}
                // onPress={handleSignIn}
              >
                {buttonSpinner ? (
                  <ActivityIndicator size="small" color={"white"} />
                ) : (
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 16,
                      fontFamily: "Raleway_700Bold",
                    }}
                  >
                    Sign Up
                  </Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 16,
                  borderRadius: 8,
                  marginHorizontal: 16,
                  marginBottom: 100,

                  // marginTop: 15,
                }}
                onPress={()=> router.back()}
              >
                <Text
                  style={{
                    // color: "white",
                    textAlign: "center",
                    fontSize: 16,
                    fontFamily: "Raleway_700Bold",
                  }}
                >
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  signInImage: {
    width: "60%",
    height: 300,
    flexDirection: "row",

    alignSelf: "center",
    marginTop: 50,
  },
  welcomeText: {
    flexDirection: "row",

    textAlign: "center",
    fontSize: 30,
    marginLeft:-40,



    marginTop: 100,
  },
  learningText: {
    textAlign: "center",
    color: "#575757",
    fontSize: 15,
    marginTop: 5,
  },
  inputContainer: {
    marginHorizontal: 16,
    // marginTop: 30,`
    rowGap: 30,
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
  signupRedirect: {
    flexDirection: "row",
    marginHorizontal: 16,
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
