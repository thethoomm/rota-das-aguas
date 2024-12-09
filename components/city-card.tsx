import { Image, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import analytics from "@react-native-firebase/analytics";

import { useSession } from "@/contexts/useSession";
import City from "@/types/city";

interface CityCardProps {
  city: City;
}

export function CityCard({ city }: CityCardProps) {
  const { session: user } = useSession();

  async function navigateTo() {
    await analytics().logEvent("open_city", {
      item: JSON.stringify(city),
      user: user?.isGuest
        ? "guest"
        : JSON.stringify({
            id: user?.id,
            name: user?.name,
          }),
    });

    return router.push({
      pathname: "/(app)/city/[city]",
      params: {
        city: JSON.stringify(city),
      },
    });
  }

  return (
    <TouchableOpacity
      id="city-card"
      className="min-w-48 items-center justify-center gap-2 ml-6"
      activeOpacity={0.7}
      onPress={navigateTo}
    >
      <Image
        source={{
          uri: city.image,
        }}
        className="w-full h-36 rounded-xl"
      />
      <Text className="font-semibold">{city.name}</Text>
    </TouchableOpacity>
  );
}
