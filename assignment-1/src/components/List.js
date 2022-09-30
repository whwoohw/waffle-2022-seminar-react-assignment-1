import Item from "./Item";
import addbutton from "../img/addbutton.PNG";
import "./List.css";
import MenuDetail from "./MenuDetail";
import { useState } from "react";

const List = ({
  menus,
  setModalState,
  selectedMenu,
  setSelectedMenu,
  detailState,
  setDetailState,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const getModal = () => {
    setModalState(1);
  };

  const getMenudetail = (menu) => {
    setDetailState(true);
    setSelectedMenu(menu);
  };

  const changeSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="body-container">
        <div className={"body" + (detailState === true ? " detailed" : "")}>
          <div className="search-bar">
            <div className="search-info">이름 검색 :</div>
            <input
              placeholder="검색어 입력"
              className="search-input"
              onChange={changeSearchQuery}
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
                .filter((menu) => menu.name.includes(searchQuery))
                .map((menu) => (
                  <li
                    key={menu.id}
                    className={
                      "menu-list" + (menu === selectedMenu ? " selected" : "")
                    }
                    onClick={() => {
                      getMenudetail(menu);
                    }}
                  >
                    <Item menu={menu} />
                  </li>
                ))}
            </ul>
            <button
              className={
                "add-button" + (detailState === true ? " button-detailed" : "")
              }
              onClick={getModal}
            >
              <img
                className={
                  "add-button" +
                  (detailState === true ? " button-detailed" : "")
                }
                src={addbutton}
                alt="addbutton"
              />
            </button>
          </div>
        </div>
        <div className="menu-detail">
          <MenuDetail
            detailState={detailState}
            setDetailState={setDetailState}
            selectedMenu={selectedMenu}
            setSelectedMenu={setSelectedMenu}
            setModalState={setModalState}
          />
        </div>
      </div>
    </>
  );
};

export default List;