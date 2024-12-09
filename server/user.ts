import firestore from "@react-native-firebase/firestore";

import Session from "@/types/session";

const UserCollection = firestore().collection("Users");

export async function createUser(user: Session): Promise<boolean> {
  try {
    const snapshot = await UserCollection.where("email", "==", user.email).get();

    if (!snapshot.empty) {
      console.log("Usuário já existe.");
      return false;
    }

    await UserCollection.add(user)

    return true;
  } catch (error) {
    console.error("Erro ao criar usuário: ", error);
    return false;
  }
}
