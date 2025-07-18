import { Search } from "lucide-react";
import "./SearchInput.scss";

type Props = {
  type: string;
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  placeholder?: string;
};

const BASE_CLASS = "search-input";

export const SearchInput = ({
  type,
  query,
  onChange,
  name,
  placeholder,
}: Props) => {
  return (
    <div className={`${BASE_CLASS}__wrapper`}>
      <Search className={`${BASE_CLASS}__icon`} />
      <input
        type={type}
        name={name}
        value={query}
        onChange={onChange}
        placeholder={placeholder ? placeholder : "Enter a value..."}
        className={`${BASE_CLASS}__input`}
      />
    </div>
  );
};
