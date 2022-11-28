import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const ErrorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    Swal.fire({ text: "잘못된 페이지입니다!", showConfirmButton: true }).then(
      (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          navigate(-1);
        } else if (result.isDenied) {
          navigate(-1);
        }
      }
    );
  }, [navigate]);

  return <div>잘못된 페이지 입니다.</div>;
};

export default ErrorPage;
