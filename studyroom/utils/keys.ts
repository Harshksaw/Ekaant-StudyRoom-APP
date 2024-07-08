import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserId = async () => {
    const res = await AsyncStorage.getItem("userData");
    console.log(res)
    const data = JSON.parse(res);
    console.log(",,,", data.data.user._id);
    return(data.data.user._id)
  };