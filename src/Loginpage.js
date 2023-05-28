import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
import axios from "axios";
import { useState } from "react";
import jwt from "jwt-decode";
import jwt_decode from "jwt-decode";
import Navbar from "./Nav";
import Mainpage from "./Mainpage";
import MyPage1 from "./MyPage1";
import Reserve from "./Reserve";
const Loginpage = ({ settoken }) => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPwHandler = (event) => {
    setPW(event.currentTarget.value);
  };
  const Register = () => {
    navigate("/Select");
  };
  //const tokendecode = jwt_decode(token);
  const Logout = () => {};
  let token;
  let rftoken;
  const Login = async (event) => {
    await axios
      .post("https://dowajo.run.goorm.site/api/login", {
        email: Email,
        password: PW,
      })
      .then((response) => {
        console.log(response.data);

        console.log(Email, PW);
        if (response.status === 200) {
          console.log("연결성공");
          console.log(response.status);
          console.log(response.data);
          token = response.data.accessToken;
          localStorage.setItem("token", response.data.accessToken);
          localStorage.setItem("rftoken", response.data.refreshToken);
          // console.log(jwt(token));
          //console.log(tokendecode);
          //  axios.defaults.headers.common["Authorization"] = //
          axios.post();

          settoken(localStorage.getItem("token"));
          navigate("/Mainpage");
        } else {
          console.log(response.data);
          alert(" 아이디 또는 비밀번호를 확인하세요");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
  };
  return (
    <div className="entire">
      <div className="loginp">
        <img className="logo_img" alt="logo_img" src={require("./logo.png")} />

        <h2 className="login">로그인</h2>
        <br></br>
        <form className=".form" onChange={onSubmitHandler}>
          <label>이메일 </label>
          <br></br>
          <input
            onChange={onEmailHandler}
            className="box1"
            id="email"
            type="email"
            placeholder="example@naver.com"
          ></input>
          <br></br>
          <label>비밀번호</label>
          <br></br>
          <input
            onChange={onPwHandler}
            className="box2"
            id="pw"
            type="password"
            placeholder="password"
          ></input>{" "}
          <br></br>
        </form>
        <button onClick={Login} className="lg">
          로그인
        </button>
        <div className="twoBtn">
          <span>
            첫 방문인가요?&nbsp;
            <a className="reg" onClick={Register}>
              회원가입
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
export default Loginpage;
