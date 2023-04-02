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
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Mainpage />}></Route>
          <Route path="/UserRegister" element={<UserRegister />}></Route>
          <Route path="/CRegister" element={<CRegister />}></Route>
          <Route path="/Loginpage" element={<Loginpage />}></Route>
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
