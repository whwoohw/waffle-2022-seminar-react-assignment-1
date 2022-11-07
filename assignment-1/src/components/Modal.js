import { useNavigate } from "react-router-dom";
import { useMenuDataContext } from "../context/MenuDataContext";
import "./Modal.css";

const Modal = ({ menu, modalState, setModalState }) => {
  const navigate = useNavigate();
  const { deleteMenus } = useMenuDataContext();

  const deleteMenu = () => {
    deleteMenus(menu.id);
    setModalState(0);
    navigate("/stores/1");
  };

  return (
    <>
      {modalState === 0 ? null : (
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
              <button
                className="modal-button cancel"
                onClick={() => setModalState(0)}
              >
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
