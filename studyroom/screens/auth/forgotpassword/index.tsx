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
import { Toast } from "react-native-toast-notifications";
export default function ForgotPassword() {
  let [fontsLoaded, fontError] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_400Regular,
  });
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const getUserId = async () => {
    const res = await AsyncStorage.getItem("userData");
    const data = JSON.parse(res);
    // console.log(",,,", data.data.user._id);
    setUserId(data.data.user._id);
  };

  const forgetPassword = async () => {
    try {
      getUserId();

      if (password === confirmPassword) {
        const response = await axios.post(
          `${BACKEND}/api/v1/auth/forgotPassword`,
          {
            userId: userId,
            password: password,
            resetPassword: newPassword,
          }
        );
        console.log(response, "==============>>>>>>>>>>");
        if (response.status === 200) {
          Toast.show("Password Updated", {
            placement: "top",
            normalColor: "green",
            animationType:"slide-in",
            duration: 2000
          })
          router.back();
        } else {
          Toast.show("Retry", {
            placement: "top",
            normalColor: "red",
            animationType:"slide-in"
          })
          console.log("not working");
        }
      } else {
        Toast.show("Not Matched", {
          placement: "top",


          normalColor: "red",
          animationType:"slide-in"
        })
        console.log("Password and confirm password do not match");
      }

      console.log("seeding");
    } catch (error) {
      Toast.show("Retry", {
        placement: "top",

        normalColor: "red",
        animationType:"slide-in"
      })
      console.log("--------->>>>", error);
    }
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={styles.container}>
      <Text style={[styles.headerText, { fontFamily: "Nunito_600SemiBold" }]}>
        Password
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: "Nunito_400Regular" }]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
      />
      <Text style={[styles.headerText, { fontFamily: "Nunito_600SemiBold" }]}>
        Confirm Password
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: "Nunito_400Regular" }]}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Text style={[styles.headerText, { fontFamily: "Nunito_600SemiBold" }]}>
        New Password
      </Text>
      <TextInput
        style={[styles.input, { fontFamily: "Nunito_400Regular" }]}
        secureTextEntry
        placeholder="new Password"
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TouchableOpacity style={styles.button} onPress={() => forgetPassword()}>
        <Text style={[styles.buttonText, { fontFamily: "Nunito_600SemiBold" }]}>
          Send
        </Text>
      </TouchableOpacity>
      <View style={styles.loginLink}>
        <Text style={[styles.backText, { fontFamily: "normal" }]}>
          Back To?
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={[styles.loginText, { fontFamily: "normal" }]}>
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
