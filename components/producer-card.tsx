import Producer from "@/types/producer";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface ProducerCardProps {
  producer: Producer;
}

export function ProducerCard({ producer }: ProducerCardProps) {
  function navigateTo() {
    return router.push({
      pathname: "/(producer)/[producer]",
      params: {
        producer: JSON.stringify(producer),
      },
    });
  }

  return (
    <TouchableOpacity
      id="producer-card"
      className="ml-4"
      activeOpacity={0.7}
      onPress={navigateTo}
    >
      <Image
        source={{
          uri: producer.image,
        }}
        className="w-[240] h-40 rounded-lg mb-1"
      />
      <View id="content">
        <Text
          id="categories"
          className="uppercase text-sm text-gray-500 font-semibold"
        >
          {producer.categories.map((category, index) => {
            if (index !== producer.categories.length - 1) {
              return `${category} | `;
            }
            return `${category}`;
          })}
        </Text>
        <Text className="text-xl font-semibold">{producer.name}</Text>
      </View>
    </TouchableOpacity>
  );
}