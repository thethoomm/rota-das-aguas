import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";

import { user } from "@/utils/mock/user";

import { CityCard } from "@/components/city-card";
import { ProductCard } from "@/components/product-card";
import { getAllCities } from "@/server/city";
import { getAllProducts } from "@/server/product";
import City from "@/types/city";
import Product from "@/types/product";
import Producer from "@/types/producer";
import { getAllProducers } from "@/server/producer";
import { ProducerCard } from "@/components/producer-card";

import rotaIcon from "@/assets/images/icon.png";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [producers, setProducers] = useState<Producer[]>([]);

  const cafes = products.filter((product) => product.type === "Café");
  const cachacas = products.filter((product) => product.type === "Cachaça");

  useEffect(() => {
    getAllCities().then((data) => setCities(data));
    getAllProducts({}).then((data) => setProducts(data));
    getAllProducers().then((data) => setProducers(data));
  }, []);

  return (
    <ScrollView
      id="container"
      showsVerticalScrollIndicator={false}
      className="bg-white flex-1 h-full pt-8"
    >
      <View
        id="header"
        className="w-full flex-row items-center justify-between px-6 gap-4 pb-4 border-b border-zinc-200"
      >
        <View id="app" className="flex-row items-center justify-center gap-2">
          <Image source={rotaIcon} className="size-16 bg-[#fff] rounded-full" />
          <Text className="text-xl font-semibold">Rota das Águas</Text>
        </View>
        <Image
          id="avatar"
          source={{
            uri: user.photo,
          }}
          className="rounded-full size-12"
        />
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

      {/* Anuncio */}

      <View id="cafes" className="gap-4 mt-6">
        <View id="cafes-text" className="px-6">
          <Text className="font-semibold text-xl">
            Explore os Cafés do Circuito!
          </Text>
          <Text className="text-base text-gray-500">
            Desbloqueie novas experiências a cada visita.
          </Text>
        </View>
        <ScrollView
          id="cafes-content"
          className="w-full"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {cafes.map((cafe) => (
            <ProductCard key={cafe.id} product={cafe} />
          ))}
        </ScrollView>
      </View>

      <View id="cachacas" className="gap-4 mt-6">
        <View id="cachacas-text" className="px-6">
          <Text className="font-semibold text-xl">
            Descubra as Cachaças do Circuito!
          </Text>
          <Text className="text-base text-gray-500">
            Aventure-se em novos sabores a cada gole.
          </Text>
        </View>
        <ScrollView
          id="cachacas-content"
          className="w-full"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {cachacas.map((cachaca) => (
            <ProductCard key={cachaca.id} product={cachaca} />
          ))}
        </ScrollView>
      </View>

      <View id="producers" className="gap-4 mt-6">
        <View id="producers-text" className="px-6">
          <Text className="font-semibold text-xl">Conheça os produtores</Text>
          <Text className="text-base text-gray-500">
            Aventure-se em novos sabores a cada gole.
          </Text>
        </View>
        <ScrollView
          id="producers-content"
          className="w-full"
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {producers.map((producer) => (
            <ProducerCard key={producer.id} producer={producer} />
          ))}
        </ScrollView>
      </View>

      <View id="footer" className="h-16"></View>
    </ScrollView>
  );
}
