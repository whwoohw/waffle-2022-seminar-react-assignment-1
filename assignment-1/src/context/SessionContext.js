import { createContext, useCallback, useContext, useState } from "react";

//초기값 설정
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
  //로그인시 로그인 상태변경
  const changeLoginState = useCallback(() => setLogin((e) => !e), []);
  //id 입력시 받아와서 넣어주기
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
