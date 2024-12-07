import { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { getCityProducers } from "@/server/city";

import City from "@/types/city";
import Producer from "@/types/producer";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { ProducerCard } from "@/components/producer-card";
import { Separator } from "@/components/separator";
import { ShowMoreText } from "@/components/show-more-text";

export default function CityDetails() {
  const [producers, setProducers] = useState<Producer[]>([]);

  const { city: rawCity } = useLocalSearchParams();

  const city = rawCity ? (JSON.parse(rawCity as string) as City) : null;

  useEffect(() => {
    getCityProducers(city as City).then((data) => setProducers(data));
  }, [city]);

  function backTo() {
    return router.back();
  }

  if (!city) {
    return <Text>Não encontrado</Text>;
  }

  return (
    <View id="container" className="relative">
      <ImageBackground
        source={{
          uri: city.image,
        }}
        className="w-full h-[300] absolute top-0 p-8"
      >
        <TouchableOpacity
          activeOpacity={0.7}
          className="p-4 bg-white w-[52] rounded-full items-center justify-center"
          onPress={backTo}
        >
          <Feather name="chevron-left" size={24} />
        </TouchableOpacity>
      </ImageBackground>

      <View id="content" className="bg-white h-full top-[280] rounded-t-3xl">
        <View
          id="header"
          className="p-6 pb-0 mb-4 flex-row justify-between items-center"
        >
          <Text className="text-2xl font-semibold w-[200]">{city.name}</Text>
          <View id="rating" className="flex-row w-[80] items-center gap-2">
            <FontAwesome name="star" size={16} color="#f59e0b" />
            <Text className="text-base text-gray-500">
              {city.rating.average} ({city.rating.total})
            </Text>
          </View>
        </View>

        <Separator />

        <View id="description" className="px-6 mb-4">
          <Text className="text-xl font-semibold">Sobre {city.name}</Text>
          <ShowMoreText text={city.description} className="text-gray-500"/>
        </View>

        <Separator />

        <View id="top">
          <View id="top-text" className="px-6 mb-4">
            <Text className="text-xl font-semibold">Principais Produtores</Text>
            <Text className="text-base text-gray-500">
              Descubra os produtores que fazem {city.name} ser única!
            </Text>
          </View>
          <ScrollView
            id="producers"
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-2"
          >
            {producers.map((producer) => (
              <ProducerCard key={producer.id} producer={producer} />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}
