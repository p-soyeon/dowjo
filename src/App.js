import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import CRegister from "./CRegister";
import Select from "./Select";
import Mainpage from "./Mainpage";
import Videoroom from "./videoroom";
import Reserve from "./Reserve";
import Loginpage from "./Loginpage";

import MyPage1 from "./MyPage1";
import UserRegister from "./UserRegister";

import Nav from "./Nav";
function App() {
  const [Counselor, setCounselor] = useState();
  const [Id, setId] = useState("");
  const [token, settoken] = useState("");

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰을 가져와서 상태에 설정
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      settoken(storedToken);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <Loginpage
                Counselor={Counselor}
                setCounselor={setCounselor}
                settoken={settoken}
              />
            }
          ></Route>
          <Route path="/UserRegister" element={<UserRegister />}></Route>
          <Route path="/CRegister" element={<CRegister />}></Route>
          <Route path="/Mainpage" element={<Mainpage />}></Route>
          <Route path="/MyPage1" element={<MyPage1 />}></Route>

          <Route path="/Reserve" element={<Reserve />}></Route>
          <Route path="/Videoroom" element={<Videoroom />}></Route>
          <Route path="/Select" element={<Select />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
