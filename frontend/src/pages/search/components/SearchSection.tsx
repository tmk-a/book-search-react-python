import { SearchInput } from "../../../core/components/input/SearchInput";
import { Button } from "../../../core/components/button/Button";
import "./SearchSection.scss";

type Props = {
  keyword: string;
  setKeyword: (value: string) => void;
  loading: boolean;
  onSearch: () => void;
  onOpenAdvanced: () => void;
};

const BASE_CLASS = "search-section";

const SearchSection = ({
  keyword,
  setKeyword,
  loading,
  onSearch,
  onOpenAdvanced,
}: Props) => {
  return (
    <div className={`${BASE_CLASS}__container`}>
      <h1>What do you want to read?</h1>
      <div className={`${BASE_CLASS}__input`}>
        <div className={`${BASE_CLASS}__input-item`}>
          <SearchInput
            type="search"
            query={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            name={"keyword"}
            placeholder={"Enter a keyword..."}
          />
        </div>
        <div className={`${BASE_CLASS}__input-bottom`}>
          <Button
            name="Advanced Search"
            onclick={onOpenAdvanced}
            className="advance-search-button"
          />
          <Button
            name={loading ? "Searching..." : "Search"}
            onclick={onSearch}
            disabled={loading}
            className="search-button"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
