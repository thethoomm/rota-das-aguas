import { useState } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import Product from "@/types/product";
import { Feather } from "@expo/vector-icons";
import { Separator } from "@/components/separator";
import { ShowMoreText } from "@/components/show-more-text";

export default function ProductDetails() {
  const { product: rawProduct } = useLocalSearchParams();

  const product = rawProduct
    ? (JSON.parse(rawProduct as string) as Product)
    : null;

  const [selectedPhoto, setSelectedPhoto] = useState(product?.photos[0]);

  function handleChangeSelectedPhoto(photo: string) {
    setSelectedPhoto(photo);
  }

  function backTo() {
    return router.back();
  }

  if (!product) {
    return <Text>Sem produto</Text>;
  }

  return (
    <ScrollView id="container">
      <ImageBackground
        source={{
          uri: selectedPhoto,
        }}
        className="w-full h-96"
      >
        <TouchableOpacity
          activeOpacity={0.7}
          className="p-4 bg-white w-[52px] rounded-full items-center justify-center mt-8 ml-4"
          onPress={backTo}
        >
          <Feather name="chevron-left" size={24} />
        </TouchableOpacity>
      </ImageBackground>

      <View id="content" className="bg-white border-t-2 border-gray-500 pt-6">
        <View id="header" className="mb-4">
          <View id="header-text" className="px-6">
            <Text className="text-base text-gray-500 font-semibold uppercase">
              {product.type}
            </Text>
            <Text className="text-2xl font-semibold">{product.name}</Text>
            <Text
              className="text-base text-gray-500 font-semibold"
            >
              Produzido por: {product.producer}
            </Text>
          </View>

          {product.photos.length > 1 && (
            <View id="galery" className="mt-4">
              <ScrollView
                id="photos-list"
                horizontal
                showsHorizontalScrollIndicator={false}
              >
                {product.photos.map((photo, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.7}
                      className={`size-24 rounded-lg ml-4 ${
                        selectedPhoto === photo && "p-px border-2 border-black"
                      }`}
                      onPress={() => handleChangeSelectedPhoto(photo)}
                    >
                      <Image
                        source={{
                          uri: photo,
                        }}
                        className="size-full rounded-lg"
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>

        <Separator />

        <View id="description" className="px-6 mb-4">
          <Text className="text-xl font-semibold">Descrição</Text>
          <ShowMoreText text={product.description} className="text-gray-500" />
        </View>

        <View id="specifications" className="mb-4">
          <View id="specifications-text" className="px-6 mb-4">
            <Text className="text-xl font-semibold">Especificações</Text>
          </View>
          <View id="specifications-list" className="px-6">
            {product.specifications.map((specification, index) => (
              <Text
                key={index}
                className="text-base text-gray-500 font-semibold"
              >
                {specification.trim()}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
