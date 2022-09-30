import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css";
import Home from "./pages/Home";
import MenuDetail from "./components/MenuDetail";
import Login from "./pages/Login";
import CreateMenu from "./pages/CreateMenu";
import EditMenu from "./pages/EditMenu";
import DetailedMenu from "./pages/DetailedMenu";
import { SessionProvider } from "./context/SessionContext";

function App() {
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "초코와플",
      price: 7000,
      image: "",
    },
    {
      id: 2,
      name: "아메리카노",
      price: 4000,
      image: "",
    },
    {
      id: 3,
      name: "블루베리스무디",
      price: 6000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg",
    },
    {
      id: 4,
      name: "딸기와플",
      price: 7000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg",
    },
  ]);

  const [menuNum, setMenuNum] = useState(4); // 메뉴 개수 설정을 통한 id 부여
  const [modalState, setModalState] = useState(0); // modalState 0 : 아무것도 없음, 1: 추가버튼, 2: 수정버튼 3: 삭제버튼
  const [detailState, setDetailState] = useState(false); // detailState를 통해 detail이 보여지는지 여부 설정
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
                menus={menus}
                setModalState={setModalState}
                detailState={detailState}
                setDetailState={setDetailState}
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
              />
            }
          />
          <Route path="/menus/:menuId" element={<DetailedMenu />}>
            <Route path="edit" element={<EditMenu />} />
          </Route>
          <Route path="/menus/new" element={<CreateMenu />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </SessionProvider>
  );
}

export default App;
