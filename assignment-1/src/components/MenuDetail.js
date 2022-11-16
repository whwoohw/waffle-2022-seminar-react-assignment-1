import { Link } from "react-router-dom";
import "./MenuDetail.css";

const MenuDetail = ({
  detailState,
  setDetailState,
  selectedMenu,
  setSelectedMenu,
}) => {
  const closedetail = () => {
    setDetailState(false);
    setSelectedMenu("");
  };
  let selectedMenuRating;
  if (selectedMenu.rating) {
    selectedMenuRating = selectedMenu.rating;
  } else {
    selectedMenuRating = 0;
  }

  return (
    <>
      {detailState === false ? null : (
        <div className="menu-detail-container">
          <div className="detail-close-button">
            <span className="material-symbols-outlined" onClick={closedetail}>
              close
            </span>
          </div>
          <div className="detail-contents">
            <img
              src={selectedMenu.image}
              alt="Url을 불러올 수 없습니다."
              className="detail-url"
            />
            <h3>{selectedMenu.name}</h3>
            <p>
              {selectedMenu.type === "waffle"
                ? "와플"
                : selectedMenu.type === "beverage"
                ? "음료"
                : "커피"}
            </p>
            <p>{selectedMenu.price.toLocaleString()} 원</p>
            <p>{selectedMenu.description}</p>
            <div className="star-ratings">
              <div
                className="star-ratings-fill space-x-2 text-lg"
                style={{ width: selectedMenuRating * 10 + "%" }}
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <div className="star-ratings-base space-x-2 text-lg">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <div className="detail-icons">
              <Link to={`/menus/${selectedMenu.id}`}>
                <button className="detail-button">자세히</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuDetail;
