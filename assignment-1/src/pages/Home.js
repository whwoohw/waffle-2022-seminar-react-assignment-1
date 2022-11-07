import { useState } from "react";
import SearchBar from "../components/SearchBar";
import "./Home.css";

const Home = () => {
  const [storeSearch, setStoreSearch] = useState("");

  return (
    <div className="home-body">
      <SearchBar search={storeSearch} setSearch={setStoreSearch} searchType="가게" />
      <div className="store-list-container">
        TODO:여기는 가게 목록을 채울 겁니다.
      </div>
    </div>
  );
};

export default Home;
