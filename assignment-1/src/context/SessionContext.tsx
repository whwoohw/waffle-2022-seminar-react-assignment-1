import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

//초기값 설정
type initialState = {
  login: boolean;
  id: number | undefined;
  storeId: number | undefined;
  changeLoginState: () => void;
  getId: (id: number) => void;
  getStoreId: (storeId: number) => void;
};

const SessionContext = createContext<initialState | null | any>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [login, setLogin] = useState(false);
  const [id, setId] = useState<number>();
  const [storeId, setStoreId] = useState<number>();
  //로그인시 로그인 상태변경
  const changeLoginState = useCallback(() => setLogin((e) => !e), []);
  //id 입력시 받아와서 넣어주기
  const getId = useCallback((id: number) => setId(id), []);
  const getStoreId = useCallback((storeid: number) => setStoreId(storeid), []);

  return (
    <SessionContext.Provider
      value={{
        login,
        id,
        storeId,
        changeLoginState,
        getId,
        getStoreId,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export const useSessionContext = () => useContext(SessionContext);
