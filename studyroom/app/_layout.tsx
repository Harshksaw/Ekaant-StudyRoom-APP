import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, useColorScheme } from 'react-native';
import TabsIndex from './index';
import CardDetailScreen from '@/screens/home/card/card.details';
import { ToastProvider } from "react-native-toast-notifications";
import * as Font from 'expo-font';
import { Provider } from 'react-redux';
import store from '@/redux/store';




export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  


  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RootLayoutNav/>
  );
}

function RootLayoutNav() {


    
  return (

<Provider
store={store}
>
    <ToastProvider>

    

      <Stack screenOptions={{ headerShown: false }}>
         <Stack.Screen name="index"
          options={{
            headerShown: false
          }}
         />
        <Stack.Screen name="(routes)/welcome/index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(routes)/login/index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(routes)/signup/index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(routes)/card-details/index"
          
        options={{
          headerShown: false
        }} />


        <Stack.Screen name="(routes)/onboarding/index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(routes)/friend/index" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(routes)/library/library.booking" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(routes)/library/checkout.screen" options={{
          headerShown: false
        }} />
        <Stack.Screen name="(routes)/library/invoice.screen" options={{
          headerShown: false
        }} />
    
        <Stack.Screen name="(tabs)" options={{
          headerShown: false
        }} />
   
      </Stack>

      </ToastProvider>
      </Provider>

  );
}