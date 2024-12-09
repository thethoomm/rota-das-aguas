import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";
import analytics from '@react-native-firebase/analytics';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { createUser } from "@/server/user";
import Session from "@/types/session";

interface AuthContextConfig {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  session: Session | null;
}

GoogleSignin.configure({
  webClientId:
    "571405384198-6c0notgfeohctvbptdsggeibs1pqkno6.apps.googleusercontent.com",
});

const AuthContext = createContext<AuthContextConfig | undefined>(undefined);

export function useSession() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error(
      "useSession tem que estar dentro de um <SessionProvider />"
    );
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);

  const STORAGE_KEY = "@session";

  useEffect(() => {
    const loadSession = async () => {
      const storedSession = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedSession) {
        const user = JSON.parse(storedSession)

        setSession({
          id: user.uid,
          name: user.displayName || "Usuário",
          email: user.email || "",
          photo: user.photoURL || "",
          isGuest: false,
        });
      }
    };
    loadSession();
  }, []);

  const login = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const result = await GoogleSignin.signIn();
      const idToken = result.data?.idToken;

      if (!idToken) {
        throw new Error("Google authentication failed - no ID token present");
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential
      );

      const user = userCredential.user;

      const userCreated = await createUser({
        id: user.uid,
        name: user.displayName || "Usuário",
        email: user.email || "",
        photo: user.photoURL || "",
        isGuest: false,
      });

      if (!userCreated) {
        console.log("Usuário já existe no Firestore.");
      }

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));

      await analytics().logLogin({
        method: 'Google'
      })

      setSession({
        id: user.uid,
        name: user.displayName || "Usuário",
        email: user.email || "",
        photo: user.photoURL || "",
        isGuest: false,
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();

      await AsyncStorage.removeItem(STORAGE_KEY);

      setSession(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, session }}>
      {children}
    </AuthContext.Provider>
  );
}
