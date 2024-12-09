import { Image, TouchableOpacity } from "react-native";

import { useSession } from "@/contexts/useSession";
import { defaultUser } from "@/utils/default-user";

type AvatarProps = {
  className?: string;
  onPress?: () => void
};

export function Avatar({ className = "size-12", onPress }: AvatarProps) {
  const { session } = useSession();

  const user = session || defaultUser;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <Image
        source={{
          uri: user.photo,
        }}
        className={`rounded-full ${className}`}
      />
    </TouchableOpacity>
  );
}
