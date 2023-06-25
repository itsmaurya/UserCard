import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./Page/Home";
import { AddPage } from "./Page/AddPage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/adduser" element={<AddPage />}></Route>
          <Route path="/update/:id" element={<AddPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
