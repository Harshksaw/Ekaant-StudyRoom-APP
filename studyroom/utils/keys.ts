import AsyncStorage from "@react-native-async-storage/async-storage";
export const getUserId = async () => {
  const res = await AsyncStorage.getItem("userData");
  const data = JSON.parse(res);
  console.log("🚀 ~ getUserId ~ data:",  data.user.id)
  return data.user.id; // Return userId directly
};
