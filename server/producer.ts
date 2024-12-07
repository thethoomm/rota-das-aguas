import Producer from "@/types/producer";
import firestore from "@react-native-firebase/firestore";

const ProducersCollection = firestore().collection("Producers");

export async function getAllProducers(): Promise<Producer[]> {
  try {
    const snapshot = await ProducersCollection.get();
    const producers = snapshot.docs.map((document) => {
      const data = document.data() as Omit<Producer, "id">;
      return {
        id: document.id,
        ...data,
      };
    });

    return producers;
  } catch (error) {
    console.error("Erro ao buscar produtores: ", error);
    return [];
  }
}
