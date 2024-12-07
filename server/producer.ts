import Producer from "@/types/producer";
import Product from "@/types/product";
import firestore from "@react-native-firebase/firestore";

const ProducerCollection = firestore().collection("Producers");
const ProductCollection = firestore().collection("Products");

export async function getAllProducers(): Promise<Producer[]> {
  try {
    const snapshot = await ProducerCollection.get();
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

export async function getProducerProducts(
  producer: Producer
): Promise<Product[]> {
  try {
    const snapshot = await ProductCollection.where(
      "producer",
      "==",
      producer.name
    ).get();
    const products = snapshot.docs.map((document) => {
      const data = document.data() as Omit<Product, "id">;
      return {
        id: document.id,
        ...data,
      };
    });

    return products;
  } catch (error) {
    console.error(`Erro ao buscar produtos de ${producer.name}: `, error);
    return [];
  }
}
