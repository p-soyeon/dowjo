import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./Navbar.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { RiUserHeartFill } from "react-icons/ri";
import { BsPersonLinesFill } from "react-icons/bs";
import { BiLogOut } from "react-icons/bi"; //로그아웃
import { BiLogIn } from "react-icons/bi"; //로그인
import jwt_decode from "jwt-decode";

const Navbar = ({ token, settoken }) => {
  //토큰을 가져와서 토큰이 있으면 1번 nav 없으면 2 번 nav
  const navigate = useNavigate();
  return (
    <div className="navv">
      <nav>{token ? <Usernav /> : <Guestnav />}</nav>
    </div>
  );
};
function Usernav() {
  const Home = () => {
    navigate("./Mainpage");
  };

  //로그인 이후 nav바
  const logout = () => {
    let rftoken = localStorage.getItem("rftoken");

    alert(rftoken);
    let accessToken = localStorage.getItem("token");

    axios
      .get("https://dowajo.run.goorm.site/api/logout", {
        headers: { Authorization: rftoken },
        "Content-Type": "application/json",
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.status);

        if (response.status === 200 && response.data == "로그아웃 성공") {
          window.location.replace("/");
          localStorage.clear();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }; //로그아웃 버튼누르면 토큰 지워짐

  const token = localStorage.getItem("token");
  const decodetoken = jwt_decode(token);
  const [decoding, setdecoding] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setdecoding(decodetoken);
  }, []);

  const mypage = () => {
    navigate("./Mypage1");
  };
  return (
    <ul>
      <li className="logo_ul">
        {" "}
        <button onClick={Home}>
          <img
            className="logo_img"
            alt="logo_img"
            src={"http://dowajo.run.goorm.site/img/white_logo.png"}
          />
        </button>
      </li>

      <li className="blank">
        {" "}
        {decoding.name} 님<div></div>
        <button className="btnicon">
          <BsPersonLinesFill size="50" /*color=" "*/ onClick={mypage} />
        </button>{" "}
        <button onClick={logout} className="btnicon">
          <BiLogOut size="50"></BiLogOut>
        </button>
      </li>
    </ul>
  );
}
function Guestnav() {
  //로그인 전 navbar
  const navigate = useNavigate();
  const Loginpage = () => {
    navigate("./");
  };
  const Register = () => {
    navigate("./select");
  };
  return (
    <ul>
      <li className="logo_ul">
        {" "}
        <button className="blank" onClick={Loginpage}>
          <img
            className="logo_img"
            alt="logo_img"
            src={"http://dowajo.run.goorm.site/img/white_logo.png"}
          />
        </button>
      </li>
      <button className="nav_lg" onClick={Register}>
        회원가입
      </button>
      <div></div>
      <li> </li>
    </ul>
  );
}

export default Navbar;
