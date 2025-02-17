import {
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Feather from "react-native-vector-icons/Feather";
import { Dimensions, Text, View, Platform } from "react-native";
import React from "react";
import ff from "@/constants/fonts";
import { h, w } from "@/constants/size";
import { BookSvg, JobSvg, Profile } from "@/assets/svg";

const { width: screenWidth } = Dimensions.get("window");
const isTablet = screenWidth >= 768;

const tabBarIcon = (
  focused: boolean,
  IconType: React.ComponentType<any>,
  IconName: string,
  title: string
) => {
  // Remove the blue circle or any extra icon for iOS
  if (Platform.OS === "ios" && (title === "" || title === "Menu")) return null;

  const Icon = IconType;
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: title ? 0 : h(-4),
        backgroundColor: !title ? "#0077B6" : "transparent", // Ensures the blue circle is only shown for non-iOS
        borderRadius: 999,
        padding: w(title ? 0 : 6),
        height: w(isTablet ? 30 : 35),
        width: w(isTablet ? 30 : 35),
        justifyContent: "center",
      
      }}
    >
      {title === "Profile" && <Profile fill={focused ? "#0077B6" : "#263238"} />}
      {title === "Home" && (
        <Icon name={IconName} color={focused ? "#0077B6" : "#263238"} size={isTablet ? 42 : 24} />
      )}
      {/* {Platform.OS !== "ios" && title === "Job" && <JobSvg color={focused ? "#0077B6" : "#263238"} />} */}
      {title === "Bookings" && <BookSvg color={focused ? "#0077B6" : "#263238"} />}
      {title && (
        <Text
          style={{
            fontFamily: ff.deckRegular,
            color: focused ? "#0077B6" : "#263238",
            fontSize: w(6),
            marginTop: h(2),
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Provider store={store}>
      <Tabs
     screenOptions={{
      headerShown: false,
      tabBarLabel: () => null,
      tabBarStyle: {
        height: h(60),
        paddingTop: h(10),
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center", // center icons on the bottom bar
        // paddingHorizontal: w(10), // optional: remove if not needed
      },
      tabBarItemStyle: {
        alignItems: "center",
        justifyContent:"center",
        marginHorizontal: w(60), // add margin to space items apart
      },
    }}
      >
        {/* ✅ Keep Home for all platforms */}
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) =>
              tabBarIcon(focused, Feather, "home", "Home"),
          }}
        />

        {/* ❌ Remove "Job" for iOS */}
        {/* {Platform.OS !== "ios" && (
          <Tabs.Screen
            name="search/index"
            options={{
              title: "Job",
              tabBarIcon: ({ focused }) =>
                tabBarIcon(focused, Ionicons, "bag-handle-outline", "Job"),
            }}
          />
        )} */}

        {/* ❌ Remove "Menu" for iOS */}
        {/* {Platform.OS !== "ios" && (
          <Tabs.Screen
            name="menu/index"
            options={{
              title: "Menu",
              tabBarIcon: ({ focused }) =>
                tabBarIcon(focused, Ionicons, "grid-outline", "Menu"),
            }}
          />
        )} */}

        {/* ✅ Keep Bookings */}
        <Tabs.Screen
          name="bookings/index"
          options={{
            title: "Bookings",
            tabBarIcon: ({ focused }) =>
              tabBarIcon(focused, Ionicons, "bookmarks-outline", "Bookings"),
          }}
        />

        {/* ✅ Keep Profile */}
        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) =>
              tabBarIcon(focused, FontAwesome, "user-o", "Profile"),
          }}
        />
      </Tabs>
    </Provider>
  );
}
