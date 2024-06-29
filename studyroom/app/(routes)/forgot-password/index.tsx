import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
  } from "react-native";
  import { LinearGradient } from "expo-linear-gradient";
  import {
    useFonts,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular,
  } from "@expo-google-fonts/nunito";
  import { router } from "expo-router";
import axios from "axios";
import { BACKEND } from "@/utils/config";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
  
  export default function ForgotPassword() {
    let [fontsLoaded, fontError] = useFonts({
      Nunito_600SemiBold,
      Nunito_700Bold,
      Nunito_400Regular,
    });
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    if (!fontsLoaded && !fontError) {
      return null;
    }
    const getUserId = async () => {
      const res = await AsyncStorage.getItem("token")
      setUserId(res);
    }

    const forgetPassword = async() => {  
      try {
        getUserId();

        const response = await axios.post(`${BACKEND}/auth/v1/auth/forgot-password`,{
          userId: userId,
          password: password,
          resetPassword : confirmPassword

        })     
      } catch (error) {
        console.log(error)
      }


    }
  
    return (
      <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
 
        <Text style={[styles.headerText, { fontFamily: "Nunito_600SemiBold" }]}>
         Password
        </Text>
        <TextInput
          style={[styles.input, { fontFamily: "Nunito_400Regular" }]}
          placeholder="Username@gmail.com"
          keyboardType="email-address"
        />
        <Text style={[styles.headerText, { fontFamily: "Nunito_600SemiBold" }]}>
          Confirm Password
        </Text>
        <TextInput
          style={[styles.input, { fontFamily: "Nunito_400Regular" }]}
          placeholder="Username@gmail.com"
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button}>
          <Text style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}>
            Send
          </Text>
        </TouchableOpacity>
        <View style={styles.loginLink}>
          <Text style={[styles.backText, { fontFamily: "Nunito_700Bold" }]}>
            Back To?
          </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={[styles.loginText, { fontFamily: "Nunito_700Bold" }]}>
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    headerText: {
      fontSize: 18,
      textAlign: "center",
      marginBottom: 20,
    },
    input: {
      width: "100%",
      height: 50,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    },
    button: {
      backgroundColor: "#3876EE",
      width: "100%",
      height: 45,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
    },
    loginLink: {
      flexDirection: "row",
      marginTop: 30,
    },
    loginText: {
      color: "#3876EE",
      marginLeft: 5,
      fontSize: 16,
    },
  
    backText: { fontSize: 16 },
  });
  