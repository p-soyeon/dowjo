import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./CRegiste.css";

const CRegister = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [PW, setPW] = useState("");
  const [CheckPw, setCheckPw] = useState("");
  const [Name, setName] = useState("");
  const [Birth, setBirth] = useState("");
  const [Nickname, setNickname] = useState("");
  const [Intro, setIntro] = useState("");
  const [Genre, setGenre] = useState("");

  const dupcheck = async (event) => {
    await axios
      .get("https://dowajo.run.goorm.site/api/check_ID/{ID}", {})
      .then((response) => {
        console.log(response);
        if (response.data === true) {
          console.log(response);
          console.log("중복");
          alert("가입실패");
        } else {
          console.log(response.data === false);
          console.log("중복아님");
        }
        alert("가입성공.");
      });
  };

  const CRegi = async (event) => {
    // navigate("/Cpage");
    await axios
      .post("https://dowajo.run.goorm.site/api/counselor/register", {
        id: Email,
        pwd: PW,
        name: Name,
        nickname: Nickname,
        intro: Intro,
        birth: Birth,
      })
      .then((response) => {
        console.log(response.data);
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
    if (PW !== CheckPw) {
      alert("비밀번호를 확인해주세요.");
      console.log("비번틀림");
    }
    console.log({
      Email,
      Nickname,
      Birth,
      PW,
      CheckPw,
    });
  };

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onsetintroHandler = (event) => {
    setIntro(event.currentTarget.value);
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
    setIntro(event.currentTarget.value);
  };
  const onsetBirthHandler = (event) => {
    setBirth(event.currentTarget.value);
  };
  const onsetNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };

  return (
    <div className="mainp">
      <title>회원가입</title>

      <div className="register">
        <h2 className="cr">상담사 회원가입</h2>
        <br />
        <form onSubmit={onSubmitHandler}>
          <label htmlFor="name"> 이름 </label>
          <br />

          <input
            onChange={onsetNameHandler}
            type="text"
            placeholder="이름"
            id="name"
            name="name"
          />
          <br />

          <label htmlFor="category">분야</label>
          <br></br>
          <select className="category">
            <option value="0">선택해주세요</option>
            <option value="1">법률</option>
            <option value="2">진로</option>
            <option value="3">학업</option>
          </select>
          <br></br>
          <label>이메일</label>
          <br />

          <input
            onChange={onEmailHandler}
            type="Email"
            value={Email}
            placeholder="email@gmail.com"
          />

          <br />
          <btn onClick={dupcheck}>중복확인</btn>
          <br></br>
          <br></br>
          <label htmlFor="password"> 비밀번호</label>
          <br />

          <input
            onChange={onPwHandler}
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
            type="password"
            placeholder="password"
            id="password"
            name="password"
          />
          <br />
          <label htmlFor="nickname"> 닉네임</label>
          <br />

          <input
            type="text"
            placeholder="닉네임"
            id="nickname"
            name="nickname"
            onChange={onsetNicknameHandler}
          />
          <br />

          <label htmlFor="birth"> 생년월일 </label>
          <br />

          <input onChange={onsetBirthHandler} type="date" />
          <br />
          <label htmlFor="inform">경력/자기소개</label>
          <br />
          <textarea
            onChange={onsetintroHandler}
            placeholder="자기소개를 입력해주세요"
          ></textarea>
        </form>
        <br></br>
        <div className="btn">
          <button onClick={CRegi} className="reg">
            가입
          </button>
        </div>
      </div>
    </div>
  );
};
export default CRegister;
