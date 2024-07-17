import React, { useEffect, useState } from "react";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND } from "@/utils/config";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("token");

      console.log(accessToken, "accessToken");
      // const refreshToken = await AsyncStorage.getItem("refresh_token");

      await axios
        .get(`${BACKEND}/api/v1/auth/me`, {
          headers: {
            "access-token": accessToken,
            // "refresh-token": refreshToken,
          },
        })
        .then((res: any) => {
          console.log(res.data.user);
          setUser(res.data.user);
          setLoading(false);
        })
        .catch((error: any) => {
          setError(error?.message);
          setLoading(false);
        });


    };
    subscription();
  }, [refetch]);

  return { loading, user, error, setRefetch, refetch };
}
