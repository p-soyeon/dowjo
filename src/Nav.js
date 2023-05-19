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

const Navbar = () => {
  const [accessToken, setaccessToken] = useState("");
  const token = localStorage.getItem("token");
  //토큰을 가져와서 토큰이 있으면 1번 nav 없으면 2 번 nav
  useEffect(() => {
    setaccessToken(token);
  }, [token]);
  return (
    <div>
      <nav>{accessToken ? <Usernav /> : <Guestnav />}</nav>
    </div>
  );
};
function Usernav() {
  //로그인 이후 nav바
  const logout = () => {
    let rftoken = localStorage.getItem("rftoken");

    alert(rftoken);
    let accessToken = localStorage.getItem("token");

    axios
      .get("http://dowajo.run.goorm.site/api/logout", {
        headers: { Authorization: rftoken },
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.status);

        if (response.status === 200 && response.data == "로그아웃 성공") {
          window.location.replace("/");
          localStorage.clear();
        }
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
        <img
          className="logo_img"
          alt="logo_img"
          src={"http://dowajo.run.goorm.site/img/logo.png"}
        />
      </li>
      {decoding.name} 님
      <button className="nav_lg">
        <BsPersonLinesFill
          className="user"
          size="50"
          /*color=" "*/ onClick={mypage}
        />
      </button>
      <div></div>
      <li>
        {" "}
        <button className="nav_lg" onClick={logout}>
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
        <img
          className="logo_img"
          alt="logo_img"
          src={"http://dowajo.run.goorm.site/img/logo.png"}
        />
      </li>
      <button className="nav_lg">회원가입</button>
      <div></div>
      <li>
        {" "}
        <button className="nav_lg" onClick={Register}>
          <BiLogOut size="50"></BiLogOut>
        </button>
      </li>
    </ul>
  );
}

export default Navbar;
