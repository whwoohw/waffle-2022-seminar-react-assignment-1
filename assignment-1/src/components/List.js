import Item from "./Item";
import addbutton from "../img/addbutton.PNG";
import "./List.css";
import MenuDetail from "./MenuDetail";
import { useState } from "react";
import SearchBar from "./SearchBar";
import { useMenuDataContext } from "../context/MenuDataContext";
import { Link } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";

const List = ({ setModalState, selectedMenu, setSelectedMenu }) => {
  const { menus } = useMenuDataContext();
  const { login } = useSessionContext();

  const [menuSearch, setMenuSearch] = useState("");
  const [detailState, setDetailState] = useState(false);

  const getMenudetail = (menu) => {
    setDetailState(true);
    setSelectedMenu(menu);
  };

  return (
    <>
      <div className="body-container">
        <div className={"body" + (detailState === true ? " detailed" : "")}>
          <SearchBar
            search={menuSearch}
            setSearch={setMenuSearch}
            searchType="메뉴"
          />
          <div className="menu-list-container">
            <div className="list-info-container">
              <div className="list-info id">ID</div>
              <div className="list-info name">이름</div>
              <div className="list-info price">가격</div>
            </div>
            <ul className="menu-lists">
              {menus
                .filter((menu) => menu.name.includes(menuSearch))
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
            {login ? (
              <button
                className={
                  "add-button" +
                  (detailState === true ? " button-detailed" : "")
                }
              >
                <Link to="/menus/new">
                  <img
                    className={
                      "add-button" +
                      (detailState === true ? " button-detailed" : "")
                    }
                    src={addbutton}
                    alt="addbutton"
                  />
                </Link>
              </button>
            ) : null}
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
