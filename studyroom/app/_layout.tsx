import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import React, { useEffect } from "react";

import { ToastProvider } from "react-native-toast-notifications";

import { Provider } from "react-redux";

import store from "@/redux/store";

export default function RootLayout() {
  const [loaded] = useFonts({
    deckBold: require("../assets/fonts/TASAOrbiterDeck-Bold.otf"),
    deckMedium: require("../assets/fonts/TASAOrbiterDeck-Medium.otf"),
    deckRegular: require("../assets/fonts/TASAOrbiterDeck-Regular.otf"),
    deckSemiBold: require("../assets/fonts/TASAOrbiterDeck-SemiBold.otf"),
    displayBlack: require("../assets/fonts/TASAOrbiterDisplay-Black.otf"),
    displayBold: require("../assets/fonts/TASAOrbiterDisplay-Bold.otf"),
    displayMedium: require("../assets/fonts/TASAOrbiterDisplay-Medium.otf"),
    displayRegular: require("../assets/fonts/TASAOrbiterDisplay-Regular.otf"),
    displaySemiBold: require("../assets/fonts/TASAOrbiterDisplay-SemiBold.otf"),
    textBold: require("../assets/fonts/TASAOrbiterText-Bold.otf"),
    textMedium: require("../assets/fonts/TASAOrbiterText-Medium.otf"),
    textRegular: require("../assets/fonts/TASAOrbiterText-Regular.otf"),
    textSemiBold: require("../assets/fonts/TASAOrbiterText-SemiBold.otf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen
            name="index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(routes)/welcome/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(routes)/login/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(routes)/signup/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(routes)/card-details/index"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(routes)/onboarding/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(routes)/friend/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(routes)/library/library.booking"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(routes)/library/checkout.screen"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(routes)/library/invoice.screen"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(routes)/nearby/index"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(routes)/location/index"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ToastProvider>
    </Provider>
  );
}
