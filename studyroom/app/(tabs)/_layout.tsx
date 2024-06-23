// import useUser from "@/hooks/auth/useUser";
import { Tabs } from "expo-router";
import { Image } from "react-native";

export default function TabsLayout() {
  // const { user } = useUser();
  return (
    <Tabs
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
  
        switch (route.name) {
          case 'index':
            iconName = require("../../assets/images/HomeIcon.png");
            break;
          case 'search/index':
            iconName = require("../../assets/images/BookingIcon.png");
            break;
          case 'courses/index':
            iconName = require("../../assets/images/BookingIcon.png");
            break;
          case 'profile/index':
            iconName = require("../../assets/images/BookingIcon.png");
            break;
          case '(routes)/card-details/index':
            iconName = require("../../assets/images/BookingIcon.png");
            break;
          default:
            iconName = require("../../assets/images/BookingIcon.png");
            break;
        }
  
        return <Image style={{ width: 25, height: 25, tintColor: color }} source={iconName} />;
      },
      headerShown: false,
      tabBarShowLabel: false,
    })}
  >
    <Tabs.Screen name="index" />
    <Tabs.Screen name="search/index" />
    <Tabs.Screen name="courses/index" />
    <Tabs.Screen name="profile/index" />
    <Tabs.Screen
      name="(routes)/card-details/index"
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    />
  </Tabs>
  );
}
