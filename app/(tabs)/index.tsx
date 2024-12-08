import { useEffect, useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";

import { Feather } from "@expo/vector-icons";

import { user } from "@/utils/mock/user";
import City from "@/types/city";

import { getAllCities } from "@/server/city";
import { CityCard } from "@/components/city-card";
import Product from "@/types/product";
import { getAllProducts } from "@/server/product";
import { ProductCard } from "@/components/product-card";

export default function Home() {
  const [cities, setCities] = useState<City[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const cafes = products.filter((product) => product.type === "Café");
  const cachacas = products.filter((product) => product.type === "Cachaça");

  useEffect(() => {
    getAllCities().then((data) => setCities(data));
    getAllProducts({}).then((data) => setProducts(data));
  }, []);

  return (
    <ScrollView
      id="container"
      showsVerticalScrollIndicator={false}
      className="bg-white flex-1 h-full pt-12"
    >
      <View
        id="header"
        className="w-full flex-row items-center justify-between px-6 gap-4"
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
          className="min-w-[280] md:w-[680] rounded-full bg-zinc-50 border border-zinc-300 p-4 flex-row items-center gap-2"
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

      <View id="footer" className="h-32"></View>
    </ScrollView>
  );
}
