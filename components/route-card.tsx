import { useSession } from "@/contexts/useSession";
import colors from "@/styles/colors";
import Route from "@/types/route";
import { Fontisto, Octicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { ImageBackground, Text, TouchableOpacity, View } from "react-native";
import analytics from '@react-native-firebase/analytics';


interface RouteCardProps {
  route: Route;
}

export function RouteCard({ route }: RouteCardProps) {
  const { session: user } = useSession();

  async function navigateTo() {
    await analytics().logEvent("open_route", {
      item: JSON.stringify(route),
      user: user?.isGuest
        ? "guest"
        : JSON.stringify({
            id: user?.id,
            name: user?.name,
          }),
    });

    return router.push({
      pathname: "/(app)/route/[route]",
      params: {
        route: JSON.stringify(route),
      },
    });
  }

  return (
    <TouchableOpacity
      id="route-card"
      activeOpacity={0.7}
      className="mb-4"
      onPress={navigateTo}
    >
      <ImageBackground
        source={{
          uri: route.image,
        }}
        imageClassName="rounded-lg"
        className="h-56 w-full rounded-lg"
      >
        <View id="route-content" className="h-full justify-between">
          <View id="top" className="p-6">
            <View
              id="city"
              className="w-[150] p-2 rounded-2xl flex-row items-center gap-2"
            >
              <Fontisto name="map-marker-alt" size={16} color={colors.white} />
              <Text className="text-white font-semibold">{route.city}</Text>
            </View>
          </View>

          <View id="bottom" className="rounded-lg p-6 bg-black/80">
            <Text className="text-xl text-white font-semibold">
              {route.name}
            </Text>
            <View
              id="author"
              className="flex-row items-center justify-start gap-1 w-[150]"
            >
              <Text className="text-base text-zinc-300 font-semibold">Por</Text>
              <View
                id="account"
                className="flex-row items-baseline justify-center gap-1"
              >
                <Text className="text-base font-bold text-blue-400">
                  @{route.author}
                </Text>
                {route.author === "Rota" && (
                  <Octicons
                    name="check-circle-fill"
                    size={12}
                    color={colors.blue[400]}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}
