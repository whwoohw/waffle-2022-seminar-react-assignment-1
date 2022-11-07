import { createContext, useCallback, useContext, useState } from "react";

const initialState = {
  accessToken: "",
  getAccessToken: () => null,
  deleteAccessToken: () => null,
};

const AccessTokenContext = createContext(initialState);

export function AccessTokenProvider({ children }) {
  const [accessToken, setAccessToken] = useState();

  //토큰 생성 함수
  const getAccessToken = useCallback((token) => {
    setAccessToken(token);
  }, []);

  //토큰 삭제 함수
  const deleteAccessToken = useCallback((token) => setAccessToken(""), []);
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
