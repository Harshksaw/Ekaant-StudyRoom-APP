// import useUser from "@/hooks/auth/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
// import Loader from "@/components/loader/loader";
import {useEffect, useState} from 'react';

export default function TabsIndex() {
//   const { loading, user } = useUser();


const [user, setUser] = useState(false);

const[token, setToken] = useState("");

useEffect(() => {
  const checkToken = async () => {
    const response = await AsyncStorage.getItem('token');
    const tokenResponse = response ? JSON.parse(response) : null;
    setToken(tokenResponse);

    console.log("token", token);
    if (token) {
      setUser(true);
    }
  };

  checkToken();
}, []); 




  return (
    <>

      {/* {!loading ? (
        <Loader />
      ) : (
        )} */}
        <Redirect href={user ? "/(tabs)": "/(routes)/onboarding"} />
        {/* <Redirect href="(routes)/SeatBooking" /> */}
    </>
  );
}
