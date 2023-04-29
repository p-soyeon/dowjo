import { useNavigate } from "react-router-dom";
import "./Loginpage.css";
import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/Button";

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

  const Login = async (event) => {
    // navigate("/Cpage");
    await axios
      .post("https://dowajo.run.goorm.site/api/login", {
        id: Email,
        pwd: PW,
      })
      .then((response) => {
        console.log(response.data);
        alert("연결");
        console.log(Email, PW);
        if (response.data.status === true) {
          console.log("연결성공");
          console.log(response.status);

          alert("로그인 연결 성공");
          // navigate("/Loginpage");
        } else {
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
      <h1 className="login">로그인</h1>
      <br></br>
      <form onChange={onSubmitHandler}>
        <label>이메일 </label>
        <br></br>
        <input
          onChange={onEmailHandler}
          className="box1"
          id="email"
          type="email"
        ></input>
        <br></br>

        <label>비밀번호</label>
        <br></br>
        <input
          onChange={onPwHandler}
          className="box2"
          id="pw"
          type="password"
        ></input>
        <br></br>
      </form>
      <br></br>
      <div className="btnlg btn-secondary">
        <button onClick={Login} className="lg">
          로그인
        </button>
        <br></br>
        <button className="rg" onClick={Register}>
          회원가입
        </button>
      </div>
    </div>
  );
};
export default Loginpage;
