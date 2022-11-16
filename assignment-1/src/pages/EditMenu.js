import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import "./EditMenu.css";
import ErrorPage from "./ErrorPage";
import axios from "axios";
import Swal from "sweetalert2";
import { useAccessTokenContext } from "../context/AccessTokenContext";

const EditMenu = () => {
  const { login } = useSessionContext();
  const navigate = useNavigate();
  const params = useParams();
  const [menu, setMenu] = useState();
  // const menu = menus.find((elem) => elem.id === Number(params.menuId));

  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const { accessToken } = useAccessTokenContext();

  const wafflePrice = (e) => {
    const value = e.target.value;
    const removedCommaValue = Number(value.replaceAll(",", ""));
    setPrice(removedCommaValue.toLocaleString());
  };

  const editMenu = async () => {
    if (
      Number(price.replaceAll(",", "")) > 1000000 ||
      Number(price.replaceAll(",", "")) < 100
    ) {
      Swal.fire("가격은 100 ~ 1000000 사이여야 합니다!");
    } else if (Number(price.replaceAll(",", "")) % 10 !== 0) {
      Swal.fire("가격은 10원 단위로 끊어져야 합니다!");
    } else {
      try {
        const res2 = await axios.patch(
          process.env.NODE_ENV === "development"
            ? `/menus/${menu.id}`
            : `https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${menu.id}`,
          {
            price: Number(price.replaceAll(",", "")),
            image: image,
            description: description,
          },
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        console.log(res2);

        setPrice("");
        setImage("");
        setDescription("");
        navigate(-1);
      } catch (error) {
        console.log(error);
        Swal.fire("메뉴 추가하기 에러!!");
      }
    }
  };

  useEffect(() => {
    const getMenu = async () => {
      try {
        const res = await axios.get(
          process.env.NODE_ENV === "development"
            ? `/menus/${params.menuId}`
            : `https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${params.menuId}`
        );
        setMenu(res.data);
      } catch (error) {
        console.log(error);
        Swal.fire("메뉴 불러오기 에러!!");
      }
    };
    getMenu();
  }, [params]);

  useEffect(() => {
    if (menu) {
      setPrice(menu.price);
      setImage(menu.image);
      setDescription(menu.description);
    }
  }, [menu]);

  // 잘못 입력시 에러 페이지로 연결
  if (login !== true) {
    return <ErrorPage />;
  }

  return (
    menu && (
      <div className="edit-page-container">
        <div className="edit-page">
          <h1 className="edit-name">메뉴 수정</h1>
          <div className="edit-box-fixed">
            <p className="edit-box-name">이름</p>
            <p>{menu.name}</p>
          </div>
          <div className="edit-box-fixed">
            <p className="edit-box-name">종류</p>
            <p>{menu.type}</p>
          </div>
          <div className="edit-box">
            <p className="edit-box-name">가격</p>
            <div className="input-container">
              <input
                className="edit-box-input"
                placeholder="5,000"
                value={price}
                onChange={wafflePrice}
              />
              <p className="price-unit">원</p>
            </div>
          </div>
          <div className="edit-box">
            <p className="edit-box-name">상품 이미지</p>
            <input
              className="edit-box-input"
              placeholder="https://foo.bar/baz.png"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <div className="edit-box">
            <p className="edit-box-name">설명</p>
            <textarea
              className="edit-box-input textarea"
              placeholder="상품에 대한 자세한 설명을 입력해주세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="edit-buttons">
          <button className="edit-button add" onClick={editMenu}>
            저장
          </button>
          <button className="edit-button cancel" onClick={() => navigate(-1)}>
            취소
          </button>
        </div>
      </div>
    )
  );
};

export default EditMenu;
