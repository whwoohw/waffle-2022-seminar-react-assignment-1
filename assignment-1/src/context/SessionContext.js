import { createContext, useCallback, useContext, useState } from "react";

const initialState = {
  login: false,
  id: null,
  changeLoginState: () => null,
  getId: () => null,
};

const SessionContext = createContext(initialState);

export function SessionProvider({ children }) {
  const [login, setLogin] = useState(false);
  const [id, setId] = useState("");
  const changeLoginState = useCallback(() => setLogin((e) => !e), []);
  const getId = useCallback((id) => setId(id), []);
  return (
    <SessionContext.Provider
      value={{
        login,
        id,
        changeLoginState,
        getId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSessionContext = () => useContext(SessionContext);
