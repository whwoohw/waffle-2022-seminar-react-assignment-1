import axios from "axios";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Swal from "sweetalert2";
import moment from "moment"; // ago 표현하기위해 moment 라이브러리 사용
import ReviewModal from "./ReviewModal";
import { useSessionContext } from "../context/SessionContext";

const ReviewContainer = ({
  modalState,
  setModalState,
  params,
  clicked,
  setClicked,
  setReviewContent,
  setEditReviewId,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState<any>([]);
  const [ref, inView] = useInView();
  const { id } = useSessionContext();
  const [count, setCount] = useState<number | null>(6);

  const editReview = (e: any) => {
    const editingReview = reviews.find(
      (review: any) => Number(review.id) === Number(e.target.id)
    );
    setEditReviewId(editingReview.id);
    setReviewContent(editingReview.content);
    const editRating = Math.floor(editingReview.rating / 2);
    let clickStates = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= editRating ? true : false;
    }
    setClicked(clickStates);
  };

  const deleteReview = () => {
    setModalState(2);
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        setLoading(true);
        const res2 = await axios.get(
          process.env.NODE_ENV === "development"
            ? "/reviews/"
            : "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/reviews/",
          {
            params: {
              menu: params.menuId,
              count: count,
            },
          }
        );
        console.log(res2.data.data);
        setReviews((prevState: any) => [...prevState, ...res2.data.data]);
        setLoading(false);
      } catch (error) {
        Swal.fire("리뷰 불러오기 에러");
      }
    };
    getReviews();
  }, [params, count]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView) {
      setCount((prevState: any) => prevState + 6);
      setReviews([]);
    }
  }, [inView]);
  return loading ? (
    <div>로딩 중...</div>
  ) : (
    <div className="review-box-container">
      {reviews.map((review: any) => (
        <div key={review.id}>
          {reviews ? (
            <div className="review-box">
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
                        id={review.id}
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
          ) : null}
        </div>
      ))}
      <div ref={ref}></div>
    </div>
  );
};

export default ReviewContainer;
