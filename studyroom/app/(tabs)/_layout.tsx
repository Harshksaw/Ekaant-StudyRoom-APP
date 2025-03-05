import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Feather from "react-native-vector-icons/Feather";
import { Platform, Text, View } from "react-native";
import React from "react";
import ff from "@/constants/fonts";
import { h, w } from "@/constants/size";
import { BookSvg, JobSvg, Profile } from "@/assets/svg";

// TabBar Icon Component
const tabBarIcon = (
  focused: boolean,
  IconType: React.ComponentType<any>,
  IconName: string,
  title: string
) => {
  const Icon = IconType;
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: title ? 0 : h(-10),
        backgroundColor: !title ? "#0077B6" : "transparent",
        borderRadius: 999,
        padding: w(title ? 0 : 8),
      }}
    >
      {title === "Profile" && (
        <Profile fill={focused ? "#0077B6" : "#263238"} />
      )}
      {(title === "Home" || !title) && (
        <Icon
          name={IconName}
          color={title ? (focused ? "#0077B6" : "#263238") : "#fff"}
          size={w(21)}
        />
      )}
      {title === "Job" && <JobSvg color={focused ? "#0077B6" : "#263238"} />}
      {title === "Bookings" && (
        <BookSvg color={focused ? "#0077B6" : "#263238"} />
      )}
      {title && (
        <Text
          style={{
            fontFamily: ff.deckRegular,
            color: focused ? "#0077B6" : "#263238",
            fontSize: w(12),
            marginTop: h(2),
          }}
        >
          {title}
        </Text>
      )}
    </View>
  );
};

// Main Tab Layout Component
export default function TabsLayout() {
  const tabsData = [
    {
      title: "Home",
      name: "index",
      tabBarIcon: ({ focused }: { focused: boolean }) =>
        tabBarIcon(focused, Feather, "home", "Home"),
      isIos: true,
    },
    {
      title: "Job",
      name: "search/index",
      tabBarIcon: ({ focused }: { focused: boolean }) =>
        tabBarIcon(focused, Ionicons, "bag-handle-outline", "Job"),
      isIos: false,
    },
    {
      title: "Menu",
      name: "menu/index",
      tabBarIcon: ({ focused }: { focused: boolean }) =>
        tabBarIcon(focused, Ionicons, "grid-outline", ""),
      isIos: false,
    },
    {
      title: "Bookings",
      name: "bookings/index",
      tabBarIcon: ({ focused }: { focused: boolean }) =>
        tabBarIcon(focused, Ionicons, "bookmarks-outline", "Bookings"),
      isIos: true,
    },
    {
      title: "Profile",
      name: "profile/index",
      tabBarIcon: ({ focused }: { focused: boolean }) =>
        tabBarIcon(focused, FontAwesome, "user-o", "Profile"),
      isIos: true,
    },
  ];

  return (
    <Provider store={store}>
      <Tabs
        screenOptions={() => ({
          headerShown: false,
          tabBarLabel: () => null,
          tabBarStyle: {
            height: h(50),
            width: "100%", // Ensures full width
            position: "absolute",
            bottom: 0,
            paddingHorizontal: 0,
            flexDirection: "row", // Ensures horizontal layout for tabs
            justifyContent: "space-between",
          },
          tabBarItemStyle: {},
        })}
      >
        {tabsData.map((item) => (
          <Tabs.Screen
            key={item?.name}
            name={item?.name}
            options={{
              title: item?.title,
              tabBarIcon: item?.tabBarIcon,
              href: item?.isIos
                ? undefined
                : Platform.OS === "ios"
                ? null
                : undefined,
            }}
          />
        ))}
      </Tabs>
    </Provider>
  );
}
