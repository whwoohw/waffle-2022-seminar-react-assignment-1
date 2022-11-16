import Item from "./Item";
import addbutton from "../img/addbutton.PNG";
import "./List.css";
import MenuDetail from "./MenuDetail";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { Link, useParams } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import ErrorPage from "../pages/ErrorPage";
import axios from "axios";
import Swal from "sweetalert2";
import StoreHeader from "./StoreHeader";

const List = () => {
  const params = useParams();
  const [selectedMenu, setSelectedMenu] = useState("");
  const { login } = useSessionContext();

  const [menuSearch, setMenuSearch] = useState("");
  const [searchedMenus, setSearchedMenus] = useState();
  const [detailState, setDetailState] = useState(false);
  const [menus, setMenus] = useState();
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState();
  const getMenudetail = (menu) => {
    setDetailState(true);
    setSelectedMenu(menu);
  };
  let timer;

  const searchMenuByName = () => {
    if (!timer) {
      //throttling 1초로 설정
      timer = setTimeout(async () => {
        timer = null;
        if (menuSearch) {
          try {
            setLoading(true);

            const res = await axios.get(
              process.env.NODE_ENV === "development"
                ? "/menus/"
                : "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/",
              {
                params: {
                  search: menuSearch,
                  owner: params.storeId,
                },
              }
            );
            setSearchedMenus(res.data.data);
            setLoading(false);
          } catch (error) {
            console.log(error);
            Swal.fire("메뉴 검색 에러!");
          }
        } else {
          // 아무것도 입력 안하고 검색버튼 누르면 원래 화면으로 돌아옴
          setSearchedMenus();
        }
      }, 1000);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getMenus = async () => {
      try {
        const res = await axios.get(
          process.env.NODE_ENV === "development"
            ? "/menus/"
            : "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/",
          {
            params: {
              owner: params.storeId,
            },
          }
        );
        setMenus(res.data.data);
      } catch (error) {
        console.log(error);
        Swal.fire("로그인 에러!!");
      }
      setLoading(false);
    };
    getMenus();

    const getStore = async () => {
      try {
        const res = await axios.get(
          process.env.NODE_ENV === "development"
            ? `/owners/${params.storeId}`
            : `https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/${params.storeId}`
        );
        setStore(res.data.owner);
      } catch (error) {
        console.log(error);
        Swal.fire("가게 불러오기 에러!!");
      }
    };
    getStore();
  }, [params]);

  // 잘못 입력시 에러페이지로 연결
  if (!/\d+/.test(params.storeId)) {
    return <ErrorPage />;
  }

  return loading ? (
    "로딩 중.."
  ) : !menus || !store ? null : !searchedMenus ? (
    <>
      <StoreHeader storeName={store.store_name} ownerName={store.username} />
      <div className="body-container">
        <div className={"body" + (detailState === true ? " detailed" : "")}>
          <SearchBar
            search={menuSearch}
            setSearch={setMenuSearch}
            searchType="메뉴"
            searchFunction={searchMenuByName}
          />
          <div className="menu-list-container">
            <div className="list-info-container">
              <div className="list-info id">ID</div>
              <div className="list-info name">이름</div>
              <div className="list-info price">가격</div>
            </div>
            <ul className="menu-lists">
              {menus.map((menu) => (
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
          />
        </div>
      </div>
    </>
  ) : (
    <>
      <StoreHeader storeName={store.store_name} ownerName={store.username} />
      <div className="body-container">
        <div className={"body" + (detailState === true ? " detailed" : "")}>
          <SearchBar
            search={menuSearch}
            setSearch={setMenuSearch}
            searchType="메뉴"
            searchFunction={searchMenuByName}
          />
          <div className="menu-list-container">
            <div className="list-info-container">
              <div className="list-info id">ID</div>
              <div className="list-info name">이름</div>
              <div className="list-info price">가격</div>
            </div>
            <ul className="menu-lists">
              {searchedMenus.map((menu) => (
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
          />
        </div>
      </div>
    </>
  );
};

export default List;
