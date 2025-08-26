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
  const inputItems = [
    { id: 1, inputTitle: "Keyword", name: "keyword", value: values.keyword },
    { id: 2, inputTitle: "Title", name: "title", value: values.title },
    { id: 3, inputTitle: "Author", name: "author", value: values.author },
    {
      id: 4,
      inputTitle: "Publisher",
      name: "publisher",
      value: values.publisher,
    },
    { id: 5, inputTitle: "Subject", name: "subject", value: values.subject },
  ];

  return (
    <form onSubmit={onSubmit} className={`${BASE_CLASS}`}>
      {inputItems.map((inputItem) => (
        <label className={`${BASE_CLASS}__item`}>
          {inputItem.inputTitle}
          <SearchInput
            key={inputItem.id}
            type="search"
            query={inputItem.value}
            onChange={onChange}
            name={inputItem.name}
          />
        </label>
      ))}
      <Button type="submit" name="Search" />
    </form>
  );
};

export default SearchForm;
