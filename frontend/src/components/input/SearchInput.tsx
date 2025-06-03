type Props = {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
};

export const SearchInput = ({ query, onChange, name }: Props) => {
  return (
    <input type="text" value={query} onChange={onChange} placeholder={name} />
  );
};
