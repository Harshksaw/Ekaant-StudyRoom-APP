import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "@/components/loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { login } from "@/redux/userSlice";

export default function TabsIndex() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(false);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      const userData = await AsyncStorage.getItem("userData");
      console.log("🚀 ~ checkToken ~ token:", token);
      if (token && userData) {
        // Token exists, set user as logged in
        const parsedUserData = JSON.parse(userData);
        dispatch(login({ user: parsedUserData, token: JSON.parse(token) }));
      }
      setLoading(false); // Loading is complete
    };

    checkToken();
  }, [dispatch]);

  console.log("User is logged in:", isAuthenticated);

  if (loading) {
    return <Loader />;
  }

  return (
    <Redirect href={isAuthenticated ? "/(tabs)" : "/(routes)/onboarding"} />
  );
};
