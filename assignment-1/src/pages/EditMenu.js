import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMenuDataContext } from "../context/MenuDataContext";
import "./EditMenu.css";

const EditMenu = () => {
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
  return (
    <div className="add-modal-container">
      <div className="add-modal">
        <h1 className="modal-name">새 메뉴 추가</h1>
        <div className="category-fixed">
          <p className="category-name">이름</p>
          <p>{menu.name}</p>
        </div>
        <div className="category-fixed">
          <p className="category-name">종류</p>
          <p>{menu.type}</p>
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
        <button className="modal-button add" onClick={editMenu}>
          저장
        </button>
        <button className="modal-button cancel" onClick={() => navigate(-1)}>
          취소
        </button>
      </div>
    </div>
  );
};

export default EditMenu;
