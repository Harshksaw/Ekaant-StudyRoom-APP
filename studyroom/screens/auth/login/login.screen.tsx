import { router } from "expo-router";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <SafeAreaView style={styles.container}>

    <View style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      zIndex: -1,
    }}>
      <Image source={require('../../../assets/images/bubble 02.png')} style={StyleSheet.absoluteFill} />
      <Image source={require('../../../assets/images/bubble 01.png')} />
    </View>


    <View 
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop:100,
      width: '100%',
      height: '100%',
      zIndex: 1,
    
    }}
    >

    
      <Text
      style={{
        fontSize: 40,
        fontFamily: "Raleway_700Bold",
        marginBottom: 30,
        left: -100,
      
      }}
      >Login</Text>
      <Text
      style={{
        fontSize: 20,
        color:'gray',
        fontFamily: "Raleway_700Bold",
        marginBottom: 20,
        left: -50,
      
      }}
      >Good to See You back</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { paddingLeft: 40, marginBottom: -12 }]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={[styles.input, { paddingLeft: 40, marginBottom: -12 }]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity
        style={{
          padding: 16,
          borderRadius: 8,
          marginHorizontal: 16,
          backgroundColor: "#2467E2",
          marginTop: 35,

        }}
      >
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
      </TouchableOpacity>

      <View style={styles.signupRedirect}>
        <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/(routes)/signup")}>
          <Text
            style={{
              fontSize: 18,
              fontFamily: "Raleway_600SemiBold",
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
export default LoginScreen;
