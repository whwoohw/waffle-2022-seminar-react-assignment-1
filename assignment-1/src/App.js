import { useState } from "react";
import Modal from "./components/Modal";
import Header from "./components/Header";
import List from "./components/List";
import "./App.css"

function App() {
  const [menus, setMenus] = useState([
    {
      "id": 1,
      "name": "초코와플",
      "price": 7000,
      "image": ""
    },
    {
      "id": 2,
      "name": "아메리카노",
      "price": 4000,
      "image": ""
    },
    {
      "id": 3,
      "name": "블루베리스무디",
      "price": 6000,
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg"
    },
    {
      "id": 4,
      "name": "딸기와플",
      "price": 7000,
      "image": "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg"
    }
  ])


  const [menunum, setMenunum] = useState(4); // 메뉴 개수 설정을 통한 id 부여
  const [modalstate, setModalstate] = useState(0); // modalstate 0 : 아무것도 없음, 1: 추가버튼, 2: 수정버튼 3: 삭제버튼
  const [detailstate, setDetailstate] = useState(false); // detailstate를 통해 detail이 보여지는지 여부 설정
  const [selectedmenu, setSelectedmenu] = useState(""); // 메뉴 선택시 선택된 메뉴 selectedmenu로 저장


  return (
    <div className="app">
      <Header />
      <List menus={menus} setModalstate={setModalstate} detailstate={detailstate} setDetailstate={setDetailstate} selectedmenu={selectedmenu} setSelectedmenu={setSelectedmenu}/>
      <Modal menus={menus} setMenus={setMenus} modalstate={modalstate} setModalstate={setModalstate} menunum={menunum} setMenunum={setMenunum} setDetailstate={setDetailstate} selectedmenu={selectedmenu} setSelectedmenu={setSelectedmenu} />
    </div>
  );
}

export default App;
