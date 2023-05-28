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
  const mypage = () => {
    navigate("./Mypage1");
  };
  const token = localStorage.getItem("token");
  //토큰을 가져와서 토큰이 있으면 1번 nav 없으면 2 번 nav
  const decodetoken = jwt_decode(token);
  const [decoding, setdecoding] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setdecoding(decodetoken);
  }, []);
  const Home = () => {
    navigate("./Mainpage");
  };
  const logout = () => {
    let rftoken = localStorage.getItem("rftoken");

    alert("로그아웃");
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
  };

  return (
    <div className="nav">
      <ul>
        <li className="logo_ul">
          {" "}
          <Link to="/Mainpage">
            <img
              className="logo_img"
              alt="logo_img"
              src={require("./logo.png")}
            />
          </Link>
        </li>{" "}
        <li className="blank"></li>
        <li> {decoding.name} 님</li>
        <li className="mypage">
          <Link to="/Mypage1">
            <BsPersonLinesFill size="50" color=" rgb(174, 197, 173)" />
          </Link>{" "}
        </li>
        <li className="logout">
          <button onClick={logout} className="btnicon">
            <BiLogOut size="50" color=" rgb(174, 197, 173)"></BiLogOut>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
