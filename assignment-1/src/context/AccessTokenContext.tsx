import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type initialState = {
  accessToken: string;
  getAccessToken: (token: string) => void;
  deleteAccessToken: (token: string) => void;
};

const AccessTokenContext = createContext<initialState | null | any>(null);

export function AccessTokenProvider({ children }: PropsWithChildren) {
  const [accessToken, setAccessToken] = useState("");

  //토큰 생성 함수
  const getAccessToken = useCallback((token: string) => {
    setAccessToken(token);
  }, []);

  //토큰 삭제 함수
  const deleteAccessToken = useCallback(
    (token: string) => setAccessToken(""),
    []
  );
  return (
    <AccessTokenContext.Provider
      value={{
        accessToken,
        getAccessToken,
        deleteAccessToken,
      }}
    >
      {children}
    </AccessTokenContext.Provider>
  );
}

export const useAccessTokenContext = () => useContext(AccessTokenContext);
