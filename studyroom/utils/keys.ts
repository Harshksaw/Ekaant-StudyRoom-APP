import AsyncStorage from "@react-native-async-storage/async-storage";
export const getUserId = async () => {
  const res = await AsyncStorage.getItem("userData");
  const data = JSON.parse(res);
  return data.data.user_id.id; // Return userId directly
};
