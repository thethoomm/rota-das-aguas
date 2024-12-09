import { useSession } from "@/contexts/useSession";
import colors from "@/styles/colors";
import Route from "@/types/route";
import { Feather, Fontisto } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  ImageBackground,
  Linking,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import analytics from "@react-native-firebase/analytics";

export default function RouteDetails() {
  const { route: rawRoute } = useLocalSearchParams();
  const { session: user } = useSession();

  const route = rawRoute ? (JSON.parse(rawRoute as string) as Route) : null;

  function backTo() {
    return router.back();
  }

  async function openMap() {
    await analytics().logEvent("do_route", {
      item: JSON.stringify(route),
      user: user?.isGuest
        ? "guest"
        : JSON.stringify({
            id: user?.id,
            name: user?.name,
          }),
    });

    Linking.openURL(route?.link as string).catch((err) =>
      console.error("Erro ao abrir o Google Maps", err)
    );
  }

  async function shareRoute() {
    try {
      await Share.share({
        message: `Confira esta rota incrível: ${route?.name} - ${route?.city}\n${route?.link}`,
      });
    } catch (error) {
      console.error("Erro ao compartilhar:", error);
    }
  }

  if (!route) {
    return <Text>Sem rota</Text>;
  }

  return (
    <View id="container" className="flex-1 bg-white p-6">
      <View id="top-actions" className="mb-4">
        <TouchableOpacity
          activeOpacity={0.7}
          className="py-4 w-[110px] flex-row rounded-full items-center justify-start"
          onPress={backTo}
        >
          <Feather name="chevron-left" size={24} />
          <Text className="text-base font-semibold text-black">Voltar</Text>
        </TouchableOpacity>
      </View>

      <View id="header" className="mb-6">
        <Text className="text-lg text-gray-500 font-semibold uppercase">
          {route.city}
        </Text>
        <Text className="text-2xl font-semibold">{route.name}</Text>
      </View>

      <View id="content" className="mb-4 flex-1">
        <View id="author" className="flex-row items-center gap-2 mb-6">
          <Image
            source={{
              uri: "https://s3-alpha-sig.figma.com/img/7019/9f29/eda8c6469469c639de31c81a944d3cc2?Expires=1734307200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AMudDSI~PChEPV82rDOqdobDEomaRt6fMrSViOcV1anflfkp5Pz7cBkAK10yNID9UQ-dPkUrUNU-LykqcXurhinXWfC6B26lO5A0ej44QHN8q6Pagspkf6fn3tRUCWZwUlp7PSNhHxwguje4HIPkiG0h4qc5MJUXyNb0ae4HxSLYWpLYNgXuCyOaJkNwUzkdw2hMcB7Y822J2h03sdsRpvI~kOiZGVq-~5~7Fx9ftb8uHbMrf8mc4-Chn~~zIQHF62LQMiLf9aThJf7sFRARH4ESxMvu7QLc1PT8y~zb-WbntxVWY7TXJ~8H30QoiPnjgiRmRHVuNb1Elyljj46luw__",
            }}
            className="size-16 rounded-full"
          />
          <View id="author-text" className="">
            <Text className="text-xl font-semibold text-blue-500">
              @{route.author}
            </Text>
            {route.author === "Rota" && (
              <Text className="text-lg text-gray-500">Rota padrão</Text>
            )}
          </View>
        </View>
        <ImageBackground
          source={{
            uri: route.image,
          }}
          imageClassName="rounded-xl opacity-50"
          className="flex-1 rounded-xl p-4 justify-between bg-black"
        >
          <View
            id="city"
            className="w-[150] p-2 rounded-2xl flex-row items-center gap-2"
          >
            <Fontisto name="map-marker-alt" size={16} color={colors.white} />
            <Text className="text-white font-semibold">{route.city}</Text>
          </View>
          <View id="bottom-image" className="flex-row justify-between w-[200]">
            <View id="route-info" className="items-start gap-2 w-full">
              <Text className="text-lg text-white md:w-[280]">
                Tamanho do trajeto:
              </Text>
              <View
                id="distance-container"
                className="flex-row items-baseline w-[120]"
              >
                <Text className="text-5xl font-semibold text-white">
                  {route.distance.toFixed(1)}
                </Text>
                <Text className="text-xl font-semibold text-white">km</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View id="footer" className="flex-row w-full items-center gap-4">
        <TouchableOpacity
          activeOpacity={0.7}
          className="p-6 bg-black rounded-lg w-5/6"
          onPress={openMap}
        >
          <Text className="text-white text-lg text-center">Ir agora</Text>
        </TouchableOpacity>
        <TouchableOpacity
          id="share"
          activeOpacity={0.7}
          className="w-full"
          onPress={shareRoute}
        >
          <Feather name="share-2" size={30} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
