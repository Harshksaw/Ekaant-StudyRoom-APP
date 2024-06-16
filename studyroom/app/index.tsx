// import useUser from "@/hooks/auth/useUser";
import { Redirect } from "expo-router";
// import Loader from "@/components/loader/loader";
import {useState} from 'react';

export default function TabsIndex() {
//   const { loading, user } = useUser();

const [user, setUser] = useState(false);
  return (
    <>

      {/* {!loading ? (
        <Loader />
      ) : (
        )} */}
        {/* <Redirect href={!user ? "/(routes)/welcome" : "/(tabs)"} /> */}
        <Redirect href="(tabs)" />
    </>
  );
}
