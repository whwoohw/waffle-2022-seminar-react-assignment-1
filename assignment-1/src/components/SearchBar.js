import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ search, setSearch, searchType, searchFunction }) => {
  const searchTime = (e) => {
    setSearch(e.target.value);
    searchFunction();
  };

  return (
    <div className="search-bar">
      <div className="search-info">{searchType} 검색 :</div>
      <input
        placeholder="검색어 입력"
        className="search-input"
        onChange={(e) => searchTime(e)}
        value={search}
      />
      <div onClick={searchFunction}>
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;
