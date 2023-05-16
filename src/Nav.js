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
          <li className="logo_ul">
            {" "}
            <img
              className="logo_img"
              alt="logo_img"
              src={"http://dowajo.run.goorm.site/img/logo.png"}
            />
          </li>

          <li>
            {
              <button className="nav_lg" onClick={Loginpage}>
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
