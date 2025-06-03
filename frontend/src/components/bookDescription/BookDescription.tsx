import parse from "html-react-parser";

export const BookDescription = ({ html }: { html: string }) => {
  return <div className="book-description">{parse(html)}</div>;
};
