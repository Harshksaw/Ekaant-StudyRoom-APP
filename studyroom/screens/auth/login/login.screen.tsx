import { router } from "expo-router";
import React from "react";
import {
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const LoginScreen: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = () => {
    // Implement your login logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />

      <View style={styles.signupRedirect}>
        <Text style={{ fontSize: 18, fontFamily: "Raleway_600SemiBold" }}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => router.push("/(routes)/login")}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    // justifyContent: 'center',
    // alignItems: 'center',
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
