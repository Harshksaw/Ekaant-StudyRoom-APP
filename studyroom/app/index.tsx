



import { Redirect } from "expo-router";
import { useState } from "react";

export default function TabsIndex() {


  // const { loading, user } = useUser();
  // console.log(user)


  const [user, setUser] = useState(false);

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
     <Redirect href={user ?  "/(tabs)" : "/(routes)/onboarding"} />
     </>
   
  
  
  );
}
