import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/components/loader/loader";
import useUser from "@/hooks/auth/useUser";

export default function TabsIndex() {


  // const printAllAsyncStorageData = async () => {
  //   try {
  //     const keys = await AsyncStorage.getAllKeys();
  //     const result = await AsyncStorage.multiGet(keys);

  //     console.log("All AsyncStorage data:");
  //     result.forEach(([key, value]) => {
  //       console.log(`${key}: ${value}`);
  //     });
  //   } catch (error) {
  //     console.error("Error fetching AsyncStorage data", error);
  //   }
  // };

  // printAllAsyncStorageData();

  // const { loading, user } = useUser();
  // console.log(user)

  // const [user, setUser] = useState(false);

  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   const checkToken = async () => {
  //     const response = await AsyncStorage.getItem("token");
  //     const tokenResponse = response ? JSON.parse(response) : null;
  //     setToken(tokenResponse);
  //     console.log("token", token);
  //   };

  //   checkToken();
  // }, []); // 

  // (async () => {
  //   checkToken();
  //   console.log(user, "user")
  // })();
  const { loading, user } = useUser();
  return (
    <>
      {!loading ? (
        <Loader />
      ) : (
      <Redirect href={!user ? "/(tabs)" : "/(routes)/onboarding"} />
      )}
      {/* <Redirect href={!user ? "/(tabs)" : "/(routes)/library/library.booking"} /> */}
    </>
  );
}
