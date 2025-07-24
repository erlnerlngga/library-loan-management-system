import { Routes, Route } from "react-router";

import Layout from "./components/layout/layout";
import CreateBorrowedBook from "./pages/CreateBorrowedBook";

import BorrowedBooks from "./pages/BorrowedBooks";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CreateBorrowedBook />} />
        <Route path="record" element={<BorrowedBooks />} />
      </Route>
    </Routes>
  );
}

export default App;
