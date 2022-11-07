import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import "./Home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
  const [storeSearch, setStoreSearch] = useState("");
  const [stores, setStores] = useState();
  const [searchedStores, setSearchedStores] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let timer;

  const fetchStoresData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/"
      );
      setStores(res.data);
    } catch (error) {
      console.log(error);
      Swal.fire("로그인 에러!!");
    }
    setLoading(false);
  };

  const searchStoreByName = () => {
    if (!timer) {
      //throttling 1초로 설정
      timer = setTimeout(async () => {
        timer = null;
        if (storeSearch) {
          try {
            setLoading(true);

            const res = await axios.get(
              "https://ah9mefqs2f.execute-api.ap-northeast-2.amazonaws.com/owners/",
              {
                params: {
                  name: storeSearch,
                },
              }
            );
            setSearchedStores(res.data);
            setLoading(false);
          } catch (error) {
            console.log(error);
            Swal.fire("가게 검색 에러!");
          }
        } else {
          // 아무것도 입력 안하고 검색버튼 누르면 원래 화면으로 돌아옴
          fetchStoresData();
          setSearchedStores();
        }
      }, 1000);
    }
  };

  useEffect(() => {
    fetchStoresData();
  }, []);

  return loading ? (
    "로딩 중.."
  ) : !stores ? null : !searchedStores ? (
    <div className="home-body">
      <SearchBar
        search={storeSearch}
        setSearch={setStoreSearch}
        searchType="가게"
        searchFunction={searchStoreByName}
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
                style={{ width: store.rating * 20 + "%" }}
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
  ) : (
    <div className="home-body">
      <SearchBar
        search={storeSearch}
        setSearch={setStoreSearch}
        searchType="가게"
        searchFunction={searchStoreByName}
      />
      <div className="store-list-container">
        {searchedStores.map((store) => (
          <div
            key={store.id}
            className="store-list"
            onClick={() => navigate(`/stores/${store.id}`)}
          >
            <h3>{store.store_name}</h3>
            <p>{store.username}</p>
            <p>{store.store_description}</p>
            <div className="star-ratings">
              <div
                className="star-ratings-fill space-x-2 text-lg"
                style={{ width: store.rating * 20 + "%" }}
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
