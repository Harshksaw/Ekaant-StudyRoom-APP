import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/components/loader/loader";

export default function TabsIndex() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  const printAllAsyncStorageData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);

      console.log("All AsyncStorage data:");
      result.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
    } catch (error) {
      console.error("Error fetching AsyncStorage data", error);
    }
  };

  printAllAsyncStorageData();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("userData");
      console.log("🚀 ~ checkToken ~ token:", token)
      if (token && userData) {
        // Token exists, set user as logged in
        setUser(true);
      } else {
        // No token, user is not logged in
        setUser(false);
      }
      setLoading(false); // Loading is complete
    };


    checkToken();
  }, []);

  console.log("User is logged in:", user);

  if (loading) {
    return <Loader />;
  }

  return <Redirect href={user ? "/(tabs)" : "/(routes)/onboarding"} />;
}
