import Item from "./Item";
import addbutton from "../img/addbutton.PNG";
import "./List.css";
import MenuDetail from "./MenuDetail";
import { useState } from "react";

const List = ({
  menus,
  setModalstate,
  selectedmenu,
  setSelectedmenu,
  detailstate,
  setDetailstate,
}) => {
  const [q, setQ] = useState("");
  const [onmouse, setOnmouse] = useState("");

  const getModal = () => {
    setModalstate(1);
  };

  const getMenudetail = (menu) => {
    setDetailstate(true);
    setSelectedmenu(menu);
  };

  const onmouseMenu = (menu) => { // 커서 올릴시 메뉴에 새로운 className 부여
    setOnmouse(menu);
  };

  const leavemouseMenu = () => {
    setOnmouse("");
  };

  const changeQ = (e) => {
    setQ(e.target.value);
  };

  return (
    <>
      <div className="body-container">
        <div className={"body" + (detailstate === true ? " detailed" : "")}>
          <div className="search-bar">
            <div className="search-info">이름 검색 :</div>
            <input
              placeholder="검색어 입력"
              className="search-input"
              onChange={changeQ}
            />
          </div>
          <div className="menu-list-container">
            <div className="list-info-container">
              <div className="list-info id">ID</div>
              <div className="list-info name">이름</div>
              <div className="list-info price">가격</div>
            </div>
            <ul className="menu-lists">
              {menus
                .filter((menu) => menu.name.includes(q))
                .map((menu) => (
                  <li
                    key={menu.id}
                    className={
                      "menu-list" +
                      (menu === selectedmenu
                        ? " selected"
                        : menu === onmouse
                        ? " onmouse"
                        : "")
                    }
                    onClick={() => {
                      getMenudetail(menu);
                    }}
                    onMouseEnter={() => {
                      onmouseMenu(menu);
                    }}
                    onMouseLeave={() => {
                      leavemouseMenu();
                    }}
                  >
                    <Item menu={menu} />
                  </li>
                ))}
            </ul>
            <img
              src={addbutton}
              alt="addbutton"
              className={
                "add-button" + (detailstate === true ? " button-detailed" : "")
              }
              onClick={getModal}
            />
          </div>
        </div>
        <div className="menu-detail">
          <MenuDetail
            detailstate={detailstate}
            setDetailstate={setDetailstate}
            selectedmenu={selectedmenu}
            setSelectedmenu={setSelectedmenu}
            setModalstate={setModalstate}
          />
        </div>
      </div>
    </>
  );
};

export default List;
