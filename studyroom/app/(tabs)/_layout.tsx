import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { Profile, Bookings, Home, Jobs } from "@/assets";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabsLayout() {
  return (
    <Provider store={store}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
        })}
        
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Profile",

            tabBarIcon: ({ focused }) => <Home focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="search/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => <Jobs focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="courses/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => <Bookings focused={focused} />,
          }}
        />
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => <Profile focused={focused} />,
          }}
        />
      </Tabs>
    </Provider>
  );
}
