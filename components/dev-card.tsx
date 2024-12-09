import Dev from "@/types/dev";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";

import linkedin from "@/assets/icons/linkedin.png";

interface DevCardProps {
  dev: Dev;
}

export function DevCard({ dev }: DevCardProps) {
  async function openLinkedIn() {
    Linking.openURL(dev.linkedin).catch((err) =>
      console.error("Erro ao abrir o LinkedIn", err)
    );
  }

  return (
    <TouchableOpacity
      id="dev-card"
      activeOpacity={0.7}
      className="rounded-lg flex-row items-center gap-1 bg-[#fff] mb-4"
      onPress={openLinkedIn}
    >
      <Image
        source={{
          uri: dev.photo,
        }}
        className="w-16 h-full rounded-l-lg"
      />
      <View id="content" className="p-3">
        <Text className="font-semibold">{dev.name}</Text>
        <Text className="text-sm text-gray-500">{dev.course}</Text>
        <View id="linkedin" className="flex-row gap-2">
          <Image source={linkedin} className="size-4" />
          <Text className="text-xs font-semibold">{dev.linkedin}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
