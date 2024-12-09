import { Tabs } from "expo-router/tabs";
import { Feather } from "@expo/vector-icons";

import colors from "@/styles/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.black,
        tabBarLabelStyle: {
          fontSize: 16
        },
        tabBarStyle: {
          height: 60,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: colors.white,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Feather name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: "Rotas",
          tabBarIcon: ({ color, size }) => (
            <Feather name="map" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
