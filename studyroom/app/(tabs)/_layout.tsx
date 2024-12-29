import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";
import store from "@/redux/store";
import Feather from "react-native-vector-icons/Feather";
import { View } from "react-native";

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

            tabBarIcon: ({ focused }) => (
              <>
                <Feather
                  name="home"
                  color={focused ? "#0077B6" : "#263238"}
                  size={27}
                />
                {focused && (
                  <View
                    style={{
                      backgroundColor: "#0077B6",
                      width: 16,
                      height: 2,
                      borderRadius: 10,
                      marginTop: 4,
                    }}
                  />
                )}
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="search/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <>
                <Ionicons
                  name="bag-handle-outline"
                  color={focused ? "#0077B6" : "#263238"}
                  size={28}
                />
                {focused && (
                  <View
                    style={{
                      backgroundColor: "#0077B6",
                      width: 16,
                      height: 2,
                      borderRadius: 10,
                      marginTop: 4,
                    }}
                  />
                )}
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="bookings/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <>
                <Ionicons
                  name="bookmarks-outline"
                  color={focused ? "#0077B6" : "#263238"}
                  size={24}
                />
                {focused && (
                  <View
                    style={{
                      backgroundColor: "#0077B6",
                      width: 16,
                      height: 2,
                      borderRadius: 10,
                      marginTop: 4,
                    }}
                  />
                )}
              </>
            ),
          }}
        />

        <Tabs.Screen
          name="profile/index"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <>
                <Ionicons
                  name="person-circle-outline"
                  color={focused ? "#0077B6" : "#263238"}
                  size={30}
                />
                {focused && (
                  <View
                    style={{
                      backgroundColor: "#0077B6",
                      width: 16,
                      height: 2,
                      borderRadius: 10,
                      marginTop: 4,
                    }}
                  />
                )}
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="menu/index"
          options={{
            title: "Menu",
            tabBarIcon: ({ focused }) => (
              <>
                <MaterialIcons
                  name="format-list-bulleted"
                  color={focused ? "#0077B6" : "#263238"}
                  size={24}
                />
                {focused && (
                  <View
                    style={{
                      backgroundColor: "#0077B6",
                      width: 16,
                      height: 2,
                      borderRadius: 10,
                      marginTop: 4,
                    }}
                  />
                )}
              </>
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
}
