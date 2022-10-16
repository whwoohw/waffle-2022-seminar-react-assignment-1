import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMenuDataContext } from "../context/MenuDataContext";
import "./CreateMenu.css";

const CreateMenu = () => {
  const navigate = useNavigate();

  const { menus, menuNum, addMenuNum, addMenus } = useMenuDataContext();

  const [name, setName] = useState("");
  const [type, setType] = useState("default");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const wafflePrice = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(",", ""));
    setPrice(removedCommaValue.toLocaleString());
  };

  const addMenu = () => {
    const duplicate = menus.map((menu) => menu.name).includes(name);
    if (duplicate === true) {
      //각종 조건들에 대한 alert 설정
      alert("중복된 이름입니다!");
    } else if (name.length > 20 || name === "") {
      alert("이름은 1~20글자여야 합니다!");
    } else if (
      Number(price.replaceAll(",", "")) > 1000000 ||
      Number(price.replaceAll(",", "")) < 100
    ) {
      alert("가격은 100 ~ 1000000 사이여야 합니다!");
    } else if (Number(price.replaceAll(",", "")) % 10 !== 0) {
      alert("가격은 10원 단위로 끊어져야 합니다!");
    } else {
      const newnum = menuNum + 1;
      const addedlist = {
        id: newnum,
        name: name,
        type: type,
        price: Number(price.replaceAll(",", "")),
        image: image,
        description: description,
      };
      console.log(addedlist);
      addMenus(addedlist);
      addMenuNum();
      console.log(menus);
      console.log(menuNum);
      setName("");
      setType("default");
      setPrice("");
      setImage("");
      setDescription("");
      // navigate(-1);
    }
  };

  return (
    <div className="add-modal-container">
      <div className="add-modal">
        <h1 className="modal-name">새 메뉴 추가</h1>
        <div className="category">
          <p className="category-name">이름</p>
          <input
            className="category-input"
            placeholder="맛있는와플"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="category">
          <p className="category-name">종류</p>
          <select
            className="category-input"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option disabled value="default">
              상품의 종류를 선택하세요
            </option>
            <option value="waffle">와플</option>
            <option value="beverage">음료</option>
            <option value="coffee">커피</option>
          </select>
        </div>
        <div className="category">
          <p className="category-name">가격</p>
          <div className="input-container">
            <input
              className="category-input"
              placeholder="5,000"
              value={price}
              onChange={wafflePrice}
            />
            <p className="price-unit">원</p>
          </div>
        </div>
        <div className="category">
          <p className="category-name">상품 이미지</p>
          <input
            className="category-input"
            placeholder="https://foo.bar/baz.png"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="category">
          <p className="category-name">설명</p>
          <textarea
            className="category-input textarea"
            placeholder="상품에 대한 자세한 설명을 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="modal-buttons">
        <button className="modal-button add" onClick={addMenu}>
          추가
        </button>
        <button className="modal-button cancel" onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
    </div>
  );
};

export default CreateMenu;
