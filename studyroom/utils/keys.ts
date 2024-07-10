import AsyncStorage from "@react-native-async-storage/async-storage";
export const getUserId = async () => {
  const res = await AsyncStorage.getItem("userData");
  const data = JSON.parse(res);
  console.log(",,,", data.user._id);
  return data.user._id; // Return userId directly
};