import AsyncStorage from "@react-native-async-storage/async-storage";
export const getUserId = async () => {
  const res = await AsyncStorage.getItem("userData");
  console.log("Res ", res);
  const data = JSON.parse(res);
  console.log("Keys ", data.user_id); // Adjusted to match the provided JSON structure
  return data.user_id; // Return userId directly
};