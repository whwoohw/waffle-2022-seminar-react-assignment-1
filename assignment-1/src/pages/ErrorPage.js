import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.confirm("잘못된 페이지입니다!")) {
      navigate(-1);
    } else {
      navigate(-1);
    }
  }, [navigate]);

  return <div>잘못된 페이지 입니다.</div>;
};

export default ErrorPage;
