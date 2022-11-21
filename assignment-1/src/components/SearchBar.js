import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ search, setSearch, searchType, searchFunction }) => {
  return (
    <div className="search-bar">
      <div className="search-info">{searchType} 검색 :</div>
      <input
        placeholder="검색어 입력"
        className="search-input"
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <div onClick={searchFunction}>
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;
