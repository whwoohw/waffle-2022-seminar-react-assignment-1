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

function App() {
  const [modalState, setModalState] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState(""); // 메뉴 선택시 선택된 메뉴 selectedMenu로 저장

  return (
    <SessionProvider>
      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/stores/:storeId"
            element={
              <List
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
              />
            }
          />
          <Route
            path="/menus/:menuId"
            element={
              <DetailedMenu
                modalState={modalState}
                setModalState={setModalState}
              />
            }
          />
          <Route path="/menus/:menuId/edit" element={<EditMenu />} />
          <Route path="/menus/new" element={<CreateMenu />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </SessionProvider>
  );
}

export default App;
