import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMenuDataContext } from "../context/MenuDataContext";
import { useSessionContext } from "../context/SessionContext";
import "./CreateMenu.css";
import ErrorPage from "./ErrorPage";

const CreateMenu = () => {
  const navigate = useNavigate();
  const { login } = useSessionContext();

  const { menus, menuNum, addMenus } = useMenuDataContext();

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
      addMenus(addedlist);
      console.log(menus);
      console.log(menuNum);
      setName("");
      setType("default");
      setPrice("");
      setImage("");
      setDescription("");
      navigate(-1);
    }
  };
// 로그인 안되어 있을 시 alert 띄우기
  if (login !== true) {
    return <ErrorPage />;
  }
  return (
    <div className="create-page-container">
      <div className="create-page">
        <h1 className="create-page-name">새 메뉴 추가</h1>
        <div className="create-box">
          <p className="create-box-name">이름</p>
          <input
            className="create-box-input"
            placeholder="맛있는와플"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="create-box">
          <p className="create-box-name">종류</p>
          <select
            className="create-box-input"
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
        <div className="create-box">
          <p className="create-box-name">가격</p>
          <div className="input-container">
            <input
              className="create-box-input"
              placeholder="5,000"
              value={price}
              onChange={wafflePrice}
            />
            <p className="box-price-unit">원</p>
          </div>
        </div>
        <div className="create-box">
          <p className="create-box-name">상품 이미지</p>
          <input
            className="create-box-input"
            placeholder="https://foo.bar/baz.png"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="create-box">
          <p className="create-box-name">설명</p>
          <textarea
            className="create-box-input textarea"
            placeholder="상품에 대한 자세한 설명을 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="create-page-buttons">
        <button className="create-page-button add" onClick={addMenu}>
          추가
        </button>
        <button
          className="create-page-button cancel"
          onClick={() => navigate(-1)}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default CreateMenu;
