import {
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Feather from "react-native-vector-icons/Feather";
import { Dimensions, Image, Text, View } from "react-native";
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
  const Icon = IconType;
  return (
    <View
      style={{
        alignItems: "center",
        marginTop: title ? 0 : h(-4),
        backgroundColor: !title ? "#0077B6" : "transparent",
        borderRadius: 999,
        padding: w(title ? 0 : 6),
        height: w(isTablet ? 30 : 35),
        
        width: w(isTablet ? 30 : 35),

        justifyContent: "center",

      }}
    >
      {title === "Profile" && (
        <Profile fill={focused ? "#0077B6" : "#263238"} />
      )}
      {(title === "Home" || !title) && (
        <Icon

          name={IconName}
          color={title ? (focused ? "#0077B6" : "#263238") : "#fff"}
        marginTop={h(-4)}
       
          size={isTablet ? 42 : 24}
        />
      )}
      {title === "Job" && <JobSvg color={focused ? "#0077B6" : "#263238"} />}
      {title === "Bookings" && (
        <BookSvg color={focused ? "#0077B6" : "#263238"} 

        />
      )}
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
      {/* {focused && (
        <View
          style={{
            backgroundColor: "#0077B6",
            width: 16,
            height: 2,
            borderRadius: 10,
            marginTop: 4,
          }}
        />
      )} */}
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Provider store={store}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          
          tabBarLabel: () => null,
          tabBarStyle: {

            height: h(60),
            paddingTop: h(10),

          },
        })}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) =>
              tabBarIcon(focused, Feather, "home", "Home"),
          }}
        />
        <Tabs.Screen
          name="search/index"
          options={{
            title: "Job",
            tabBarIcon: ({ focused }) =>
              tabBarIcon(focused, Ionicons, "bag-handle-outline", "Job"),
          }}
        />
        <Tabs.Screen
          name="menu/index"
          options={{
            title: "Menu",

            tabBarIcon: ({ focused }) =>
              tabBarIcon(focused, Ionicons, "grid-outline", ""),
          }}
        />
        <Tabs.Screen
          name="bookings/index"
          options={{
            title: "Bookings",
            tabBarIcon: ({ focused }) =>
              tabBarIcon(focused, Ionicons, "bookmarks-outline", "Bookings"),
          }}
        />

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
