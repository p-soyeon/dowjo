import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import CRegister from "./CRegister";
import Select from "./Select";
import Mainpage from "./Mainpage";

import Reserve from "./Reserve";
import Loginpage from "./Loginpage";
import MyPage2 from "./MyPage2";
import MyPage1 from "./MyPage1";
import UserRegister from "./UserRegister";
import Cpage from "./Cpage";
import Upage from "./Upage";
import Net from "./Net";
import Nav from "./Nav";
function App() {
  const [Counselor, setCounselor] = useState();
  const [Id, setId] = useState("");
  return (
    <BrowserRouter>
      <div className="App">
        <Nav></Nav>
        <Routes>
          <Route
            path="/"
            element={
              <Loginpage Counselor={Counselor} setCounselor={setCounselor} />
            }
          ></Route>
          <Route path="/UserRegister" element={<UserRegister />}></Route>
          <Route path="/CRegister" element={<CRegister />}></Route>
          <Route path="/Mainpage" element={<Mainpage />}></Route>
          <Route path="/MyPage1" element={<MyPage1 />}></Route>
          <Route path="/MyPage2" element={<MyPage2 />}></Route>
          <Route path="/Upage" element={<Upage />}></Route>
          <Route path="/Cpage" element={<Cpage />}></Route>
          <Route path="/Reserve" element={<Reserve />}></Route>
          <Route path="/Select" element={<Select />}></Route>
          <Route path="/Net" element={<Net />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
