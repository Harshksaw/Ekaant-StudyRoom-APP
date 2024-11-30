import React, { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BACKEND } from "@/utils/config";

export default function useUser() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const [error, setError] = useState("");
  const [refetch, setRefetch] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const subscription = async () => {
      const accessToken = await AsyncStorage.getItem("token");

      await axios
        .get(`${BACKEND}/api/v1/auth/me`, {
          headers: {
            "access-token": accessToken,
          },
        })
        .then((res: any) => {
          console.log(res.data.user);
          setUser(res.data.user);
          setLoading(false);
          if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
          }
        })
        .catch((error: any) => {
          setError(error?.message);
          setLoading(false);
          if (error.response && error.response.status === 403) {
            if (!intervalId) {
              const id = setInterval(() => {
                setRefetch((prev) => !prev);
              }, 30000);
              setIntervalId(id);
            }
          } else {
            if (intervalId) {
              clearInterval(intervalId);
              setIntervalId(null);
            }
          }
        });
    };

    subscription();

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [refetch]);

  return { loading, user, error, setRefetch, refetch };
}
