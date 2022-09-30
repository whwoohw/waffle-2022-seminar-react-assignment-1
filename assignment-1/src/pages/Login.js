import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";

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
    <div>
      <h3>로그인</h3>
      <div>
        <div>
          <p>ID</p>
          <input
            onChange={getUsername}
            value={username}
            placeholder="블루베리스무디"
          />
        </div>
        <div>
          <p>PASSWORD</p>
          <input placeholder="블루베리스무디" />
        </div>
      </div>
      <div>
        <button onClick={getLoggedIn}>로그인</button>
      </div>
    </div>
  );
};

export default Login;
