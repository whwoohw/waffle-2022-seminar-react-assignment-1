import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreateMenu from "./pages/CreateMenu";
import EditMenu from "./pages/EditMenu";
import DetailedMenu from "./pages/DetailedMenu";
import { SessionProvider } from "./context/SessionContext";
import ErrorPage from "./pages/ErrorPage";
import { AccessTokenProvider } from "./context/AccessTokenContext";

function App() {
  const [modalState, setModalState] = useState(0);
  return (
    <AccessTokenProvider>
      <SessionProvider>
        <Routes>
          <Route element={<Header />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<ErrorPage />} />
          </Route>
          <Route path="/stores/:storeId" element={<List />} />
          <Route
            path="/menus/:menuId"
            element={
              <DetailedMenu
                modalState={modalState}
                setModalState={setModalState}
              />
            }
          />
          <Route path="/menus/new" element={<CreateMenu />} />
          <Route path="/menus/:menuId/edit" element={<EditMenu />} />
        </Routes>
      </SessionProvider>
    </AccessTokenProvider>
  );
}

export default App;
