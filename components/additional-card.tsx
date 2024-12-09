import { Alert, Linking, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AdditionalInfo from "@/types/additional-info";

interface AdditionalCardProps {
  info: AdditionalInfo;
}

export function AdditionalCard({ info }: AdditionalCardProps) {
  async function navigateToRef() {
    if (info.content) {
      const supported = Linking.canOpenURL(info.content);

      if (!supported) {
        Alert.alert(`Não foi possível abrir o URL ${info.content}`);
        console.error(`Não foi possível abrir o URL ${info.content}`);
      }

      await Linking.openURL(info.content);
    }
  }

  return (
    <TouchableOpacity
      id="additional-card"
      activeOpacity={0.7}
      className="flex-row items-center justify-center p-3 rounded-lg w-1/2 bg-zinc-50 border border-zinc-200 gap-2"
      onPress={navigateToRef}
    >
      <MaterialCommunityIcons name={info.icon} size={18} />
      <Text>Acesse o site</Text>
    </TouchableOpacity>
  );
}
