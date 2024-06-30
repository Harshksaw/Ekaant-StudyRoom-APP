// import useUser from "@/hooks/auth/useUser";
import Loader from "@/components/loader";
import useUser from "hooks/auth/useUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
// import Loader from "@/components/loader/loader";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import SkeletonContent from "react-native-skeleton-content";
import * as Location from 'expo-location';
export default function TabsIndex() {


  const { loading, user } = useUser();
  console.log(user)


  // const [user, setUser] = useState(false);

  // const [token, setToken] = useState("");
  // const checkToken = async () => {
  //   const response = await AsyncStorage.getItem("token");
  //   const tokenResponse = response ? JSON.parse(response) : null;
  //   setToken(tokenResponse);

  //   console.log("token", token);
  //   if (token !== null) {
  //     setUser(true);
  //   }
  //   console.log(user, "user")
  // };
  // useEffect(() => {
  

  //   checkToken();
  // }, []);

  // (async () => {
  //   checkToken();
  //   console.log(user, "user")
  // })();

  return (
    <>
     {!loading ? (
      <Text>loading</Text>
      // <SkeletonContent
      // containerStyle={{flex: 1, width: 300}}
      // boneColor="#121212"
      // highlightColor="#333333"
      // animationType="pulse"
      // isLoading={true}/>
      ) : (
        <Redirect href={user ?  "/(tabs)" : "/(routes)/onboarding"} />
      )}
    
      {/* {!loading ? (
        <Loader />
      ) : (
        )} */}
      {/* <Redirect href={user ? "(tabs)" : "/(routes)/onboarding"} /> */}
      {/* <Redirect href="(routes)/SeatBooking" /> */}
    </>
  );
}
