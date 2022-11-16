import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./ReviewModal.css";
import axios from "axios";
import { useAccessTokenContext } from "../context/AccessTokenContext";

const ReviewModal = ({ review, modalState, setModalState }) => {
  const navigate = useNavigate();
  const { accessToken } = useAccessTokenContext();
  const deleteReview = async () => {
    try {
      const res = await axios.delete(
        `https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/${review.id}`,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(res);
      setModalState(0);
      navigate(`/menus/${review.menu.id}`);
    } catch (error) {
      console.log(error);
      Swal.fire("리뷰 삭제 에러!!");
    }
  };

  return (
    <>
      {modalState === 2 ? (
        <div className="add-modal-container">
          <div className="delete-modal">
            <h3 className="modal-name">리뷰 삭제</h3>
            <div className="category">
              <p className="delete-info">정말로 삭제하시겠습니까?</p>
            </div>
            <div className="modal-buttons">
              <button className="modal-button delete" onClick={deleteReview}>
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
      ) : null}
    </>
  );
};

export default ReviewModal;
