import { useNavigate, Link } from "react-router-dom";
import "./UserRegister.css";
import axios from "axios";
import { useState } from "react";
const UserRegister = () => {
  const navigate = useNavigate();
  const Register = async (event) => {
    //navigate("/Upage");
    await axios
      .post("https://dowajo.run.goorm.site/api/user/register", {
        email: Email,
        pwd: PW,
        name: Name,
        nickname: Nickname,
        birth: Birth,
      })
      .then((response) => {
        console.log(response.data);
        alert("연결");
        if (response.data.status === "success") {
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
  }; //회원가입완료 후 이동 (axios 로 대체 )
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [Nickname, setNickname] = useState("");
  const [CheckPw, setCheckPw] = useState("");
  const [Name, setName] = useState("");
  const [Birth, setBirth] = useState("");
  const [Phonenumber, setNumber] = useState("");
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPwHandler = (event) => {
    setPW(event.currentTarget.value);
  };
  const oncheckpwHandler = (event) => {
    setCheckPw(event.currentTarget.value);
  };
  const onsetNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onsetnumberHandler = (event) => {
    setNumber(event.currentTarget.value);
  };
  const onsetBirthHandler = (event) => {
    setBirth(event.currentTarget.value);
  };
  const onsetNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };
  return (
    <div className="mainp">
      {" "}
      <Link to="/">
        <img alt="logo_img" className="logo_img" src={require("./logo.png")} />
      </Link>
      <head>
        <title>이용자 회원가입</title>
      </head>
      <div className="register">
        <h2> 이용자 회원가입</h2>
        <br />
        <form>
          <label htmlFor="name"> 이름 </label>
          <br />

          <input
            className="input_ur"
            onChange={onsetNameHandler}
            type="text"
            placeholder="이름"
            id="name"
            name="name"
          />

          <br></br>
          <label htmlFor="number">핸드폰번호 </label>
          <br />

          <input
            onChange={onsetnumberHandler}
            className="input_ur"
            type="text"
            id="number"
          />
          <br></br>
          <label>이메일</label>
          <br></br>
          <input
            onChange={onEmailHandler}
            className="input_ur"
            type="Email"
            placeholder="email@gmail.com"
          />

          <br />

          <label tmlFor="password"> 비밀번호</label>
          <br />

          <input
            onChange={onPwHandler}
            className="input_ur"
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <br />

          <label htmlFor="check password"> 비밀번호 확인</label>
          <br />

          <input
            onChange={oncheckpwHandler}
            className="input_ur"
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <br />
          <label htmlFor="nickname"> 닉네임</label>
          <br />

          <input
            onChange={onsetNicknameHandler}
            className="input_ur"
            type="text"
            placeholder="닉네임"
            id="nickname"
            name="nickname"
          />
          <br />

          <label htmlFor="birth"> 생년월일 </label>
          <br />

          <input
            onChange={onsetBirthHandler}
            type="date"
            id="password"
            name="password"
          />
          <br />
        </form>
        <br></br>
        <div className="btn">
          <button className="rg" onClick={Register}>
            가입
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserRegister;
