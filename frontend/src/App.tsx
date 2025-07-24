import { Routes, Route } from "react-router";

import Layout from "./components/layout/layout";
import CreatePartner from "./pages/admin/CreatePatner";

import Partners from "./pages/admin/Patners";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CreatePartner />} />
        <Route path="record" element={<Partners />} />
      </Route>
    </Routes>
  );
}

export default App;
