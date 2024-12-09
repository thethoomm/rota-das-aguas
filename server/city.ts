import firestore from "@react-native-firebase/firestore";

import City from "@/types/city";
import Producer from "@/types/producer";

const CityCollection = firestore().collection("Cities");
const ProducerCollection = firestore().collection("Producers");

export async function getAllCities(): Promise<City[]> {
  try {
    const snapshot = await CityCollection.get();
    const cities = snapshot.docs.map((document) => {
      const data = document.data() as Omit<City, "id">;
      return {
        id: document.id,
        ...data,
      };
    });

    return cities;
  } catch (error) {
    console.error("Erro ao buscar cidades: ", error);
    return [];
  }
}

export async function getCityProducers(city: City): Promise<Producer[]> {
  try {
    const snapshot = await ProducerCollection.where(
      "city",
      "==",
      city.name
    ).get();
    const producers = snapshot.docs.map((document) => {
      const data = document.data() as Omit<Producer, "id">;
      return {
        id: document.id,
        ...data,
      };
    });

    return producers;
  } catch (error) {
    console.error(`Erro ao buscar produtores da cidade ${city.name}: `, error);
    return [];
  }
}
