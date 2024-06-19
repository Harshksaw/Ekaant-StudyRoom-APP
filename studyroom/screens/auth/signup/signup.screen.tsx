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
import Button from "@/components/Button";

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
          <Image source={require("../../../assets/images/bubble2.png")}
          style={{
            marginRight: -100,
          }}
          />
        </View>

  
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

            <View
              style={{
                flexDirection: "column",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 20,
                  borderRadius: 8,
                  marginHorizontal: 16,

                  marginTop: 15,
                }}
                onPress={()=> router.push("/(tabs)")}
              >
                {buttonSpinner ? (
                  <ActivityIndicator size="small" color={"white"} />
                ) : (

                  <Button
                    text="Sign Up"
                    // onPress={() => {
                    //   router.push("/(routes)/login");
                    // }}
                    />
                  
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
                onPress={() => router.back()}
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
    justifyContent: "space-between",
    alignItems: "center",

    alignSelf: "center",
    marginTop: 50,
  },
  welcomeText: {
    flexDirection: "row",
    maxWidth: 200,

    textAlign: "center",
    fontSize: 30,
    marginLeft: -40,

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
 
});
