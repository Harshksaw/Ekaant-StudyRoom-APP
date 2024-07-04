
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import store from "@/redux/store";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { Image } from "expo-image";
import { Tabs } from "expo-router";
import { Provider } from "react-redux";


export default function TabsLayout() {

  const [assets] = useAssets([require('../../assets/icons/Vector.svg')]);
  
  return (
    <Provider store={store}>
    <Tabs
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName;
 
        switch (route.name) {
          // case 'index':
          //   iconName = 'home-outline'
          //   break;
          case 'search/index':
            iconName = 'bag-remove-outline'
            break;
          case 'courses/index':
            iconName = 'browsers-sharp'
            break;
          case 'profile/index':
            iconName = 'person-circle-outline';
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
    <Tabs.Screen name="index" 
    screenOptions={{

      TabBarIcon: ({ color }) => {
        return (assets && assets[0] &&   <Image source={assets[0]} style={{ width: 30, height: 30 }} />)
      
      }
    }
    
  }
    />
    <Tabs.Screen name="search/index" />
    <Tabs.Screen name="courses/index" />
    <Tabs.Screen name="profile/index" />
   
  </Tabs>
  </Provider>
  );
}
