import AsyncStorage from "@react-native-async-storage/async-storage";
export const getUserId = async () => {
  const res = await AsyncStorage.getItem("userData");

  const data = JSON.parse(res);
  console.log("Keys ", data.data.user_id._id); // Adjusted to match the provided JSON structure
  return data.data.user_id._id; // Return userId directly
};