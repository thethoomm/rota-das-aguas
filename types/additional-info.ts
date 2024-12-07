import { MaterialCommunityIcons } from "@expo/vector-icons";

type AdditionalInfo = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  content: string;
};

export default AdditionalInfo;
