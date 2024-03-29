import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import styles from "./Login.module.css";
import axios from "axios";
import { useAccessTokenContext } from "../context/AccessTokenContext";
import Swal from "sweetalert2"; //sweetalert2 사용

const Login = () => {
  const navigate = useNavigate();
  const { changeLoginState, getId, getStoreId } = useSessionContext();
  const { getAccessToken } = useAccessTokenContext();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;
  const changeForm = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getLoggedIn = async () => {
    try {
      const res = await axios.post(
        process.env.NODE_ENV === "development"
          ? "/auth/login"
          : "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/auth/login",
        { username: username, password: password },
        { withCredentials: true }
      );
      const res2 = await axios.get(
        process.env.NODE_ENV === "development"
          ? "/owners/me"
          : "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/me",
        {
          headers: {
            authorization: `Bearer ${res.data.access_token}`,
          },
        }
      );
      getAccessToken(res.data.access_token);
      getId(username);
      getStoreId(res2.data.owner.id);
      changeLoginState();
      navigate(-1);
    } catch (error) {
      console.log(error);
      Swal.fire("로그인 에러!!");
    }
  };
  return (
    <>
      <div className={styles["login-container"]}>
        <div className={styles["login"]}>
          <h2>로그인</h2>
          <div className={styles["login-body"]}>
            <div className={styles["inputs-container"]}>
              <div className={styles["input-container"]}>
                <p className={styles["input-info"]}>ID</p>
                <input
                  className={styles["input-content"]}
                  name="username"
                  onChange={changeForm}
                  value={username}
                  placeholder="블루베리스무디"
                />
              </div>
              <div className={styles["input-container"]}>
                <p className={styles["input-info"]}>PASSWORD</p>
                <input
                  className={styles["input-content"]}
                  name="password"
                  onChange={changeForm}
                  value={password}
                  placeholder="블루베리스무디"
                />
              </div>
            </div>
            <div className={styles["login-button-container"]}>
              <button className={styles["login-button"]} onClick={getLoggedIn}>
                로그인
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
