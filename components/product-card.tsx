import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import Product from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  function navigateTo() {
    return router.push({
      pathname: "/(product)/[product]",
      params: {
        product: JSON.stringify(product),
      },
    });
  }

  return (
    <TouchableOpacity
      id="product-card"
      activeOpacity={0.7}
      className="w-[160] md:w-[240] items-center justify-center ml-6 gap-2 bg-[#fff] p-4 rounded-lg border border-zinc-200"
      onPress={navigateTo}
    >
      <Image
        source={{
          uri: product.photos[0],
        }}
        className="size-32 rounded-lg"
      />
      <View id="product-text" className="justify-start">
        <Text className="text-gray-500 font-semibold uppercase text-xs">
          {product.type}
        </Text>
        <Text className="font-semibold h-12 md:h-16">{product.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
