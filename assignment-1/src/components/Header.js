import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAccessTokenContext } from "../context/AccessTokenContext";
import { useSessionContext } from "../context/SessionContext";
import wafflelogo from "../img/wafflelogo.PNG";
import "./Header.css";
import axios from "axios";
import Swal from "sweetalert2";

const Header = () => {
  const navigate = useNavigate();
  const { login, id, storeId, changeLoginState } = useSessionContext();
  const { accessToken, deleteAccessToken } = useAccessTokenContext();
  const getLoggedOut = async () => {
    axios
      .post(
        process.env.NODE_ENV === "development"
          ? "/auth/logout"
          : "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/auth/logout",
        null,
        {
          withCredentials: true,
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        deleteAccessToken();
        changeLoginState();
      })
      .catch((error) => {
        Swal.fire("로그아웃 오류!");
      });
  };

  const goMyStore = () => {
    navigate(`/stores/${storeId}`);
  };

  return (
    <>
      <div className="header">
        <div className="header-link">
          <Link to="/" className="waffle-link">
            <img src={wafflelogo} alt="waffle-logo" className="waffle-logo" />
            <h3>와플스튜디오 메뉴관리</h3>
          </Link>
        </div>
        <div className="header-button">
          {login ? (
            <div className="user-info">
              <p>{id}님 안녕하세요!</p>
              <button className="my-store-button" onClick={goMyStore}>
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

export default Header;
