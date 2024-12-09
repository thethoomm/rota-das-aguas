import firestore from "@react-native-firebase/firestore";

import Route from "@/types/route";

const RouteCollection = firestore().collection("Routes");

export async function getAllRoutes(): Promise<Route[]> {
  try {
    const snapshot = await RouteCollection.get();
    const routes = snapshot.docs.map((document) => {
      const data = document.data() as Omit<Route, "id">;
      return {
        id: document.id,
        ...data,
      };
    });

    return routes;
  } catch (error) {
    console.error("Erro ao buscar rotas: ", error);
    return [];
  }
}
