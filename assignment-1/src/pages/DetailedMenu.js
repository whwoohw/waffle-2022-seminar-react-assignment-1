import { Link, useNavigate, useParams } from "react-router-dom";
import { useSessionContext } from "../context/SessionContext";
import "./DetailedMenu.css";
import arrow from "../img/arrow.PNG";
import Modal from "../components/Modal";
import ErrorPage from "./ErrorPage";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAccessTokenContext } from "../context/AccessTokenContext";
import Swal from "sweetalert2";
import moment from "moment"; // ago 표현하기위해 moment 라이브러리 사용
import ReviewModal from "../components/ReviewModal";
import StoreHeader from "../components/StoreHeader";
import { useInView } from "react-intersection-observer";

const DetailedMenu = ({ modalState, setModalState }) => {
  const params = useParams();
  const [menu, setMenu] = useState();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const { login, id } = useSessionContext();
  const { accessToken } = useAccessTokenContext();
  const navigate = useNavigate();
  const [clicked, setClicked] = useState([false, false, false, false, false]);
  const [reviewContent, setReviewContent] = useState();
  const [store, setStore] = useState();
  const [count, setCount] = useState();
  const [ref, inView] = useInView();

  let menuRating;

  if (menu) {
    if (menu.rating) {
      menuRating = menu.rating;
    } else {
      menuRating = 0;
    }
  }

  const array = [0, 1, 2, 3, 4];
  const handleStarClick = (index) => {
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  let score = clicked.filter(Boolean).length;

  const createReview = async () => {
    try {
      const res = await axios.post(
        "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/",
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
      setReviewContent(null);
      navigate(`/menus/${menu.id}`);
    } catch (error) {
      console.log(error);
      Swal.fire("리뷰 작성 에러!!");
    }
  };

  const editReview = async () => {
    console.log("리뷰 수정!!");
    // try {
    //   const res = await axios.patch(
    //     "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/",
    //     { content: reviewContent, rating: score * 2, menu: params.menuId },
    //     {
    //       headers: {
    //         authorization: `Bearer ${accessToken}`,
    //       },
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(res);
    //   setClicked([false, false, false, false, false]);
    //   setReviewContent(null);
    //   navigate(`/menus/${menu.id}`);
    // } catch (error) {
    //   console.log(error);
    //   Swal.fire("리뷰 작성 에러!!");
    // }
  };

  const deleteReview = () => {
    setModalState(2);
  };

  useEffect(() => {
    const getMenu = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/menus/${params.menuId}`
        );
        setMenu(res.data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    getMenu();
  }, [params]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const res2 = await axios.get(
          "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/",
          {
            params: {
              menu: params.menuId,
              count: count,
            },
          }
        );
        console.log(res2.data.data);
        setReviews((prevState) => [...prevState, ...res2.data.data]);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    getReviews();
  }, [params, count]);

  console.log(reviews);

  useEffect(() => {
    if (menu) {
      setStore(menu.owner);
    }
  }, [menu]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setCount((prevState) => prevState + 6);
    }
  }, [inView, loading]);

  // 잘못 입력시 에러페이지로 연결
  if (!/\d+/.test(params.menuId)) {
    return <ErrorPage />;
  }

  return loading ? (
    "로딩 중.."
  ) : error ? (
    "에러 발생.."
  ) : !menu || !store || !reviews ? null : (
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
          <div className="review-box-container">
            {reviews.map((review) => (
              <div key={review.id}>
                {reviews.length - 1 === review.id ? (
                  <div className="review-box" ref={ref}>
                    <div className="review-box-info">
                      <p>{review.author.username}</p>
                      <div className="star-ratings">
                        <div
                          className="star-ratings-fill space-x-2 text-lg"
                          style={{ width: review.rating * 10 + "%" }}
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
                      <p
                        style={{
                          position: "relative",
                          left: "50px",
                          color: "grey",
                          fontSize: "8px",
                        }}
                      >
                        {moment(review.created_at).fromNow()}
                      </p>
                      {review.author.username === id ? (
                        <>
                          <div>
                            <span
                              style={{
                                position: "relative",
                                left: "150px",
                                fontSize: "17px",
                              }}
                              className="material-symbols-outlined"
                              onClick={editReview}
                            >
                              edit
                            </span>
                            <span
                              style={{
                                position: "relative",
                                left: "150px",
                                fontSize: "17px",
                              }}
                              className="material-symbols-outlined"
                              onClick={deleteReview}
                            >
                              delete
                            </span>
                          </div>
                          <ReviewModal
                            review={review}
                            modalState={modalState}
                            setModalState={setModalState}
                          />
                        </>
                      ) : null}
                    </div>
                    <p style={{ fontSize: "13px" }}>{review.content}</p>
                  </div>
                ) : (
                  <div className="review-box" key={review.id}>
                    <div className="review-box-info">
                      <p>{review.author.username}</p>
                      <div className="star-ratings">
                        <div
                          className="star-ratings-fill space-x-2 text-lg"
                          style={{ width: review.rating * 10 + "%" }}
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
                      <p
                        style={{
                          position: "relative",
                          left: "50px",
                          color: "grey",
                          fontSize: "8px",
                        }}
                      >
                        {moment(review.created_at).fromNow()}
                      </p>
                      {review.author.username === id ? (
                        <>
                          <div>
                            <span
                              style={{
                                position: "relative",
                                left: "150px",
                                fontSize: "17px",
                              }}
                              className="material-symbols-outlined"
                              onClick={editReview}
                            >
                              edit
                            </span>
                            <span
                              style={{
                                position: "relative",
                                left: "150px",
                                fontSize: "17px",
                              }}
                              className="material-symbols-outlined"
                              onClick={deleteReview}
                            >
                              delete
                            </span>
                          </div>
                          <ReviewModal
                            review={review}
                            modalState={modalState}
                            setModalState={setModalState}
                          />
                        </>
                      ) : null}
                    </div>
                    <p style={{ fontSize: "13px" }}>{review.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
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
