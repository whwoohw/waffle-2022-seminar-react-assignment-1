import styles from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";
import { ChangeEvent, useState } from "react";

const SearchBar = ({ search, setSearch, searchType }: any) => {
  let timer: any;
  const [searchInput, setSearchInput] = useState<any>(search);
  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        setSearch(e.target.value);
      }, 500);
    }
  };
  console.log(search);
  return (
    <div className={styles["search-bar"]}>
      <div className={styles["search-info"]}>{searchType} 검색 :</div>
      <input
        placeholder="검색어 입력"
        value={searchInput}
        className={styles["search-input"]}
        onChange={handleSearchInput}
      />
      <div>
        <FaSearch />
      </div>
    </div>
  );
};

export default SearchBar;
