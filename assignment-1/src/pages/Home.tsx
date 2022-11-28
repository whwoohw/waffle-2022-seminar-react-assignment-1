import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [storeSearch, setStoreSearch] = useState<String | null>("");
  const [stores, setStores] = useState<any[]>();
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStoresData = async (storeSearch: any) => {
      if (storeSearch) {
        try {
          setLoading(true);
          const res = await axios.get(
            process.env.NODE_ENV === "development"
              ? "/owners/"
              : "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/",
            {
              params: {
                name: storeSearch,
              },
            }
          );
          setStores(res.data);
        } catch (error) {
          console.log(error);
          Swal.fire("로그인 에러!!");
        }
        setLoading(false);
      } else {
        try {
          setLoading(true);
          const res = await axios.get(
            process.env.NODE_ENV === "development"
              ? "/owners/"
              : "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/"
          );
          setStores(res.data);
        } catch (error) {
          console.log(error);
          Swal.fire("로그인 에러!!");
        }
        setLoading(false);
      }
    };

    fetchStoresData(storeSearch);
  }, [storeSearch]);

  return loading ? (
    <div>로딩 중..</div>
  ) : !stores ? null : (
    <div className="home-body">
      <SearchBar
        search={storeSearch}
        setSearch={setStoreSearch}
        searchType="가게"
      />
      <div className="store-list-container">
        {stores.map((store) => (
          <div
            key={store.id}
            className="store-list"
            onClick={() => navigate(`/stores/${store.id}`)}
          >
            <h3 style={{ height: "20px" }}>{store.store_name}</h3>
            <p style={{ height: "20px", color: "grey" }}>{store.username}</p>
            <p style={{ height: "60px" }}>{store.store_description}</p>
            <div className="star-ratings">
              <div
                className="star-ratings-fill space-x-2 text-lg"
                style={{ width: store.rating * 10 + "%" }}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
