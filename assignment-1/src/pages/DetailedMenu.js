import { Link, useNavigate, useParams } from "react-router-dom";
import { useMenuDataContext } from "../context/MenuDataContext";
import { useSessionContext } from "../context/SessionContext";
import "./DetailedMenu.css";
import arrow from "../img/arrow.PNG";
import Modal from "../components/Modal";

const DetailedMenu = ({ modalstate, setModalstate }) => {
  const params = useParams();
  const { menus } = useMenuDataContext();
  const { login } = useSessionContext();
  const menu = menus.find((elem) => elem.id === Number(params.menuId));
  const navigate = useNavigate();

  return (
    <>
      <div className="body-container">
        <div className="left-body">
          <div className="previous-page">
            <div onClick={() => navigate(-1)}>
              <img src={arrow} alt="addbutton" />
            </div>
            <h1>메뉴 목록 </h1>
          </div>
          <div className="menu-detail-container">
            <div className="detail-contents">
              <img
                src={menu.image}
                alt="Url을 불러올 수 없습니다."
                className="detail-url"
              />
              <h3>{menu.name}</h3>
              <p>
                {menu.type === "waffle"
                  ? "와플"
                  : menu.type === "beverage"
                  ? "음료"
                  : "커피"}
              </p>
              <p>{menu.price.toLocaleString()} 원</p>
              <p>{menu.description}</p>
              {login ? (
                <div className="detail-icons">
                  <Link to={`/menus/${menu.id}/edit`}>
                    <div className="icon-image">
                      <span className="material-symbols-outlined">edit</span>
                    </div>
                  </Link>
                  <div className="icon-image" onClick={() => setModalstate(1)}>
                    <span className="material-symbols-outlined">delete</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="right-body">
          TODO: 리뷰 띄울 화면, 여긴 일단 비우면 됩니다
        </div>
      </div>
      <Modal
        menu={menu}
        modalstate={modalstate}
        setModalstate={setModalstate}
      />
    </>
  );
};

export default DetailedMenu;
