
import store from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";


export default function TabsLayout() {
  
  return (
    <Provider store={store}>
    <Tabs
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
 
        switch (route.name) {
          case 'index':
            iconName = 'home-outline'
            break;
          case 'search/index':
            iconName = 'albums-outline'
            break;
          case 'courses/index':
            iconName = 'book-outline'
            break;
          case 'profile/index':
            iconName = 'cog-outline';
            break;
          case '(routes)/card-details/index':
            iconName = 'cog-outline'
            break;
          default:
            iconName = 'cog-outline'
            break;
        }
  
        return <Ionicons
        name={iconName}
        size={30}
        style={{ margin:5 , padding:0 }}
        color={color || 'black'}
        />;
      },
      headerShown: false,
      tabBarShowLabel: false,
    })}
  >
    <Tabs.Screen name="index" />
    <Tabs.Screen name="search/index" />
    <Tabs.Screen name="courses/index" />
    <Tabs.Screen name="profile/index" />
   
  </Tabs>
  </Provider>
  );
}
