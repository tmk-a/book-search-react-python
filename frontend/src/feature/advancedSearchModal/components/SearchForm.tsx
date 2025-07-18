import React from "react";
import { SearchFormValues } from "../../../util/typeUtil";
import { SearchInput } from "../../../core/components/input/SearchInput";
import { Button } from "../../../core/components/button/Button";
import "./SearchForm.scss";

const BASE_CLASS = "form";

interface SearchFormProps {
  values: SearchFormValues;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({
  values,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={onSubmit} className={`${BASE_CLASS}`}>
      <label className={`${BASE_CLASS}__item`}>
        Keyword
        <SearchInput
          type="text"
          query={values.keyword}
          onChange={onChange}
          name="keyword"
        />
      </label>
      <label className={`${BASE_CLASS}__item`}>
        Title
        <SearchInput
          type="text"
          query={values.title}
          onChange={onChange}
          name="title"
        />
      </label>
      <label className={`${BASE_CLASS}__item`}>
        Author
        <SearchInput
          type="text"
          query={values.author}
          onChange={onChange}
          name="author"
        />
      </label>
      <label className={`${BASE_CLASS}__item`}>
        Publisher
        <SearchInput
          type="text"
          query={values.publisher}
          onChange={onChange}
          name="publisher"
        />
      </label>
      <label className={`${BASE_CLASS}__item`}>
        Subject
        <SearchInput
          type="text"
          query={values.subject}
          onChange={onChange}
          name="subject"
        />
      </label>
      <Button type="submit" name="Search" />
    </form>
  );
};

export default SearchForm;
