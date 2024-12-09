import Session from "@/types/session";
import { createContext, PropsWithChildren, useContext } from "react";

interface AuthContextConfig {
  login: () => void;
  logout: () => void;
  session: Session | null;
}

const AuthContext = createContext<AuthContextConfig>({
  login: () => null,
  logout: () => null,
  session: null,
});

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
  return (
    <AuthContext.Provider
      value={{
        login: () => null,
        logout: () => null,
        session: null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
