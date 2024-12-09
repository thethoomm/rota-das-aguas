import { Stack } from "expo-router/stack";
import "../styles/global.css";
import { SessionProvider } from "@/contexts/useSession";

export default function RootLayout() {
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
