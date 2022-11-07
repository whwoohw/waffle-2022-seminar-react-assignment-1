import { createContext, useCallback, useContext, useState } from "react";

//초기값 설정
const initialState = {
  menus: [
    {
      id: 1,
      name: "초코와플",
      price: 7000,
      image: "",
      type: "waffle",
      description: "",
    },
    {
      id: 2,
      name: "아메리카노",
      price: 4000,
      image: "",
      type: "coffee",
      description: "",
    },
    {
      id: 3,
      name: "블루베리스무디",
      price: 6000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg",
      type: "beverage",
      description: "",
    },
    {
      id: 4,
      name: "딸기와플",
      price: 7000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg",
      type: "waffle",
      description: "",
    },
  ],
  menuNum: 4,
  addMenus: () => null,
  editMenus: () => null,
  deleteMenus: () => null,
};

const MenuDataContext = createContext(initialState);

export function MenuDataProvider({ children }) {
  const [menus, setMenus] = useState([
    {
      id: 1,
      name: "초코와플",
      price: 7000,
      image: "",
      type: "waffle",
      description: "",
    },
    {
      id: 2,
      name: "아메리카노",
      price: 4000,
      image: "",
      type: "coffee",
      description: "",
    },
    {
      id: 3,
      name: "블루베리스무디",
      price: 6000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/15/Blueberries.jpg",
      type: "beverage",
      description: "",
    },
    {
      id: 4,
      name: "딸기와플",
      price: 7000,
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg",
      type: "waffle",
      description: "",
    },
  ]);
  const [menuNum, setMenuNum] = useState(4);

  //메뉴 생성 함수
  const addMenus = useCallback((menu) => {
    setMenus((e) => [...e, menu]);
    setMenuNum((i) => i + 1);
  }, []);

  //메뉴 수정 함수

  const editMenus = useCallback((editlist) => {
    setMenus((k) =>
      k.map((menu) => (menu.id === editlist.id ? editlist : menu))
    );
  }, []);

  //메뉴 삭제 함수
  const deleteMenus = useCallback(
    (menuId) => setMenus((menus) => menus.filter((menu) => menu.id !== menuId)),
    []
  );
  return (
    <MenuDataContext.Provider
      value={{
        menus,
        menuNum,
        addMenus,
        editMenus,
        deleteMenus,
      }}
    >
      {children}
    </MenuDataContext.Provider>
  );
}

export const useMenuDataContext = () => useContext(MenuDataContext);
