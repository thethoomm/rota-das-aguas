import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { Separator } from "@/components/separator";
import { ShowMoreText } from "@/components/show-more-text";
import colors from "@/styles/colors";
import Producer from "@/types/producer";
import { AdditionalCard } from "@/components/additional-card";
import AdditionalInfo from "@/types/additional-info";
import { useEffect, useState } from "react";
import Product from "@/types/product";
import { getProducerProducts } from "@/server/producer";
import { ProductCard } from "@/components/product-card";

export default function ProducerDetails() {
  const [products, setProducts] = useState<Product[]>([]);

  const { producer: rawProducer } = useLocalSearchParams();

  const producer = rawProducer
    ? (JSON.parse(rawProducer as string) as Producer)
    : null;

  useEffect(() => {
    getProducerProducts(producer as Producer).then((data) => setProducts(data));
  }, [producer]);

  function backTo() {
    return router.back();
  }

  if (!producer) {
    return <Text>Sem produtor</Text>;
  }

  const additional: AdditionalInfo[] = [
    {
      icon: "web",
      label: "Acesse o site",
      content: producer.website,
    },
  ];

  return (
    <ScrollView
      id="container"
      className="flex-1 bg-white"
      showsVerticalScrollIndicator={false}
    >
      <ImageBackground
        source={{
          uri: producer.image,
        }}
        className="w-full h-[310px] absolute top-0"
      >
        <TouchableOpacity
          activeOpacity={0.7}
          className="p-4 bg-white w-[52px] rounded-full items-center justify-center mt-8 ml-4"
          onPress={backTo}
        >
          <Feather name="chevron-left" size={24} />
        </TouchableOpacity>
      </ImageBackground>

      <View id="content" className="mt-[280px] rounded-t-3xl bg-white">
        <View id="header" className="p-6 pb-0 mb-4 gap-1">
          <View
            id="header-text"
            className="flex-row justify-between items-center"
          >
            <Text className="text-2xl font-semibold w-[200px]">
              {producer.name}
            </Text>
            <View id="rating" className="flex-row w-[80px] items-center gap-2">
              <FontAwesome name="star" size={16} color="#f59e0b" />
              <Text className="text-base text-gray-500">
                {producer.rating.average} ({producer.rating.total})
              </Text>
            </View>
          </View>
          <View id="location" className="flex-row items-center gap-1">
            <Feather name="map-pin" size={14} color={colors.blue[500]} />
            <Text className="text-base text-blue-500">
              Ver localização no mapa
            </Text>
          </View>
        </View>

        <Separator />

        {additional.length > 0 && (
          <View id="additional" className="px-6 mb-4 gap-2">
            <Text className="text-xl font-semibold">
              Informações adicionais
            </Text>
            <View id="content">
              {additional.map((info, index) => (
                <AdditionalCard key={index} info={info} />
              ))}
            </View>
          </View>
        )}

        <View id="description" className="px-6 mb-4">
          <Text className="text-xl font-semibold">Sobre nós</Text>
          <ShowMoreText text={producer.description} className="text-gray-500" />
        </View>

        <Separator />

        <View id="products">
          <View id="products-text" className="px-6 mb-4">
            <Text className="text-xl font-semibold">Produtos</Text>
            <Text className="text-base text-gray-500">
              Veja os produtos da {producer.name}!
            </Text>
          </View>
          <ScrollView
            id="products-list"
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-2 mb-4"
          >
            {products.map((product) => (
              <ProductCard key={producer.id} product={product} />
            ))}
          </ScrollView>
        </View>

        <View id="galery">
          <View id="galery-text" className="px-6 mb-4">
            <Text className="text-xl font-semibold">Galeria</Text>
            <Text className="text-base text-gray-500">
              Descubra como é a experiência na {producer.name}!{" "}
            </Text>
          </View>
          <ScrollView
            id="galery-list"
            horizontal
            showsHorizontalScrollIndicator={false}
            className="gap-2 mb-4"
          >
            {producer.photos.map((photo, index) => (
              <Image
                key={index}
                source={{
                  uri: photo,
                }}
                className="w-48 h-72 ml-6 rounded-lg object-contain"
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}
