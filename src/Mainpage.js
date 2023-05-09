import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Counselorbox } from "./Counselorbox";
import "./Mainpage.css";
const main = {
  border: "1px solid black",
  backgroundColor: "grey",
  margin: "auto",
  width: "625px",
  height: "200px",
  position: "relative",
};
const box = {
  border: "1px solid black",
  backgroundColor: "white",
  margin: "auto",
  width: "200px",
  height: "60px",
  borderRadius: "10px",
  position: "relative",
  marginLeft: "5px",
};

const Mainpage = () => {
  const [counSelor, setCounselor] = useState([]);
  const [checkfield, setcheckfield] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("rftoken") === null) {
      window.location.replace("/");
    } else {
      axios
        .get("http://dowajo.run.goorm.site/api/counselor")
        .then((response) => {
          console.log(response.data);
          setCounselor(response.data);
        });
    }
  }, [setCounselor]); //로컬스토리지가 비어있으면 로그인페이지로 이동
  const navigate = useNavigate();
  const checkbox = (event) => {
    setcheckfield(event.currentTarget.value);
    axios
      .get(
        `http://dowajo.run.goorm.site/api/counselor/field?field=${checkfield}`,
        { params: { field: checkfield } }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
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
  //axios 헤더에 담아서

  return (
    <div>
      <button onClick={logout}>로그아웃</button>
      <main>
        {" "}
        <div className="c_total">
          {counSelor.map((counsel) => {
            return <Counselorbox key={`key-${counsel.id}`} counsel={counsel} />;
          })}
        </div>
      </main>{" "}
    </div>
  );
};
export default Mainpage;
