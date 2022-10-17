import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMenuDataContext } from "../context/MenuDataContext";
import { useSessionContext } from "../context/SessionContext";
import "./EditMenu.css";
import ErrorPage from "./ErrorPage";

const EditMenu = () => {
  const { login } = useSessionContext();
  const navigate = useNavigate();
  const params = useParams();
  const { menus, editMenus } = useMenuDataContext();
  const menu = menus.find((elem) => elem.id === Number(params.menuId));

  const [price, setPrice] = useState(menu.price);
  const [image, setImage] = useState(menu.image);
  const [description, setDescription] = useState(menu.description);

  const wafflePrice = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(",", ""));
    setPrice(removedCommaValue.toLocaleString());
  };

  const editMenu = () => {
    if (
      Number(price.replaceAll(",", "")) > 1000000 ||
      Number(price.replaceAll(",", "")) < 100
    ) {
      alert("가격은 100 ~ 1000000 사이여야 합니다!");
    } else if (Number(price.replaceAll(",", "")) % 10 !== 0) {
      alert("가격은 10원 단위로 끊어져야 합니다!");
    } else {
      const editlist = {
        id: menu.id,
        name: menu.name,
        type: menu.type,
        price: Number(price.replaceAll(",", "")),
        image: image,
        description: description,
      };
      editMenus(editlist);
      navigate(-1);
    }
  };

  // 잘못 입력시 에러 페이지로 연결
  if (
    !/\d+/.test(params.menuId) ||
    menus.filter((menu) => menu.id === Number(params.menuId)).length === 0 ||
    login !== true
  ) {
    return <ErrorPage />;
  }

  return (
    <div className="edit-page-container">
      <div className="edit-page">
        <h1 className="edit-name">새 메뉴 추가</h1>
        <div className="edit-box-fixed">
          <p className="edit-box-name">이름</p>
          <p>{menu.name}</p>
        </div>
        <div className="edit-box-fixed">
          <p className="edit-box-name">종류</p>
          <p>{menu.type}</p>
        </div>
        <div className="edit-box">
          <p className="edit-box-name">가격</p>
          <div className="input-container">
            <input
              className="edit-box-input"
              placeholder="5,000"
              value={price}
              onChange={wafflePrice}
            />
            <p className="price-unit">원</p>
          </div>
        </div>
        <div className="edit-box">
          <p className="edit-box-name">상품 이미지</p>
          <input
            className="edit-box-input"
            placeholder="https://foo.bar/baz.png"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="edit-box">
          <p className="edit-box-name">설명</p>
          <textarea
            className="edit-box-input textarea"
            placeholder="상품에 대한 자세한 설명을 입력해주세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      <div className="edit-buttons">
        <button className="edit-button add" onClick={editMenu}>
          저장
        </button>
        <button className="edit-button cancel" onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
    </div>
  );
};

export default EditMenu;
