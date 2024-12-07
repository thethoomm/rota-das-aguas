import FontAwesome from "@expo/vector-icons/FontAwesome";
import colors from "@/styles/colors";
import { Tabs } from "expo-router/tabs";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue[500],
        tabBarStyle: {
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
          tabBarIcon: ({ color }) => (
            <FontAwesome name="home" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
