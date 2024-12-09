import { useSession } from "@/contexts/useSession";
import { defaultUser } from "@/utils/default-user";
import { Image, TouchableOpacity } from "react-native";

type AvatarProps = {
  className?: string;
};

export function Avatar({ className = "size-12" }: AvatarProps) {
  const { session } = useSession();

  const user = session || defaultUser;

  return (
    <TouchableOpacity activeOpacity={0.7}>
      <Image
        source={{
          uri: user.photo,
        }}
        className={`rounded-full ${className}`}
      />
    </TouchableOpacity>
  );
}
