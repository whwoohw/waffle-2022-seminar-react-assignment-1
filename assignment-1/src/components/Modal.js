import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({
  menus,
  setMenus,
  modalState,
  setModalState,
  menuNum,
  setMenuNum,
  setDetailState,
  selectedMenu,
  setSelectedMenu,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [editname, setEditname] = useState("");
  const [editprice, setEditprice] = useState("");
  const [editimage, setEditimage] = useState("");

  useEffect(() => {
    setEditname(selectedMenu.name);
    setEditprice(selectedMenu.price);
    setEditimage(selectedMenu.image);
  }, [selectedMenu]);

  const waffleName = (e) => {
    setName(e.target.value);
  };

  const wafflePrice = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(",", "")); // 가격 추가시 자동으로 , 설정
    setPrice(removedCommaValue.toLocaleString());
  };

  const waffleImage = (e) => {
    setImage(e.target.value);
  };

  const editWaffleName = (e) => {
    setEditname(e.target.value);
  };

  const editWafflePrice = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(",", ""));
    setEditprice(removedCommaValue.toLocaleString());
  };

  const editWaffleImage = (e) => {
    setEditimage(e.target.value);
  };

  const addMenu = () => {
    const duplicate = menus.map((menu) => menu.name).includes(editname);
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
        price: Number(price.replaceAll(",", "")),
        image: image,
      };
      setMenuNum(newnum);
      const newlist = [...menus, addedlist];
      setMenus(newlist);
      setSelectedMenu(addedlist);
      setDetailState(true);
      setModalState(0);
      setName("");
      setPrice("");
      setImage("");
    }
  };

  const cancelModal = () => {
    setModalState(0);
    setName("");
    setPrice("");
    setImage("");
    setEditname("");
    setEditprice("");
    setEditimage("");
  };

  const editMenu = () => {
    let duplicate;
    menus.forEach((menu) =>
      menu.name === editname ? (duplicate = true) : null
    );
    if (duplicate === true && editname !== selectedMenu.name) {
      alert("중복된 이름입니다!");
    } else if (editname.length > 20 || editname === "") {
      alert("이름은 1~20글자여야 합니다!");
    } else if (
      Number(editprice.replaceAll(",", "")) > 1000000 ||
      Number(editprice.replaceAll(",", "")) < 100
    ) {
      alert("가격은 100 ~ 1000000 사이여야 합니다!");
    } else if (Number(editprice.replaceAll(",", "")) % 10 !== 0) {
      alert("가격은 10원 단위로 끊어져야 합니다!");
    } else {
      setModalState(0);
      const editlist = {
        id: selectedMenu.id,
        name: editname,
        price: Number(editprice.replaceAll(",", "")),
        image: editimage,
      };
      setMenus(
        menus.map((elem) => (elem.id === editlist.id ? editlist : elem))
      );
      setSelectedMenu("");
      setDetailState(false);
    }
  };

  const deleteMenu = () => {
    setModalState(0);
    const index = menus.findIndex((elem) => elem.id === selectedMenu.id);
    const clone = menus.slice();
    clone.splice(index, 1);
    setMenus(clone);
    setSelectedMenu("");
    setDetailState(false);
  };

  return (
    <>
      {modalState === 0 ? null : modalState === 1 ? (
        <div className="add-modal-container">
          <div className="add-modal">
            <h3 className="modal-name">메뉴 추가</h3>
            <div className="category">
              <p className="category-name">이름</p>
              <input
                className="category-input"
                placeholder="맛있는와플"
                value={name}
                onChange={waffleName}
              />
            </div>
            <div className="category">
              <p className="category-name">가격</p>
              <input
                className="category-input"
                placeholder="5,000"
                value={price}
                onChange={wafflePrice}
              />
              <p className="price-unit">원</p>
            </div>
            <div className="category">
              <p className="category-name">상품 이미지</p>
              <input
                className="category-input"
                placeholder="https://foo.bar/baz.png"
                value={image}
                onChange={waffleImage}
              />
            </div>
            <div className="modal-buttons">
              <button className="modal-button add" onClick={addMenu}>
                추가
              </button>
              <button className="modal-button cancel" onClick={cancelModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      ) : modalState === 2 ? (
        <div>
          <div className="add-modal-container">
            <div className="add-modal">
              <h3 className="modal-name">메뉴 수정</h3>
              <div className="category">
                <p className="category-name">이름</p>
                <input
                  className="category-input"
                  placeholder="맛있는와플"
                  onChange={editWaffleName}
                  value={editname}
                />
              </div>
              <div className="category">
                <p className="category-name">가격</p>
                <input
                  className="category-input"
                  placeholder="5,000"
                  onChange={editWafflePrice}
                  value={editprice.toLocaleString()}
                />
                <p className="price-unit">원</p>
              </div>
              <div className="category">
                <p className="category-name">상품 이미지</p>
                <input
                  className="category-input"
                  placeholder="https://foo.bar/baz.png"
                  onChange={editWaffleImage}
                  value={editimage}
                />
              </div>
              <div className="modal-buttons">
                <button className="modal-button add" onClick={editMenu}>
                  수정
                </button>
                <button className="modal-button cancel" onClick={cancelModal}>
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="add-modal-container">
          <div className="delete-modal">
            <h3 className="modal-name">메뉴 추가</h3>
            <div className="category">
              <p className="delete-info">정말로 삭제하시겠습니까?</p>
            </div>
            <div className="modal-buttons">
              <button className="modal-button delete" onClick={deleteMenu}>
                삭제
              </button>
              <button className="modal-button cancel" onClick={cancelModal}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
