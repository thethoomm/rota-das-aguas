import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { user } from "@/utils/mock/user";
import City from "@/types/city";

import { getAllCities } from "@/server/city";
import { CityCard } from "@/components/city-card";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    getAllCities().then((data) => setCities(data));
  }, []);

  return (
    <View id="container" className="bg-white flex-1 pt-12">
      <View
        id="header"
        className="w-full flex-row items-center justify-between px-6"
      >
        <Image
          id="avatar"
          source={{
            uri: user.photo,
          }}
          className="rounded-full size-14"
        />
        <View
          id="search-bar"
          className="w-[280] rounded-full border border-zinc-300 p-4 flex-row items-center gap-2"
        >
          <Feather name="search" size={16} />
          <TextInput
            className="flex-1"
            placeholder="Aonde nós podemos te levar?"
          />
        </View>
      </View>

      <View id="initial" className="gap-4 mt-6">
        <View id="initial-text" className="px-6">
          <Text className="font-semibold text-xl">
            Explore Circuito das Águas!
          </Text>
          <Text className="text-base text-gray-500">
            Desbloqueie sua próxima experiência
          </Text>
        </View>
        <ScrollView
          id="initial-content"
          className="w-full"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {cities.map((city) => (
            <CityCard key={city.id} city={city} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
