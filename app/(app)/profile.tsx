import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router } from "expo-router";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";

import { Avatar } from "@/components/avatar";
import { useSession } from "@/contexts/useSession";
import { defaultUser } from "@/utils/default-user";

import colors from "@/styles/colors";
import { Separator } from "@/components/separator";
import { devs } from "@/utils/devs";
import { DevCard } from "@/components/dev-card";

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
    <ScrollView id="container" className="flex-1 bg-white py-12">
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

      <View id="content" className="flex-1 min-h-[500] items-center px-12">
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

      <View id="footer" className="px-12 h-fit mb-8">
        <Separator className="w-full" />

        <View id="greetings" className="w-full mb-4 gap-2 items-start">
          <Text className="font-semibold text-lg text-gray-500">Apoio: </Text>
          <View id="orgs" className="w-full flex-row justify-between">
            <Image
              id="acecap"
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv2cyp4NMEJYXZZXViP2z0OFV1f0s2W3CQEw&s",
              }}
              className="size-32"
            />

            <Image
              id="apccap"
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/igcachaca.appspot.com/o/imagens%2Flogo-apccap.png?alt=media&token=ca21de6c-74fc-450e-acc4-6929efdbbe8c",
              }}
              className="w-24"
            />

            <Image
              id="ifspcmp"
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgctDuv9C_jGz7KMnN5iwUh4jOgHahHiwNYA&s",
              }}
              className="w-24"
            />
          </View>
        </View>

        <Separator className="w-full" />

        <View id="devs" className="w-full items-start gap-2">
          <Text className="font-semibold text-lg text-gray-500">
            Desenvolvido por: IFSP CMP
          </Text>
          <ScrollView>
            {devs.map((dev, index) => (
              <DevCard key={index} dev={dev} />
            ))}
          </ScrollView>
        </View>
      </View>

      <View id="footer" className="h-16"></View>
    </ScrollView>
  );
}
