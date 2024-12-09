import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

import { RouteCard } from "@/components/route-card";
import { getAllRoutes } from "@/server/route";
import Route from "@/types/route";

export default function Routes() {
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    getAllRoutes().then((data) => setRoutes(data));
  }, []);

  return (
    <View id="container" className="flex-1 bg-white pt-12">
      <View id="header" className="mb-4">
        <View
          id="header-text"
          className="px-6 items-center justify-center gap-1"
        >
          <Text className="text-3xl font-semibold">Explorar Rotas</Text>
          <Text className="text-gray-500 text-center">
            Descubra caminhos e locais incríveis para visitar. Escolha uma rota
            e comece sua aventura!
          </Text>
        </View>
      </View>

      <View id="content" className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="px-6">
          {routes.map((route) => (
            <RouteCard key={route.id} route={route} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
