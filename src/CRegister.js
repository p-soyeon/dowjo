import { useNavigate, Link } from "react-router-dom";
import React, { useRef, useState } from "react";

import axios from "axios";
//import "./img.css";

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
  const [field, setfield] = useState("");
  const [phonenum, setphonenum] = useState("");
  const [url, setUrl] = useState("");
  // 이미지 url로 변환

  const [accountImg, setAccountImg] = useState("");
  const imgRef = useRef();

  const imgChangeHandler = (event) => {
    const reader = new FileReader();
    reader.readAsDataURL(imgRef.current.files[0]);
    reader.onloadend = () => {
      setAccountImg(reader.result);
    };
    if (event.target.files) {
      const upload = event.target.files[0];
      const formData = new FormData();
      formData.append("img", upload);
      console.log(upload);

      axios
        .post("http://dowajo.run.goorm.site/api/counselor/img", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          if (response.status == 200) {
            console.log(response.data);
            setUrl(response.data.url);
            console.log(url);
          }
        });
    }
  };

  const CRegi = async (event) => {
    console.log(url);
    // navigate("/Cpage");
    await axios
      .post("https://dowajo.run.goorm.site/api/counselor/register", {
        email: Email,
        password: PW,
        name: Name,
        nickname: Nickname,
        intro: Intro,
        birth: Birth,
        field: field,
        phonenum: phonenum,
        img: url,
      })
      .then((response) => {
        console.log(response.data);
        if (response.status == 200) {
          console.log("연결성공");
          console.log(response.data);

          alert("로그인 연결 성공");
          // navigate("/Loginpage");
        } else {
          console.log(response.data);
          alert("회원가입실패");
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
  };
  const onFieldHandler = (event) => {
    setfield(event.currentTarget.value);
    console.log(field);
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

  const onsetBirthHandler = (event) => {
    setBirth(event.currentTarget.value);
  };
  const onsetNicknameHandler = (event) => {
    setNickname(event.currentTarget.value);
  };
  const onPhoneHandler = (event) => {
    setphonenum(event.currentTarget.value);
  };

  return (
    <div className="mainp">
      <title>회원가입</title>

      <div className="register">
        <Link to="/">
          <img
            alt="logo_img"
            className="logo_img"
            src={require("./logo.png")}
          />
        </Link>

        <br />
        <form onSubmit={onSubmitHandler}>
          <h2 className="cr">상담사 회원가입</h2>
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

          <div className="aProfile">
            <label htmlFor="profile"> 프로필 이미지 </label>
            <br></br>
            <input
              className="nonbtn"
              type="file"
              accept="image/*"
              id="imgChangeBtn"
              ref={imgRef}
              onChange={imgChangeHandler}
            />
            <br></br>
            <img
              userImgUrl={accountImg}
              src={accountImg ? accountImg : `/images/icon/user.png`}
              alt="프로필 이미지"
            />
          </div>
          <br></br>

          <label htmlFor="category_s">분야</label>

          <div>
            <select
              onChange={onFieldHandler}
              type="text"
              placeholder="분야"
              className="category_s"
            >
              <option value="심리">심리</option>
              <option value="법률">법률</option>
              <option value="투자">투자</option>
              <option value="건강">건강</option>
              <option value="진로">진로</option>
              <option value="학업">학업</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <label>이메일</label>
          <br />

          <input
            onChange={onEmailHandler}
            type="Email"
            value={Email}
            placeholder="email@gmail.com"
          />

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
          <label>핸드폰번호</label>
          <br></br>
          <input onChange={onPhoneHandler} type="string"></input>
          <br />
          <label htmlFor="birth"> 생년월일 </label>
          <br />

          <input onChange={onsetBirthHandler} type="date" />
          <br />
          <label htmlFor="inform">경력/자기소개</label>
          <br />
          <textarea
            className="textarea_intro"
            onChange={onsetintroHandler}
            placeholder="자기소개를 입력해주세요"
          ></textarea>

          <br></br>
        </form>
        <div className="btn">
          <button onClick={CRegi} className="rg">
            가입
          </button>
        </div>
      </div>
    </div>
  );
};
export default CRegister;
