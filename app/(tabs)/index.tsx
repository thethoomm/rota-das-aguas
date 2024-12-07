import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { getAllProducers } from "@/server/producer";
import Producer from "@/types/producer";

export default function Home() {
  const [producers, setProducers] = useState<Producer[]>([]);

  useEffect(() => {
    getAllProducers().then((data) => setProducers(data));
  }, []);

  return (
    <View className="bg-white flex-1 items-center justify-center">
      <Text>Home</Text>
      {producers.map((producer) => (
        <Text key={producer.id}>{producer.name}</Text>
      ))}
    </View>
  );
}
