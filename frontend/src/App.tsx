import { Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import BookDetailPage from "./pages/BookDetailPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/book/:id" element={<BookDetailPage />} />
    </Routes>
  );
};

export default App;
