import { createContext, useCallback, useContext, useState } from "react";

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
  addMenuNum: () => null,
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
  const [menuNum, setMenuNum] = useState(5);
  const addMenus = useCallback(
    (menu) => setMenus((menus) => [...menus, menu]),
    []
  );
  const addMenuNum = useCallback(
    () => setMenuNum((menuNum) => menuNum + 1),
    []
  );
  const editMenus = useCallback(
    (editlist) =>
      setMenus((menus) =>
        menus.map((menu) => (menu.id === editlist.id ? editlist : menu))
      ),
    []
  );

  const deleteMenus = useCallback(
    (menuId) =>
      setMenus((menus) =>
        menus.map((menu) => (menu.id === menuId ? null : menu))
      ),
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
        addMenuNum,
      }}
    >
      {children}
    </MenuDataContext.Provider>
  );
}

export const useMenuDataContext = () => useContext(MenuDataContext);
