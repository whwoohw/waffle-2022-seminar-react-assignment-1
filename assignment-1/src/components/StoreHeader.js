import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAccessTokenContext } from "../context/AccessTokenContext";
import { useSessionContext } from "../context/SessionContext";
import wafflelogo from "../img/wafflelogo.PNG";
import "./StoreHeader.css";
import axios from "axios";
import Swal from "sweetalert2";

const StoreHeader = ({ storeName, ownerName }) => {
  const { login, id, storeId, changeLoginState } = useSessionContext();
  const { accessToken, deleteAccessToken } = useAccessTokenContext();
  const navigate = useNavigate();
  const getLoggedOut = async () => {
    try {
      const res = await axios.post(
        process.env.NODE_ENV === "development"
          ? "/auth/logout"
          : "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/auth/logout",
        null,
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );
      console.log(res);
      deleteAccessToken();
      changeLoginState();
    } catch (error) {
      console.log(error);
      Swal.fire("로그아웃 에러!!");
    }
  };
  const goToMyStore = () => {
    navigate(`/stores/${storeId}`);
  };

  return (
    <>
      <div className="header">
        <div className="header-link">
          <Link to="/" className="waffle-link">
            <img src={wafflelogo} alt="waffle-logo" className="waffle-logo" />
            <div className="header-with-store">
              <p style={{ margin: 0 }}>와플스튜디오 메뉴관리</p>
              <div className="storename-and-ownername">
                <h1 style={{ margin: 0 }}>{storeName}</h1>
                <p style={{ color: "grey", fontSize: "20px", margin: 0 }}>
                  by {ownerName}
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="header-button">
          {login ? (
            <div className="user-info">
              <p>{id}님 안녕하세요!</p>
              <button className="my-store-button" onClick={goToMyStore}>
                내 가게
              </button>
              <button className="logout-button" onClick={() => getLoggedOut()}>
                로그아웃
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="login-button-header">로그인</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default StoreHeader;
