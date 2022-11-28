import { Link, useNavigate, useParams } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import "./DetailedMenu.css";
import arrow from "../img/arrow.PNG";
import Modal from "../components/Modal";
// import ErrorPage from "./ErrorPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAccessTokenContext } from "../context/AccessTokenContext";
import Swal from "sweetalert2";
import StoreHeader from "../components/StoreHeader";
import ReviewContainer from "../components/ReviewContainer";

type Menu = {
  rating: number;
  id: number;
  owner: Store;
  image: string;
  name: string;
  type: string;
  price: string;
  description: string;
};

type Store = {
  store_name: string;
  username: string;
};

const DetailedMenu = ({ modalState, setModalState }: any) => {
  const params = useParams();
  const [menu, setMenu] = useState<Menu>({
    rating: 0,
    id: 0,
    owner: { store_name: "", username: "" },
    image: "",
    name: "",
    type: "",
    price: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useSessionContext();
  const { accessToken } = useAccessTokenContext();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [reviewContent, setReviewContent] = useState<any>("");
  const [store, setStore] = useState<Store>();
  const [editReviewId, setEditReviewId] = useState(0);

  let menuRating: any;

  if (menu) {
    if (menu.rating) {
      menuRating = menu.rating;
    } else {
      menuRating = 0;
    }
  }

  const array = [0, 1, 2, 3, 4];
  const handleStarClick = (index: number) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  let score = clicked.filter(Boolean).length;

  const createReview = async () => {
    if (editReviewId === 0) {
      try {
        const res = await axios.post(
          process.env.NODE_ENV === "development"
            ? `/reviews/`
            : `https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/`,
          { content: reviewContent, rating: score * 2, menu: params.menuId },
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        console.log(res);
        setClicked([false, false, false, false, false]);
        setReviewContent("");
        navigate(`/menus/${menu.id}`);
      } catch (error) {
        console.log(error);
        Swal.fire("리뷰 작성 에러!!");
      }
    } else {
      try {
        const res = await axios.patch(
          process.env.NODE_ENV === "development"
            ? `/reviews/${editReviewId}`
            : `https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/${editReviewId}`,
          { content: reviewContent, rating: score * 2 },
          {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );
        console.log(res);
        setClicked([false, false, false, false, false]);
        setReviewContent("");
        setEditReviewId(0);
        navigate(`/menus/${menu.id}`);
      } catch (error) {
        console.log(error);
        Swal.fire("리뷰 수정 에러!!");
      }
    }
  };

  useEffect(() => {
    const getMenu = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          process.env.NODE_ENV === "development"
            ? `/menus/${params.menuId}`
            : `https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${params.menuId}`
        );
        setMenu(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getMenu();
  }, [params]);

  useEffect(() => {
    if (menu) {
      setStore(menu.owner);
    }
  }, [menu]);

  // 잘못 입력시 에러페이지로 연결
  // if (!/\d+/.test(params.menuId)) {
  //   return <ErrorPage />;
  // }

  return loading ? (
    <div>로딩 중..</div>
  ) : !menu || !store ? null : (
    <>
      <StoreHeader storeName={store.store_name} ownerName={store.username} />

      <div className="body-container">
        <div className="left-body">
          <div className="previous-page">
            <div onClick={() => navigate(-1)}>
              <img src={arrow} alt="addbutton" />
            </div>
            <h1>메뉴 목록 </h1>
          </div>
          <div className="menu-detail-container">
            <div className="detail-contents">
              <img
                src={menu.image}
                alt="Url을 불러올 수 없습니다."
                className="detail-url"
              />
              <h3>{menu.name}</h3>
              <p>
                {menu.type === "waffle"
                  ? "와플"
                  : menu.type === "beverage"
                  ? "음료"
                  : "커피"}
              </p>
              <p>{menu.price.toLocaleString()} 원</p>
              <p>{menu.description}</p>
              {login ? (
                <div className="detail-icons">
                  <Link to={`/menus/${menu.id}/edit`}>
                    <div className="icon-image">
                      <span className="material-symbols-outlined">edit</span>
                    </div>
                  </Link>
                  <div className="icon-image" onClick={() => setModalState(1)}>
                    <span className="material-symbols-outlined">delete</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="right-body">
          <div className="review-mean-rating">
            <p>평균 별점</p>
            <div className="star-ratings">
              <div
                className="star-ratings-fill space-x-2 text-lg"
                style={{ width: menuRating * 10 + "%" }}
              >
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
              <div className="star-ratings-base space-x-2 text-lg">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>
            </div>
            <p>{Math.round(menuRating) / 2}</p>
          </div>
          <ReviewContainer
            modalState={modalState}
            setModalState={setModalState}
            params={params}
            clicked={clicked}
            setClicked={setClicked}
            reviewContent={reviewContent}
            setReviewContent={setReviewContent}
            setEditReviewId={setEditReviewId}
          />
          {login ? (
            <div className="create-review-box">
              <div className="review-rating-star-container">
                {array.map((el) => (
                  <div
                    key={el}
                    className={`review-star-ratings ${
                      clicked[el] ? "review-star-ratings-fill" : null
                    }`}
                    onClick={() => handleStarClick(el)}
                  >
                    ★
                  </div>
                ))}
              </div>
              <div className="create-review-input-box-container">
                <input
                  className="create-review-input-box"
                  placeholder="리뷰를 입력하세요"
                  onChange={(e) => {
                    setReviewContent(e.target.value);
                  }}
                  value={reviewContent}
                />
              </div>
              <button className="create-review-button" onClick={createReview}>
                제출
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Modal
        menu={menu}
        modalState={modalState}
        setModalState={setModalState}
      />
    </>
  );
};

export default DetailedMenu;
