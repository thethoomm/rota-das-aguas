import Product from "@/types/product";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <TouchableOpacity
      id="product-card"
      activeOpacity={0.7}
      className="ml-6 gap-2 bg-zinc-50 p-4 rounded-lg border border-zinc-200"
    >
      <Image
        source={{
          uri: product.photos[0],
        }}
        className="size-32 rounded-lg"
      />
      <View id="product-text">
        <Text className="text-gray-500 font-semibold uppercase text-xs">
          {product.type}
        </Text>
        <Text className="font-semibold">{product.name}</Text>
      </View>
    </TouchableOpacity>
  );
}
