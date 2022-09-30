import { Link, Outlet } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import wafflelogo from "../img/wafflelogo.PNG";
import "./Header.css";

const Header = () => {
  const { login, id, changeLoginState } = useSessionContext();

  return (
    <>
      <header className="header">
        <a href="https://wafflestudio.com" className="waffle-link">
          <img src={wafflelogo} alt="waffle-logo" className="waffle-logo" />
          <h3>와플스튜디오 메뉴관리</h3>
        </a>
        {login ? (
          <>
            <h3>{id}</h3>
            <button onClick={() => changeLoginState()}>로그아웃</button>
          </>
        ) : (
          <Link to="/login">
            <button>로그인</button>
          </Link>
        )}
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Header;
