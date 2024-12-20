import firestore from "@react-native-firebase/firestore";

import Product from "@/types/product";

const ProductCollection = firestore().collection("Products");

interface LimitParams {
  limit?: number
}

export async function getAllProducts({ limit = 12 }: LimitParams): Promise<Product[]> {
  try {
    const safeLimit = limit > 0 ? limit : 12
    const snapshot = await ProductCollection.limit(safeLimit).get();
    const products = snapshot.docs.map((document) => {
      const data = document.data() as Omit<Product, "id">;
      return {
        id: document.id,
        ...data,
      };
    });

    return products;
  } catch (error) {
    console.error("Erro ao buscar produtos: ", error);
    return [];
  }
}