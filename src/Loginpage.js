import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
import axios from "axios";
import { useState } from "react";
import jwt from "jwt-decode";
import jwt_decode from "jwt-decode";
import Navbar from "./Nav";

const Loginpage = () => {
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
    <div className="loginp">
      <h2 className="login">로그인</h2>
      <br></br>
      <form onChange={onSubmitHandler}>
        <table>
          <tr>
            <td>
              {" "}
              <label>이메일 </label>
            </td>
            <td>
              <input
                onChange={onEmailHandler}
                className="box1"
                id="email"
                type="email"
              ></input>
            </td>
          </tr>
          <tr>
            <td>
              <label>비밀번호</label>
            </td>
            <td>
              {" "}
              <input
                onChange={onPwHandler}
                className="box2"
                id="pw"
                type="password"
              ></input>
            </td>
          </tr>
        </table>
      </form>

      <div className="btnlg">
        <button onClick={Login} className="lg">
          로그인
        </button>
        <button className="rg" onClick={Register}>
          회원가입
        </button>
      </div>
    </div>
  );
};
export default Loginpage;
