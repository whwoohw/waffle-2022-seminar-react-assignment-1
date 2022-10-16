import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { changeLoginState, getId } = useSessionContext();
  const [username, setUsername] = useState("");

  const getUsername = (e) => {
    setUsername(e.target.value);
  };

  const getLoggedIn = () => {
    getId(username);
    changeLoginState();
    navigate(-1);
  };
  return (
    <div className="login-container">
      <div className="login">
        <h2>로그인</h2>
        <div className="login-body">
          <div className="inputs-container">
            <div className="input-container">
              <p className="input-info">ID</p>
              <input
                className="input-content"
                onChange={getUsername}
                value={username}
                placeholder="블루베리스무디"
              />
            </div>
            <div className="input-container">
              <p className="input-info">PASSWORD</p>
              <input className="input-content" placeholder="블루베리스무디" />
            </div>
          </div>
          <div className="login-button-container">
            <button className="login-button" onClick={getLoggedIn}>
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
