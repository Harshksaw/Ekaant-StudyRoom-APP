import AsyncStorage from "@react-native-async-storage/async-storage";
export const getUserId = async () => {
  const res = await AsyncStorage.getItem("userData");
  const data = JSON.parse(res);
  // console.log("🚀 ~ getUserId ~ data:", data)
  // console.log("🚀 ~ getUserId ~ data:",  data.data.user.id)
  return data; // Return userId directly
};
