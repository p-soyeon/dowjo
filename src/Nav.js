import { Link, useNavigate } from "react-router-dom";
import React from "react";
import "./Navbar.css";
const Navbar = () => {
  const navigate = useNavigate();
  const Loginpage = () => {
    navigate("./Loginpage");
  };
  return (
    <div>
      <nav>
        <ul>
          <li>
            <img src="./로고 500x200.png"></img>
          </li>
          <li>
            <a href="#">메뉴1</a>
          </li>
          <li>
            <a href="#">메뉴2</a>
          </li>
        </ul>
        <ul className="lg">
          <li>
            {
              <button className="rg" onClick={Loginpage}>
                로그인
              </button>
            }
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
