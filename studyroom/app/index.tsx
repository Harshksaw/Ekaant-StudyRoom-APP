import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/components/loader/loader";

import { login } from "@/redux/userSlice";
import { useDispatch } from "react-redux";

export default function TabsIndex() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("userData");
      if (token && userData) {
        // Token exists, set user as logged in
        const parsedUserData = JSON.parse(userData);
        dispatch(login({ user: parsedUserData, token: JSON.parse(token) }));
      }
      setLoading(false); // Loading is complete
    };

    checkToken();
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return <Redirect href="/(routes)/splash" />;
}
