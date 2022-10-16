import { Link, Outlet } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import wafflelogo from "../img/wafflelogo.PNG";
import "./Header.css";

const Header = () => {
  const { login, id, changeLoginState } = useSessionContext();

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
              <Link to="/stores/1">
                <button className="my-store-button">내 가게</button>
              </Link>
              <button
                className="logout-button"
                onClick={() => changeLoginState()}
              >
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
