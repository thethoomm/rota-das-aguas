import { useEffect } from "react";
import { usePathname } from "expo-router";
import { Stack } from "expo-router/stack";
import analytics from '@react-native-firebase/analytics';

import { SessionProvider } from "@/contexts/useSession";

import "../styles/global.css";

export default function RootLayout() {

  const pathname = usePathname()

  useEffect(() => {
    async function logScreenView() {
      try {
        await analytics().logScreenView({
          screen_name: pathname,
          screen_class: pathname
        })
      } catch (error) {
        console.error(error);
      }
    }

    logScreenView()
  }, [pathname])

  return (
    <SessionProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SessionProvider>
  );
}
