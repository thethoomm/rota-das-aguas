import { Avatar } from "@/components/avatar";
import { useSession } from "@/contexts/useSession";
import colors from "@/styles/colors";
import { defaultUser } from "@/utils/default-user";
import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { session } = useSession();

  const user = session || defaultUser;

  return (
    <View id="container" className="flex-1 bg-white py-12">
      <View id="content" className="flex-1 items-center">
        <View id="avatar" className="gap-4 mb-6">
          <Avatar className="size-40 md:size-64" />
          <Text className="text-xl font-semibold text-center">{user.name}</Text>
        </View>

        {user.isGuest && (
          <View id="guest-info">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center justify-center gap-2 p-4 rounded-lg bg-black"
            >
              <AntDesign name="google" size={20} color={colors.white} />
              <Text className="text-white text-lg font-semibold">
                Continuar com Google
              </Text>
            </TouchableOpacity>

            <View id="advantages" className="mt-4 px-6">
              <Text className="text-gray-500 text-center">
                Ao entrar com o Google, você terá acesso ao:
              </Text>
              <Text className="text-gray-800 font-semibold text-center">
                Histórico de Rotas
              </Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}
