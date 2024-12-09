import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { useSession } from "@/contexts/useSession";
import { defaultUser } from "@/utils/default-user";

import colors from "@/styles/colors";

export default function Profile() {
  const { session, login, logout } = useSession();

  const user = session || defaultUser;

  const items: {
    icon: keyof typeof MaterialIcons.glyphMap;
    label: string;
  }[] = [
    {
      icon: "history",
      label: "Histórico de Rotas",
    },
  ];

  function backTo() {
    return router.back();
  }


  const handleLogout = () => {
    Alert.alert("Sair", "Tem certeza que deseja sair?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Sim",
        onPress: logout,
        style: "destructive",
      },
    ]);
  };

  return (
    <View id="container" className="flex-1 bg-white py-12">
      <View id="top-actions" className="px-12 mb-4">
        <TouchableOpacity
          activeOpacity={0.7}
          className="py-4 w-[110px] flex-row rounded-full items-center justify-start"
          onPress={backTo}
        >
          <Feather name="chevron-left" size={24} />
          <Text className="text-base font-semibold text-black">Voltar</Text>
        </TouchableOpacity>
      </View>

      <View id="content" className="flex-1 items-center px-12">
        <View id="avatar" className="gap-4 mb-6 items-center">
          <Avatar className="size-40 md:size-64" />
          <Text className="text-xl font-semibold text-center">{user.name}</Text>
        </View>

        {user.isGuest ? (
          <View id="guest-info">
            <TouchableOpacity
              activeOpacity={0.7}
              className="flex-row items-center justify-center gap-2 p-4 rounded-lg bg-black"
              onPress={login}
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
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            className="flex-1 w-full"
          >
            {items.map((item, index) => (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                className="flex-row border border-zinc-200 rounded-lg p-4 items-center gap-2 mb-4"
              >
                <MaterialIcons name={item.icon} size={24} />
                <Text className="text-lg font-semibold">{item.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleLogout}
              className="flex-row border border-rose-500 rounded-lg p-4 items-center gap-2"
            >
              <MaterialIcons name="exit-to-app" size={24} color="#f43f5e" />
              <Text className="text-rose-500 text-lg font-semibold">Sair</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </View>
  );
}
